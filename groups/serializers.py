from rest_framework import serializers 
from .models import Group 
from books.serializers import BookSerializer

from accounts.serializers import UserDetailsSerializer


class GroupSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="members.username")
    books = BookSerializer(many=True, read_only=True)
    # members = serializers.StringRelatedField(many=True)
    members = UserDetailsSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = ('id', 'name', 'members', 'username', 'books')