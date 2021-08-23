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

    #Recover password views
    path('recover-password/', views.RecoverPasswordView.as_view(), name='recover_password'),
    path('unauthenticated-change-password/', views.UnauthenticatedChangePasswordView.as_view(), name='unauthenticated_change_password_view'),

    #User update views
    path('update-profile/', views.UpdateProfileView.as_view(), name='update_profile'),
    path('update-student/', views.UpdateStudentView.as_view(), name='update_student'),
    path('change-email/', views.ChangeEmailView.as_view(), name='change_email'),
    path('change-password/', views.ChangePasswordView.as_view(), name='change_password'),

    path('delete-student/', views.DeleteStudentView.as_view(), name='delete_student'),

    path('get-profile/', views.InstructorProfileView.as_view(), name='instructor_profile'),
    path('get-student/', views.GetStudentView.as_view(), name='get_student'),

    path('login/', views.LoginView.as_view(), name='login_view'),
    path('logout/', views.LogoutView.as_view(), name='logout_view'),

    #CRAWLER VIEWS
    path('get-student-to-crawl/', views.GetStudentToCrawl.as_view()),
    path('get-watcher-info/', views.GetWatcherInfoView.as_view()),
    path('set-student-status/', views.SetStudentStatusView.as_view()),
    path('set-instructor-status/', views.SetInstructorStatusView.as_view()),
    path('set-user-crawled/', views.SetUserCrawledView.as_view()),
    path('add-date-found/', views.AddDateFoundView.as_view()),
    path('get-valid-proxy/', views.GetValidProxyView.as_view()),
    path('increase-search-count/', views.IncreaseSearchCountView.as_view()),
    path('ban-proxy/', views.BanProxyView.as_view()),

    path('test/', views.TestView.as_view()),
]
