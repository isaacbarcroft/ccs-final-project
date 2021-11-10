from rest_framework import serializers
from .models import Book
# from groups.serializers import GroupSerializer


class BookSerializer(serializers.ModelSerializer):
    user_name=serializers.ReadOnlyField(source= 'user.username',)
    # author_name=serializers.ReadOnlyField(source= 'author.username')
    group_name=serializers.ReadOnlyField(source= 'group.name')
   

    class Meta:
        model = Book
        fields = ('id','user_name', 'author', 'title', 'description', 'image','categories','group_name', 'comments', 'page_count','finished', 'pages_read', 'avg_rating')


class AllBookSerializer(serializers.ModelSerializer):
    user_name=serializers.ReadOnlyField(source= 'user.username',)
    # author_name=serializers.ReadOnlyField(source= 'author.username')
    group_name=serializers.ReadOnlyField(source= 'group.name')
   

    class Meta:
        model = Book
        fields = ('id','user_name','group_name','page_count','finished', 'pages_read','avg_rating')