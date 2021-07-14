import datetime
from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MinLengthValidator
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.core.mail import send_mail
from django.contrib.auth.base_user import BaseUserManager
from .choices import TEST_TYPES


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)

        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    last_login = models.DateTimeField(_('date joined'), auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Profile(BaseModel):
    user = models.OneToOneField(
            User, 
            on_delete=models.CASCADE,
    )

    first_name = models.CharField(
            max_length=30, 
            validators=[MinLengthValidator(1)],
    )

    last_name = models.CharField(
            max_length=30, 
            validators=[MinLengthValidator(1)]
    )

    mobile_number = models.CharField(
            max_length=30, 
            validators=[MinLengthValidator(8)]
    )

    gov_username = models.CharField(
            max_length=50, 
            validators=[MinLengthValidator(1)]
    )

    gov_password = models.CharField(
            max_length=150, 
            validators=[MinLengthValidator(1)]
    )

    student_limit = models.IntegerField(default=100, blank=True)

    status = models.CharField(
            max_length=20,
            choices=[
                ('1', 'Deactivated'),
                ('2', 'Activated'),
                ('3', 'Invalid'),
                ],
            default='1'
            )

    def __str__(self):
        return f'{self.user}'


class Student(BaseModel):
    instructor = models.ForeignKey(
            'Profile', 
            on_delete=models.CASCADE,
            related_name='students'
    )
    candidate_number = models.CharField(max_length=100, unique=True)
    birth_date = models.DateField()
    first_name = models.CharField(
            max_length=30, 
            validators=[MinLengthValidator(1)]
    )

    last_name = models.CharField(
            max_length=30, 
            validators=[MinLengthValidator(1)]
    )

    """ must be a choice, look at the dutch website later """
    test_type = models.CharField(
            max_length=30, 
            choices=TEST_TYPES, 
            blank=False,
            null=False
            )

    test_centers = models.ManyToManyField('TestCenter', blank=True)
    earliest_test_date = models.DateField(default=timezone.now, blank=True)
    
    """
    days the candidate won't be able to do the test
    delimit dates with a `,`
    eg: `15,16,17`
    """
    days_to_skip = models.CharField(max_length=30, blank=True, null=True)
    last_crawled = models.DateTimeField(blank=True, default=timezone.now)

    status = models.CharField(
            max_length=20,
            choices=[
                ('1', 'In analysis'),
                ('2', 'Invalid'),
                ('3', 'Searching'),
                ('4', 'Test found'),
                ('5', 'Paused'),
            ],
            default='1'
    )
    
    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    def get_list_of_days_to_skip(self) -> list:
        return self.days_to_skip.split(',')


class TestCenter(BaseModel):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name


class Proxy(BaseModel):
    ip = models.CharField(max_length=30)
    use_count = models.IntegerField(default=0, blank=True)
    ban_count = models.IntegerField(default=0, blank=True)
    is_banned = models.BooleanField(default=False, blank=True)
    last_used = models.DateTimeField(blank=True, default=timezone.now)

    def __str__(self):
        return self.ip

