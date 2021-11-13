from django.shortcuts import render
from .models import Book, Comment, Response 
from .serializers import BookSerializer, AllBookSerializer, CommentSerializer, ResponseSerializer
from rest_framework import generics 
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from .permissions import IsOwnerOrReadOnly

# Create your views here.


class BookListAPIView(generics.ListCreateAPIView):
    # queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes =(IsAuthenticatedOrReadOnly,)
    
    def get_queryset(self):
        return Book.objects.filter(user=self.request.user, group__isnull=True)


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class AllBookListAPIView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = AllBookSerializer
    permission_classes =(IsAuthenticatedOrReadOnly,)


class CommentListAPIView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        book = self.kwargs['book']
        return Comment.objects.filter(book=book)

    def perform_create(self,serializer):
        book = get_object_or_404(Book, id=self.kwargs['book'])
        serializer.save(book=book, user=self.request.user)


class CommentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes= IsOwnerOrReadOnly

class AllCommentListAPIView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes =(IsAuthenticatedOrReadOnly,)


class ResponseListAPIView(generics.ListCreateAPIView):
    serializer_class = ResponseSerializer

    def get_queryset(self):
        comment = self.kwargs['comment']
        return Response.objects.filter(comment=comment)

    def perform_create(self, serializer):
        comment = get_object_or_404(Comment, id=self.kwargs['comment'])
        serializer.save(comment=comment, user=self.request.user)

class ResponseDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer