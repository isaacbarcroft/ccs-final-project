from django.urls import path, include

app_name = "api_v1"

urlpatterns = [
    # path('books/', include('articles.urls',  namespace='books')),
    path('accounts/', include('accounts.urls',  namespace='acounts')),
]