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
from django.core.mail import send_mail

from . import models, serializers, email_sender
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

        return date_found
    
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
    permission_classes = [permissions.IsAdminUser]

    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


class CreateUserView(BaseView):
    permission_classes = [permissions.AllowAny]

    required_fields = [
            'email',
            'password',
            'driving_school_name',
            'test_type',
            'gov_username',
            'gov_password',
            'full_name',
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
    permission_classes = [permissions.IsAuthenticated]

    required_fields = [
            'candidate_number',
            'birth_date',
            'first_name',
            'last_name',
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
                'instructor': request.user.profile,
        }

        for k in data:
            if k not in self.allowed_fields:
                continue
            elif data[k] == "":
                continue
            else:
                translated_data[k] = data[k]

        return translated_data

        
class UpdateProfileView(BaseView):
    permission_classes = [permissions.IsAuthenticated]

    allowed_fields = [
            'full_name',
            'driving_school_name',
            'mobile_number',
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
        except models.TestCenter.DoesNotExist as e:
            return JsonResponse({
                'error': f"Invalid test center"
                }, status=400)

        return JsonResponse({}, status=200)

    def _update_profile(self, profile, data):
        name = data.pop('test_center', None)

        if name:
            test_center = models.TestCenter.objects.get(name=name)
            profile.test_center = test_center

        for k in data:
            setattr(profile, k, data[k])

        profile.full_clean()
        profile.save()


class UpdateStudentView(BaseView):
    permission_classes = [permissions.IsAuthenticated]

    required_fields = [
            'student_id'
            ]

    allowed_fields = required_fields + [
            'candidate_number',
            'birth_date',
            'first_name',
            'last_name',
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


        if student.status == '4':
            return JsonResponse({
                'error': f"Can't edit a student with a booked test"
                }, status=403)

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
    permission_classes = [permissions.IsAuthenticated]

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

        if student.status == '4':
            return JsonResponse({
                'error': f"Can't delete a student with a booked test"
                }, status=403)

        student.delete()

        return JsonResponse({}, status=204)
        

class InstructorProfileView(BaseView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            return JsonResponse({
                'error': 'Please provide your credentials'
                }, status=401)

        serialized_data = serializers.UserSerializer(user).data

        return JsonResponse(serialized_data, status=200)


class LoginView(BaseView):
    permission_classes = [permissions.AllowAny]

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
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        user = request.user

        if user.is_authenticated:
            logout(request)
            return JsonResponse({}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)


class GetStudentView(BaseView):
    permission_classes = [permissions.IsAuthenticated]

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
    permission_classes = [permissions.IsAuthenticated]

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
    permission_classes = [permissions.IsAuthenticated]
    
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
    permission_classes = [permissions.AllowAny]
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
    permission_classes = [permissions.AllowAny]
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
class GetWatcherInfoView(BaseView):
    permission_classes = [permissions.IsAdminUser]
    """
    Returns:
    User, Student, Proxy
    """
    def get(self, request):
        info = self.get_info()
        if info:
            return JsonResponse(info, status=200)
        else:
            return JsonResponse({'error': 'no instructors or proxies available'}, status=400)

    def get_info(self):
        user = self._get_valid_user()

        if user:
            proxy = self._get_valid_proxy()
            student = self._get_valid_student(user)
        else:
            return None

        if proxy and student:
            user.profile.last_crawled = timezone.now()
            user.profile.save()
            proxy.last_used = timezone.now()
            proxy.save()

            return {
                    "user": serializers.UserSerializer(user).data,
                    "proxy": serializers.ProxySerializer(proxy).data,
                    "student": serializers.StudentSerializer(student).data
                    }
        else:
            return None

    def _get_valid_student(self, user):
        student = user.profile.students.filter(
                status='3',
                ).first()

        return student

    def _get_valid_user(self):
        minutes = 5
        time_limit = timezone.now() - datetime.timedelta(minutes=minutes)
        instructor = models.Profile.objects.filter(
                last_crawled__lte=time_limit,
                status='2',
                search_count__lte=270
                ).order_by('last_crawled').first()

        if instructor:
            return instructor.user
        else:
            return None


    def _get_valid_proxy(self):
        minutes = 3
        time_limit = timezone.now() - datetime.timedelta(minutes=minutes)
        usable_proxy = models.Proxy.objects.order_by('last_used').filter(
                last_used__lte=time_limit,
                is_banned=False).first()

        if usable_proxy:
            usable_proxy.last_used = timezone.now()
            usable_proxy.save()

        return usable_proxy

    def serialize_proxy(self, proxy):
        if proxy:
            proxy.last_used = timezone.now()
            proxy.use_count += 1
            proxy.save()

            serialized_data = serializers.ProxySerializer(proxy).data
            return serialized_data
        else:
            return None


class GetValidProxyView(BaseView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, request):
        proxy = self.get_proxy_data()
        if proxy:
            return JsonResponse(proxy, status=200)
        else:
            return JsonResponse({
                'message': 'There are no proxies available'
                }, status=404)

    def get_proxy_data(self):
        minutes = 0
        time_limit = timezone.now() - datetime.timedelta(minutes=minutes)
        usable_proxy = models.Proxy.objects.order_by('last_used').filter(
                last_used__lte=time_limit,
                is_banned=False).first()

        if usable_proxy:
            usable_proxy.last_used = timezone.now()
            usable_proxy.use_count += 1
            usable_proxy.save()

            serialized_data = serializers.ProxySerializer(usable_proxy).data
            return serialized_data
        else:
            return None


class GetStudentToCrawl(BaseView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, request):
        minutes = 3
        time_limit = timezone.now() - datetime.timedelta(minutes=minutes)

        student = models.Student.objects.exclude(date_to_book=None)
        student = student.filter(
                last_crawled__lte=time_limit,
                status='3'
                ).first()


        if not student:
            return JsonResponse({
                'error': 'There are no students to book'
                }, status=400)

        user = student.instructor.user

        if user.profile.search_count >= 270 or user.profile.status != '2':
            return JsonResponse({
                'error': 'There are no students to book'
                }, status=400)

        serialized_user = serializers.UserSerializer(user).data
        serialized_user['profile']['students'] = []
        serialized_student = serializers.StudentSerializer(student).data

        student.last_crawled = timezone.now()
        student.save()

        return JsonResponse({
            'user': serialized_user,
            'student': serialized_student,
            }, status=200)


class SetStudentStatusView(BaseView):
    permission_classes = [permissions.IsAdminUser]
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

        if status == "4":
            student.date_to_book.status = "2"
            student.date_to_book.save()


        return JsonResponse({}, status=200)


class SetInstructorStatusView(BaseView):
    permission_classes = [permissions.IsAdminUser]
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
    permission_classes = [permissions.IsAdminUser]
    allowed_fields = required_fields = [
            'test_center_name',
            'date',
            'week_day',
            'start_time',
            'end_time',
            'free_slots',
            'user_id',
            'test_type',
            ]
    
    def post(self, request):
        error = self._catch_errors(request)
        if error:
            return error

        translated_data = self._translate_request_data(request)

        user_id = translated_data.pop('user_id')
        test_center_name = translated_data.pop('test_center_name')

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
                **translated_data
                }

        try:
            date_found = self._create_date_found(data)
            self._assign_slots(date_found)
            
            return JsonResponse({'msg': 'success'}, status=204)
        except exceptions.ValidationError as e:
            return JsonResponse({
                'error': str(e)
                }, status=400)

    def _assign_slots(self, date):
        instructor = date.found_by
        students2 = instructor.students.filter(
                search_range='2',
                date_to_book=None
                ).all()
        students4 = instructor.students.filter(
                search_range='4',
                date_to_book=None
                ).all()
        students12 = instructor.students.filter(
                search_range='12',
                date_to_book=None
                ).all()

        for _ in range(date.free_slots):
            self._assign_one_slot(date, [students2, students4, students12])

    def _assign_one_slot(self, date, student_groups):
        for group in student_groups:
            for student in group:
                if self._does_date_match_student(date, student):
                    student.date_to_book = date
                    student.save()
                    return

    def _does_date_match_student(self, date, student):
        if self._is_date_within_safe_range(date) \
                and date.test_type == student.instructor.test_type \
                and self._is_date_within_student_range(date, student) \
                and not self._is_date_skipped(date, student):
                    return True
        else:
            return False
    
    def _is_date_within_student_range(self, date, student):
        days = int(student.search_range) * 7
        last_day = (datetime.datetime.today() + datetime.timedelta(days=days)).date()

        if date.date <= last_day:
            return True
        else:
            print("not withing student range") 
            return False

    def _is_date_within_safe_range(self, date):
        safe_limit = (datetime.datetime.today() + datetime.timedelta(days=2)).date()

        if date.date > safe_limit:
            return True
        else:
            print("not within safe limit") 
            return False

    def _is_date_skipped(self, date, student):
        if str(date.date.day) in student.get_list_of_days_to_skip():
            print("date is skipped") 
            return True
        else:
            return False


class SetUserCrawledView(BaseView):
    permission_classes = [permissions.IsAdminUser]
    allowed_fields = required_fields = [
            'user_id'
            ]

    def post(self, request):
        error = self._catch_errors(request)
        if error:
            return error

        user_id = request.data['user_id']
        try:
            user = models.User.objects.get(id=user_id)
            user.profile.last_crawled = timezone.now()
            user.profile.save()

            self.remove_dates(user)

            return JsonResponse({}, status=200)
        except models.User.DoesNotExist:
            return JsonResponse({
                'error': f"There's no user with id {user_id}"
                }, status=400)

    def remove_dates(self, user):
        dates = models.DateFound.objects.filter(
                found_by=user.profile,
                status='1'
                ).all()

        for each in dates:
            each.delete()


class IncreaseSearchCountView(BaseView):
    permission_classes = [permissions.IsAdminUser]
    allowed_fields = required_fields = [
            'user_id'
            ]

    def post(self, request):
        error = self._catch_errors(request)
        if error:
            return error

        user_id = request.data['user_id']
        try:
            user = models.User.objects.get(id=user_id)
        except:
            return JsonResponse({
                'error': f"User with id {user_id} does not exist"
                }, status=400)

        user.profile.search_count += 1
        user.profile.save()

        return JsonResponse({}, status=200)


class BanProxyView(BaseView):
    permission_classes = [permissions.IsAdminUser]
    allowed_fields = required_fields = [
            'ip'
            ]

    def post(self, request):
        error = self._catch_errors(request)
        if error:
            return error

        ip = request.data['ip']
        try:
            proxy = models.Proxy.objects.get(ip=ip)
            proxy.is_banned = True
            proxy.save()
        except:
            return JsonResponse({
                'error': f"Proxy with ip {ip} does not exist"
                }, status=400)

        return JsonResponse({}, status=200)


class TestView(BaseView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        email_sender.test()


        return JsonResponse({}, status=200)
