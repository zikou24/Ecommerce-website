from django.urls import path
from base.views import user_views as views

urlpatterns = [


    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('register/', views.registerUser, name='register-user'),

    path('profile/', views.getUserProfil, name='user-profile'),

    path('profile/update', views.updateUserProfil, name='user-profile-update'),

    path('', views.getUsers, name='users'),

    path('delete/<str:pk>', views.deleteUser, name='user-delete'),
    path('update/<str:pk>', views.updateUser, name='user-update'),
    path('<str:pk>/', views.getUserById, name='user'),

]

