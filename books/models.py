from django.db import models
from django.conf import settings
from django.db.models.fields import DateTimeField
from groups.models import Group
# Create your models here.
class Book(models.Model):
  
    author = models.CharField(max_length= 255, null=True)
    title = models.CharField(max_length= 255, null=True)
    description = models.TextField(null=True)
    image = models.ImageField(upload_to='profiles/', null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    categories = models.CharField(max_length= 255, null=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, null=True, related_name="books")
   
    # is_published = models.BooleanField(default=False, null=True)

    def __str__(self):  
        return self.title
