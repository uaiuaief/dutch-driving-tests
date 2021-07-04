from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('create-user/', views.CreateUserView.as_view(), name='create_user'),
    path('create-student/', views.CreateStudentView.as_view(), name='create_student'),
    path('update-student/', views.UpdateStudentView.as_view(), name='update_student'),
]
