import datetime

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.core import exceptions
from django.db.utils import IntegrityError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.utils import timezone
from django.utils.crypto import get_random_string
from exceptions import StudentLimitReached
from rest_framework import generics, permissions, viewsets
from rest_framework.views import APIView

from . import models, serializers
from .choices import TEST_TYPES


class ModelCreationMixin():
    def _create_user(self, data):
        email = data.pop('email')
        password = data.pop('password')

        user = models.User.objects.create_user(email=email, password=password)
        user.save()

        try:
            name = data.pop('test_center')

            profile = models.Profile(
                    user = user,
                    **data
                    )

            if name:
                test_center = models.TestCenter.objects.get(name=name)     
                
            profile.test_center = test_center

            profile.full_clean()
            profile.save()

        except Exception as e:
            user.delete()
            raise e

        return user

    def _create_student(self, data: dict):
        if self._is_over_student_limit(data.get('instructor')):
            raise StudentLimitReached

        student = models.Student(**data)
        student.full_clean()
        student.save()

        return student

    def _create_date_found(self, data: dict):
        date_found = models.DateFound(**data)
        date_found.full_clean()
        date_found.save()
    
    def _is_over_student_limit(self, instructor):
        student_count = instructor.students.count()
        
        if student_count >= instructor.student_limit:
            return True
        else:
            return False


class BaseView(APIView, ModelCreationMixin):
    required_fields = []
    allowed_fields = []

    def _catch_errors(self, request):
        for each in self.required_fields:
            if each not in request.data or request.data[each] == "":
                return JsonResponse({
                    'error': f"`{each}` is required"
                    }, status=400)

        if 'test_centers' in request.data:
            test_centers = request.data['test_centers']
            if not test_centers:
                return JsonResponse({
                    'error': f"`test_centers` is required"
                    }, status=400)
            elif len(test_centers) > 3:
                return JsonResponse({
                    'error': f"Can't choose more than 3 test centers"
                    }, status=400)

            for each in test_centers:
                try:
                    models.TestCenter.objects.get(name=each)
                except models.TestCenter.DoesNotExist:
                    return JsonResponse({
                        'error': f"`{each}` is not a valid test center"
                        }, status=400)

    def _translate_request_data(self, request) -> dict:
        data = request.data
        translated_data = {}

        for k in data:
            if k not in self.allowed_fields:
                continue
            elif data[k] == "":
                continue
            else:
                translated_data[k] = data[k]

        return translated_data


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


class CreateUserView(BaseView):
    required_fields = [
            'email',
            'password',
            'gov_username',
            'gov_password',
            'first_name',
            'last_name',
            'mobile_number',
            'test_center',
            ]

    allowed_fields = required_fields

    def post(self, request):
        error = self._catch_errors(request)
        if error:
            return error

        translated_data = self._translate_request_data(request)

        try:
            self._create_user(translated_data)
        except exceptions.ValidationError as e:
            return JsonResponse({
                'errors': e.messages
                }, status=400)
        except IntegrityError as e:
            return JsonResponse({
                'error': 'A user with that email already exists'
                }, status=400)
        
        return JsonResponse({}, status=200)


