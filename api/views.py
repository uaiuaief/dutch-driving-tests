from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from . import models, serializers


class BaseView(APIView):
    required_fields = []

    def _catch_errors(self, request):
        for each in self.required_fields:
            if each not in request.data:
                return JsonResponse({
                    'error': f"`{each}` is required"
                    })


class UserCreationMixin():
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

            profile.save()

        except Exception as e:
            user.delete()
            raise e

        return user
    


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


class CreateUserView(BaseView, UserCreationMixin):
    required_fields = [
            'email',
            'password',
            'gov_username',
            'gov_password',
            'first_name',
            'last_name',
    ]

    def post(self, request):
        error = self._catch_errors(request)
        if error:
            return error

        translated_data = self._translate_request_data(request.data)
        self._create_user(translated_data)
        
        return JsonResponse({}, status=200)

    def _translate_request_data(self, data):
        translated_data = {}
        
        for k in data:
            if False:
                pass
            else:
                translated_data[k] = data[k]

        return translated_data

class CreateStudentView(BaseView):
    required_fields = [
            'candidate_number',
            'birth_date',
            'first_name',
            'last_name',
            'test_type',
            'test_center_1',
            'test_center_2',
            'test_center_3',
            'earliest_test_date',
            'days_to_skip',
    ]

    def post(self, request):
        #if not request.user.is_authenticated:
        #    return JsonResponse({
        #        'error': "Please provide your credentials"
        #        }, status=401)
        
        error = self._catch_errors(request)
        if error:
            return error

        translated_data = self._translate_request_data(request)
        self._create_student(translated_data)

        return JsonResponse({})

    def _create_student(self, data: dict):
        test_centers = data.pop('test_centers')

        student = models.Student(**data)
        student.save()

        for each in test_centers:
            student.test_centers.add(each)

    def _create_test_center(self, test_center_name):
        try:
            test_center = models.TestCenter.objects.get(name=test_center_name)

            return test_center
        except models.TestCenter.DoesNotExist as e:
            test_center = models.TestCenter(name=test_center_name)
            test_center.save()

            return test_center
        
    def _translate_request_data(self, request) -> dict:
        data = request.data
        translated_data = {
                'instructor': request.user.profile
        }

        for k in data:
            if False:
                pass
            elif k == 'test_center_1':
                translated_data['test_centers'] = [self._create_test_center(data[k])]
            elif k == 'test_center_2':
                translated_data['test_centers'].append(self._create_test_center(data[k]))
            elif k == 'test_center_3':
                translated_data['test_centers'].append(self._create_test_center(data[k]))
            else:
                translated_data[k] = data[k]

        return translated_data

        

