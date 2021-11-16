from rest_framework import serializers
from .models import Book, Comment, Response
from accounts.models import User
# from groups.serializers import GroupSerializer


class ResponseSerializer(serializers.ModelSerializer):
    user_name= serializers.ReadOnlyField(source="user.username")
    comment = serializers.ReadOnlyField(source='comment.body')
    class Meta: 
        model = Response
        fields = ('id', 'user_name', 'body', 'comment', 'created_at', 'updated_at')


class CommentSerializer(serializers.ModelSerializer):
    user_name= serializers.ReadOnlyField(source="user.username")
    # user = serializers.ReadOnlyField(source='')
    created_at=serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S", read_only=True)

    book = serializers.ReadOnlyField(source='book.title')
    class Meta:
        model = Comment
        fields = ('id', 'user', 'body','book', 'user_name', 'created_at', 'updated_at')



class BookSerializer(serializers.ModelSerializer):
    user_name=serializers.ReadOnlyField(source= 'user.username',)
    created_at=serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S", read_only=True)
    # updated_at=serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S", read_only=True)
    # author_name=serializers.ReadOnlyField(source= 'author.username')
    group_name=serializers.ReadOnlyField(source= 'group.name')
    book_comments=CommentSerializer(many=True, read_only=True, source="comment")

    class Meta:
        model = Book
        fields = ('id','user_name', 'author', 'title', 'description','group', 'image','categories','group_name', 'comments', 'page_count','finished', 'pages_read', 'avg_rating', 'book_comments', 'created_at')


class AllBookSerializer(serializers.ModelSerializer):
    user_name=serializers.ReadOnlyField(source= 'user.username',)
    # author_name=serializers.ReadOnlyField(source= 'author.username')
    group_name=serializers.ReadOnlyField(source= 'group.name')
   

    class Meta:
        model = Book
        fields = ('id','user_name','group_name','page_count','finished', 'pages_read','avg_rating')



class UserStatsSerializer(serializers.ModelSerializer):
    books_read = serializers.SerializerMethodField()
    pages_read = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('username', 'books_read','pages_read')

    def get_books_read(self, obj):
        books = Book.objects.filter(user=obj)
        books_read = 0

        for book in books:
            if book.finished:
                books_read = books_read + 1
                
        return books_read
        

    def get_pages_read(self, obj):
        books = Book.objects.filter(user=obj)
        pages_read = 0 

        for book in books:
            pages_read = pages_read + book.pages_read 

        return pages_read