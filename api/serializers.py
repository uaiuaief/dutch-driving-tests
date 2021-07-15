from . import models
from rest_framework import serializers


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        depth=1
        model = models.Student
        #fields = '__all__' 
        exclude = ['instructor']


class ProfileSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True)
    class Meta:
        depth = 1
        model = models.Profile
        fields = [
                'first_name',
                'last_name',
                'mobile_number',
                'gov_username',
                'gov_password',
                'student_limit',
                'status',
                'students',
        ]
        

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        depth = 1
        model = models.User
        fields = [
                'id',
                'email',
                'profile',
                ]


class TestCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TestCenter


class ProxySerializer(serializers.ModelSerializer):
    pass
    #class Meta:
        #model = models.Proxy