class CreateStudentView(BaseView):
    required_fields = [
            'candidate_number',
            'birth_date',
            'first_name',
            'last_name',
            'test_type',
            'search_range',
            ]

    allowed_fields = required_fields + [
            'days_to_skip',
            ]

    def post(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({
                'error': "Please provide your credentials"
                }, status=401)
        
        error = self._catch_errors(request)
        if error:
            return error

        translated_data = self._translate_request_data(request)

        try:
            self._create_student(translated_data)
        except exceptions.ValidationError as e:
            return JsonResponse({
                'errors': e.messages
                }, status=400)
        except StudentLimitReached as e:
            return JsonResponse({
                'errors': "Student limit has been reached, can't add more students"
                }, status=400)


        return JsonResponse({})
        
    def _translate_request_data(self, request) -> dict:
        data = request.data
        translated_data = {
                'instructor': request.user.profile
        }

        for k in data:
            if data[k] == "":
                continue
            elif k == 'test_centers':
                translated_data['test_centers'] = []
                for each in data[k]:
                    test_center = models.TestCenter.objects.get(name=each)
                    translated_data['test_centers'].append(test_center)
            else:
                translated_data[k] = data[k]

        return translated_data

        
class UpdateProfileView(BaseView):
    allowed_fields = [
            'first_name',
            'last_name',
            'mobile_number',
            'gov_username',
            'gov_password',
            'test_center',
            ]

    def patch(self, request):
        user = request.user
        if not user.is_authenticated:
            return JsonResponse({
                'error': "Please provide your credentials"
                }, status=401)

        error = self._catch_errors(request)
        if error:
            return error

        data = self._translate_request_data(request)

        try:
            self._update_profile(user.profile, data)
        except exceptions.ValidationError as e:
            return JsonResponse({
                'errors': e.messages
                }, status=400)

        return JsonResponse({}, status=200)

    def _update_profile(self, profile, data):
        name = data.pop('test_center')

        if name:
            try:
                test_center = models.TestCenter.objects.get(name=name)
            except models.TestCenter.DoesNotExist:
                return JsonResponse({
                    'error': f"{name} is not a valid test center"
                    }, status=400)
            
            profile.test_center = test_center

        for k in data:
            setattr(profile, k, data[k])

        profile.full_clean()
        profile.save()


class UpdateStudentView(BaseView):
    required_fields = [
            'student_id'
            ]

    allowed_fields = required_fields + [
            'candidate_number',
            'birth_date',
            'first_name',
            'last_name',
            'test_type',
            'days_to_skip',
            'search_range',
            ]

    def patch(self, request):
        error = self._catch_errors(request)
        if error:
            return error

        data = self._translate_request_data(request)

        try:
            student_id = data.pop('student_id')
            student = models.Student.objects.get(id=student_id)
        except models.Student.DoesNotExist:
            return JsonResponse({
                'error': f"Student with id {student_id} does not exist"
                }, status=400)

        try:
            self._update_student(student, data)
        except exceptions.ValidationError as e:
            return JsonResponse({
                'errors': e.messages
                }, status=400)


        return JsonResponse({}, status=200)
    
    def _update_student(self, student, data: dict):
        for k in data:
            setattr(student, k, data[k])

        student.full_clean()
        student.save()

    def _translate_request_data(self, request) -> dict:
        data = request.data
        translated_data = {}

        for k in data:
            if data[k] == "":
                if k == 'days_to_skip':
                    translated_data[k] = data[k]
                else:
                    continue
            elif k not in self.allowed_fields:
                continue
            elif k == 'test_centers':
                translated_data['test_centers'] = []
                for each in data[k]:
                    test_center = models.TestCenter.objects.get(name=each)
                    translated_data['test_centers'].append(test_center)
            else:
                translated_data[k] = data[k]

        return translated_data


class DeleteStudentView(BaseView):
    required_fields = ['student_id']
    allowed_fields = required_fields

    def delete(self, request):
        error = self._catch_errors(request)
        if error:
            return error

        data = self._translate_request_data(request)

        try:
            student_id = data.pop('student_id')
            student = models.Student.objects.get(id=student_id)
        except models.Student.DoesNotExist:
            return JsonResponse({
                'error': f"Student with id {student_id} does not exist"
                }, status=400)

        student.delete()

        return JsonResponse({}, status=204)
        

class InstructorProfileView(BaseView):
    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            return JsonResponse({
                'error': 'Please provide your credentials'
                }, status=401)

        serialized_data = serializers.UserSerializer(user).data

        return JsonResponse(serialized_data, status=200)


class LoginView(BaseView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'user': str(user)})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)


class LogoutView(BaseView):
    def get(self, request):
        user = request.user

        if user.is_authenticated:
            logout(request)
            return JsonResponse({}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)


class GetStudentView(BaseView):
    allowed_fields = required_fields = ['student_id']

    def post(self, request):
        user = request.user
        if not user.is_authenticated:
            return JsonResponse({
                'error': 'Please provide your credentials'
                }, status=401)

        error = self._catch_errors(request)
        if error:
            return error

        student_id = request.data.get('student_id')

        try:
            student = user.profile.students.get(id=student_id)
        except models.Student.DoesNotExist:
            return JsonResponse({
                'error': f'Student with id {student_id} not found'
                }, status=404)

        serialized_data = serializers.StudentSerializer(student).data

        return JsonResponse(serialized_data, status=200)
   

