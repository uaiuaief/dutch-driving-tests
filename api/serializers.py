from . import models
from rest_framework import serializers


class TestCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TestCenter
        fields = "__all__"


class DateFoundSerializer(serializers.ModelSerializer):
    test_center = TestCenterSerializer()
    depth = 1

    class Meta:
        model = models.DateFound
        fields = [
                "id",
                "date",
                "week_day",
                "start_time",
                "end_time",
                "free_slots",
                "test_type",
                "test_center",
                "found_by",
                ]


class StudentSerializer(serializers.ModelSerializer):
    date_to_book = DateFoundSerializer()
    class Meta:
        depth = 1
        model = models.Student
        #fields = '__all__' 
        exclude = ['instructor']


class ProfileSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True)

    class Meta:
        depth = 1
        model = models.Profile
        fields = [
                'full_name',
                'mobile_number',
                'gov_username',
                'gov_password',
                'student_limit',
                'status',
                'test_type',
                'driving_school_name',
                'test_center',
                'students',
                'searches',
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


class ProxySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Proxy
        fields = "__all__"


