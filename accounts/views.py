from django.shortcuts import render
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework import generics
# Create your views here.


class ProfileListAPIView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)