class ChangeEmailView(BaseView):
    #permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        user = request.user

        error = self.get_request_errors(request)
        if error:
            return error

        user.email = data.get('new_email')
        user.full_clean()
        user.save()

        logout(request)
        login(request, user)

        return JsonResponse({}, status=204)

    def get_request_errors(self, request):
        data = request.data
        user = request.user

        if not user.is_authenticated:
            return JsonResponse({
                'error': "You must be logged in to view this page",
                'code': 0
                }, status=401)

        if not data.get('password'):
            return JsonResponse({
                'error': "Please provide your credentials",
                'code': 1
                }, status=401)

        if not data.get('new_email'):
            return JsonResponse({
                'error': "Please provide your new email",
                'code': 2
                }, status=400)

        if not user.check_password(data.get('password')):
            return JsonResponse({
                'error': "Wrong password",
                'code': 3
                }, status=401)
        try:
            models.User.objects.get(email=data.get('new_email'))
            return JsonResponse({
                'error': "A user with that email already exists",
                'code': 4
                }, status=403)
        except models.User.DoesNotExist:
            pass

        return None


class ChangePasswordView(BaseView):
    #permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        data = request.data
        user = request.user

        error = self.get_request_errors(request)
        if error:
            return error

        user.password = make_password(data.get('new_password'))
        user.full_clean()
        user.save()

        logout(request)
        login(request, user)

        return JsonResponse({}, status=204)

    def get_request_errors(self, request):
        data = request.data
        user = request.user

        if not user.is_authenticated:
            return JsonResponse({
                'error': "You must be logged in to view this page",
                'code': 1
                }, status=401)

        if not data.get('current_password'):
            return JsonResponse({
                'error': "Please provide your credentials",
                'code': 2
                }, status=401)

        if not data.get('new_password'):
            return JsonResponse({
                'error': "Please provide your new password",
                'code': 3
                }, status=400)

        if not user.check_password(data.get('current_password')):
            return JsonResponse({
                'error': "Wrong password",
                'code': 4
                }, status=401)

        return None

class RecoverPasswordView(BaseView):
    #permission_classes = [permissions.AllowAny]
    allowed_fields = required_fields = [
            'email',
            ]

    def post(self, request):
        error = self._catch_errors(request)
        if error:
            return error

        try:
            token_hash = self._generate_token(request.data['email'])
        except models.User.DoesNotExist:
            return JsonResponse({
                'error':'There is no user with that email'
                }, status=404)


        user = models.User.objects.get(email=request.data['email'])
        #email_sender.send_password_recovery_email(
        #        'receiver',
        #        user.profile.first_name,
        #        f'{settings.DOMAIN_NAME}/choose-new-password?token={token_hash}'
        #        )

        return JsonResponse({'msg':'success'}, status=200)
    
    def _generate_token(self, email):
        user = models.User.objects.get(email=email)
        token_hash = get_random_string(length=32)

        token = models.Token(token_hash=token_hash, user=user)
        token.save()

        return token_hash


class UnauthenticatedChangePasswordView(BaseView):
    #permission_classes = [permissions.AllowAny]
    allowed_fields = required_fields = [
            'token',
            'new_password'
            ]

    def post(self, request):
        error = self._catch_errors(request)
        if error:
            return error

        try:
            token = models.Token.objects.get(token_hash=request.data['token'])
        except models.Token.DoesNotExist:
            return JsonResponse({
                'error':'Invalid token',
                'code': 1
                }, status=403)

        if token.is_expired():
            return JsonResponse({
                'error':'Token expired',
                'code': 2
                }, status=403)

        user = token.user
        user.password = make_password(request.data.get('new_password'))
        user.full_clean()
        user.save()
        token.delete()
            
        return JsonResponse({}, status=204)

"""
Crawler views
"""
class GetInstructorsView(generics.ListAPIView):
    invalid_profiles = models.Profile.objects.filter(students__isnull=True).all()
    invalid_user_ids = [each.user.id for each in invalid_profiles]

    queryset = models.User.objects.exclude(profile__isnull=True)
    queryset = queryset.exclude(id__in=invalid_user_ids).all()

    serializer_class = serializers.UserSerializer

