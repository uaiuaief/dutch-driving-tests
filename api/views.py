from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.core import exceptions
from django.db.utils import IntegrityError 
from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from . import models, serializers
from .test_types import TEST_TYPES


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

    def _create_test_center(self, test_center_name):
        try:
            test_center = models.TestCenter.objects.get(name=test_center_name)

            return test_center
        except models.TestCenter.DoesNotExist as e:
            test_center = models.TestCenter(name=test_center_name)

            test_center.full_clean()
            test_center.save()

            return test_center

    def _create_student(self, data: dict):
        test_centers = data.pop('test_centers')

        student = models.Student(**data)
        student.full_clean()
        student.save()

        for each in test_centers:
            student.test_centers.add(each)

        return student


class BaseView(APIView, ModelCreationMixin):
    required_fields = []
    allowed_fields = []

    def _catch_errors(self, request):
        for each in self.required_fields:
            if each not in request.data or request.data[each] == "":
                return JsonResponse({
                    'error': f"`{each}` is required"
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
                    translated_data['test_centers'].append(self._create_test_center(each))
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
        data = super()._translate_request_data(request)
        translated_data = dict(data)

        for k in data:
            if k == 'test_centers':
                translated_data['test_centers'] = []
                for each in data[k]:
                    translated_data['test_centers'].append(self._create_test_center(each))

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


class GetStudentView(BaseView):
    allowed_fields = required_fields = ['student_id']

    def post(self, request):
        print(request.data)
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
    
        


