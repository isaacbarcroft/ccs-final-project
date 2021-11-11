from django.contrib import admin
from .models import Book, Comment, Response 
# Register your models here.
admin.site.register(Book)
admin.site.register(Comment)
admin.site.register(Response)