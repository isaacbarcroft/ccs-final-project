from django.urls import path 
from . import views

app_name = 'books'


urlpatterns = [ 
    path('<int:comment>/responses/<int:pk>/', views.ResponseDetailAPIView.as_view(), name='response_detail'),
    path('<int:comment>/responses/', views.ResponseListAPIView.as_view(), name='response_list'),
    path('<int:book>/comments/<int:pk>/', views.CommentDetailAPIView.as_view(),name='comment_detail'),
    path('<int:book>/comments/', views.CommentListAPIView.as_view(),name='comment_list'),
    path('<int:pk>/', views.BookDetailAPIView.as_view(), name='book_detail'),
    path('all/', views.AllBookListAPIView.as_view(), name='all_books'),
    path('', views.BookListAPIView.as_view(), name='book_list'),  
]