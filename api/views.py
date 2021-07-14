import datetime
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.contrib.auth import authenticate, login, logout
from django.core import exceptions
from django.db.utils import IntegrityError 
from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from exceptions import StudentLimitReached
from . import models, serializers
from .choices import TEST_TYPES


class ModelCreationMixin():
    def _create_user(self, data):
        email = data.pop('email')
        password = data.pop('password')

        user = models.User.objects.create_user(email=email, password=password)
        user.save()

        try:
            profile = models.Profile(
                    user = user,
                    **data
                    )

            profile.full_clean()
            profile.save()

        except Exception as e:
            user.delete()
            raise e

        return user

    def _create_student(self, data: dict):
        test_centers = data.pop('test_centers')

        if self._is_over_student_limit(data.get('instructor')):
            raise StudentLimitReached

        student = models.Student(**data)
        student.full_clean()
        student.save()

        for each in test_centers:
            student.test_centers.add(each)

        return student
    
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
            'test_centers',
            'earliest_test_date',
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
        for k in data:
            setattr(profile, k, data[k])

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
            'test_centers',
            'days_to_skip',
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
        for each in student.test_centers.all():
            student.test_centers.remove(each)

        test_centers = data.pop('test_centers')
        for each in test_centers:
            student.test_centers.add(each)

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
        user_data = self.get_user()
        if user_data:
            return JsonResponse(user_data, status=200)
        else:
            return JsonResponse({'error': 'no instructors'}, status=200)

    def get_user(self):
        minutes = 10
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


    def get_proxy(self):
        minutes = 3
        time_limit = timezone.now() - datetime.timedelta(minutes=minutes)
        usable_proxy = models.Proxy.objects.order_by('last_used').filter(
                last_used__lte=time_limit,
                is_banned=False).first()

        return usable_proxy


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
                }, status=200)

    def find_usable_student(self, profile):
        minutes = .1
        time_limit = timezone.now() - datetime.timedelta(minutes=minutes)

        student = profile.students.filter(
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
                'error': f"theres no instructor with id `{user_id}`"
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
