from django.db import models
from django.conf import settings
from django.db.models.fields import DateTimeField
from groups.models import Group
from django.db.models import IntegerField, Model, URLField
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class Book(models.Model):
    TRUE_FALSE_CHOICES = (
    (True, 'Yes'),
    (False, 'No')
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    author = models.CharField(max_length= 255, null=True)
    title = models.CharField(max_length= 255, null=True)
    description = models.TextField(null=True)
    image = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    categories = models.CharField(max_length= 255, null=True)
    page_count = models.IntegerField(null=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, blank=True, null=True, related_name="books")
    comments = models.TextField(null=True, blank=True)
    finished = models.BooleanField(
        choices=TRUE_FALSE_CHOICES,
        default=False)
    pages_read = models.PositiveIntegerField(null=True, default=0)
    avg_rating = models.PositiveSmallIntegerField(
        default=1,
        validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ]
    )

    def __str__(self):  
        return self.title

class Comment(models.Model):
    # user = models.CharField(max_length=255)
    body = models.TextField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="comment")
    user = models.ForeignKey(settings.AUTH_USER_MODEL,    
                           on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)


    def __str__(self):
        return self.body[:10]

    # def __str__(self):
    #     return self.book

class Response(models.Model):
    body=models.TextField()
    comment=models.ForeignKey(Comment, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,    
                           on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)


    def __str__(self):
        return self.body[:10]