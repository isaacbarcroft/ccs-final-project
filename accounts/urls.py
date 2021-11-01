from .models import Profile
from django.urls import path 
from . import views

app_name = 'accounts'

urlpatterns = [ 
    path('', views.ProfileListAPIView.as_view(), name='accounts_list')
]