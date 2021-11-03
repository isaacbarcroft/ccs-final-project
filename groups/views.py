from .models import Group
from .serializers import GroupSerializer
from rest_framework import generics
# Create your views here.

class GroupListAPIView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


    def perform_create(self,serializer):
        serializer.save(user=self.request.user)

class GroupDetailListAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer