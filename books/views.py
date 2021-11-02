from django.shortcuts import render
from .models import Book
from .serializers import BookSerializer
from rest_framework import generics 
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.


class BookListAPIView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes =(IsAuthenticatedOrReadOnly,)

    # def get_queryset(self):
        # url api_v1/articles/ will only return publishef articles
        # url with options for an authenticated user will return articles filtered by that option
        # if self.request.user.is_staff:
        #   return Book.objects.all()

class BookDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
