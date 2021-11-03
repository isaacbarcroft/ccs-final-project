from rest_framework import serializers 
from .models import Group 
from books.serializers import BookSerializer


class GroupSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    books = BookSerializer(many=True, read_only=True)
    class Meta:
        model = Group
        fields = ('id', 'name', 'members', 'username', 'books')