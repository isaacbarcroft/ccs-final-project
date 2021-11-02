from django.urls import path 
from . import views

app_name = 'books'


urlpatterns = [ 
    path('', views.BookListAPIView.as_view(), name='book_list'),
    path('<int:pk>/', views.BookDetailAPIView.as_view(), name='book_detail'),
]