from django.urls import path, include

app_name = "api_v1"

urlpatterns = [
    path('books/', include('books.urls',  namespace='books')),
    path('accounts/', include('accounts.urls',  namespace='acounts')),
    path('groups/', include('groups.urls', namespace='groups')),
]