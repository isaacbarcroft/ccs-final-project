from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
     author_name=serializers.ReadOnlyField(source= 'author.username')

     class Meta:
         model = Book
         fields = ('id', 'author_name', 'author', 'title', 'description', 'image','categories')