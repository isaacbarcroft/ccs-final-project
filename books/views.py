from django.shortcuts import render
from .models import Book
from .serializers import BookSerializer
from rest_framework import generics 
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.


class BookListAPIView(generics.ListCreateAPIView):
    # queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes =(IsAuthenticatedOrReadOnly,)
    
    def get_queryset(self):
        return Book.objects.filter(user=self.request.user)

        # if self.request.user.is_staff:
        #     return Book.objects.all()


        # if not self.request.user.is_anonymous:
        #     import pdb 
        #     pdb.set_trace()
        #     user_text = self.request.query_params.get('user')
        #     if user_text is not None:
        #         if user_text == 'ALL':
        #             return Book.objects.filter(user=self.request.user)
        #         else:
        #             return Book.objects.filter(user=self.request.user)
    # def get_queryset(self):
        # url api_v1/articles/ will only return publishef articles
        # url with options for an authenticated user will return articles filtered by that option
        # if self.request.user.is_staff:
        #   return Book.objects.all()
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BookDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
