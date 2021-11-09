from django.urls import path 
from . import views

app_name = 'books'


urlpatterns = [ 
    path('all/', views.AllBookListAPIView.as_view(), name='all_books'),
    path('<int:pk>/', views.BookDetailAPIView.as_view(), name='book_detail'),
    path('', views.BookListAPIView.as_view(), name='book_list'),  
]