"""
If there's an active instructor that has a valid and active student 
who hasn't been crawled for more than 5 minutes, returns the instructor 
and a proxy, the crawler will spawn another process with that instructor and 
proxy.
"""
class GetInstructorProxyPair(BaseView):
    def get(self, request):
        pair = self.get_pair()
        if pair:
            return JsonResponse(pair, status=200)
        else:
            return JsonResponse({'error': 'no instructors or proxies available'}, status=400)

    def get_pair(self):
        user_data = self.get_user_data()
        proxy_data = self.get_proxy_data()

        if user_data and proxy_data:
            return {
                    "user": user_data,
                    "proxy": proxy_data
                    }
        else:
            return None

    def get_user_data(self):
        minutes = 5
        time_limit = timezone.now() - datetime.timedelta(minutes=minutes)
        student = models.Student.objects.filter(
                last_crawled__lte=time_limit,
                status='3'
                ).order_by('last_crawled').first()

        if student:
            instructor = student.instructor

            if instructor.status == '2':
                serialized_data = serializers.UserSerializer(instructor.user).data

                return serialized_data
            else:
                return None
        else:
            return None


    def get_proxy_data(self):
        minutes = 3
        time_limit = timezone.now() - datetime.timedelta(minutes=minutes)
        usable_proxy = models.Proxy.objects.order_by('last_used').filter(
                last_used__lte=time_limit,
                is_banned=False).first()

        if usable_proxy:
            usable_proxy.last_used = timezone.now()
            usable_proxy.save()

            serialized_data = serializers.ProxySerializer(usable_proxy).data
            return serialized_data
        else:
            return None


class GetStudentToCrawl(BaseView):
    allowed_fields = required_fields = ['user_id']

    def post(self, request):
        error = self._catch_errors(request)
        if error:
            return error

        try:
            user = models.User.objects.get(id=request.data['user_id'])
        except models.User.DoesNotExist as e:
            return JsonResponse({
                'error': f'User with id {user_id} does not exist'
                }, status=404)

        student = self.find_usable_student(user.profile)

        if student:
            student.last_crawled = timezone.now()
            student.save()

            serialized_data = serializers.StudentSerializer(student).data

            return JsonResponse(serialized_data, status=200)
        else:
            return JsonResponse({
                'error': 'There are no students avaiable'
                }, status=400)

    def find_usable_student(self, profile):
        minutes = 3
        time_limit = timezone.now() - datetime.timedelta(minutes=minutes)

        student = profile.students.filter(
                status="3",
                last_crawled__lte=time_limit,
                ).order_by('last_crawled').first()

        if student:
            return student
        else:
            return None
        

class SetStudentStatusView(BaseView):
    allowed_fields = required_fields = [
            "student_id",
            "status"
            ]

    def post(self, request):
        error = self._catch_errors(request)
        if error:
            return error

        student_id = request.data['student_id']
        status = request.data['status']
        
        try:
            student = models.Student.objects.get(id=student_id)
        except models.Student.DoesNotExist:
            return JsonResponse({
                'error': f"theres no student with id `{student_id}`"
                }, status=404)

        student.status = status

        try:
            student.full_clean()
            student.save()
        except exceptions.ValidationError:
            return JsonResponse({
                'error': f"status {status} is not a valid choice"
                }, status=400)


        return JsonResponse({}, status=200)


class SetInstructorStatusView(BaseView):
    allowed_fields = required_fields = [
            'user_id',
            'status'
            ]

    def post(self, request):
        error = self._catch_errors(request)
        if error:
            return error

        user_id = request.data['user_id']
        status = request.data['status']

        try:
            user = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return JsonResponse({
                'error': f"there's no instructor with id `{user_id}`"
                }, status=404)

        user.profile.status = status

        try:
            user.profile.full_clean()
            user.profile.save()
        except exceptions.ValidationError:
            return JsonResponse({
                'error': f"status {status} is not a valid choice"
                }, status=400)

        return JsonResponse({}, status=200)


class AddDateFoundView(BaseView):
    allowed_fields = required_fields = [
            'test_center_name',
            'date',
            'week_day',
            'start_time',
            'end_time',
            'free_slots',
            'user_id',
            ]
    
    def post(self, request):
        error = self._catch_errors(request)
        if error:
            return error

        data = request.data
        user_id = data.pop('user_id')
        test_center_name = data.pop('test_center_name')

        try:
            user = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return JsonResponse({
                'error': f"there's no instructor with id `{user_id}`"
                }, status=404)

        try:
            test_center = models.TestCenter.objects.get(name=test_center_name)
        except models.User.DoesNotExist:
            return JsonResponse({
                'error': f"there's no test center with name `{test_center_name}`"
                }, status=404)

        data = {
                'found_by': user.profile,
                'test_center': test_center,
                **request.data
                }

        try:
            self._create_date_found(data)
            
            return JsonResponse({}, status=204)
        except Exception as e:
            return JsonResponse({
                'error': str(e)
                }, status=400)



