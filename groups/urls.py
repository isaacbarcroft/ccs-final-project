from django.urls import path 
from . import views

app_name = 'groups'

urlpatterns =[ 
    path('', views.GroupListAPIView.as_view(), name='group_list'),
    path('<int:pk>/', views.GroupDetailListAPIView.as_view(), name='group_detail'),

]