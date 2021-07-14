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

    path('update-profile/', views.UpdateProfileView.as_view(), name='update_profile'),
    path('update-student/', views.UpdateStudentView.as_view(), name='update_student'),

    path('delete-student/', views.DeleteStudentView.as_view(), name='delete_student'),

    path('get-profile/', views.InstructorProfileView.as_view(), name='instructor_profile'),
    path('get-student/', views.GetStudentView.as_view(), name='get_student'),

    path('login/', views.LoginView.as_view(), name='login_view'),
    path('logout/', views.LogoutView.as_view(), name='logout_view'),

    #CRAWLER VIEWS
    path('get-student-to-crawl/', views.GetStudentToCrawl.as_view()),
    path('get-valid-instructors/', views.GetInstructorsView.as_view()),
    path('get-instructor-proxy-pair/', views.GetInstructorProxyPair.as_view()),
    path('set-student-status/', views.SetStudentStatusView.as_view()),

]
