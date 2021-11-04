from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from rest_auth.serializers import UserDetailsSerializer


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id','user', 'avatar', 'alias')


class UserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = ('id', 'username', 'email', 'is_staff','groups')