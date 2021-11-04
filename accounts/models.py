from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.
class User(AbstractUser):
    
    def __str__(self):
        return self.username



class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    avatar = models.ImageField(upload_to='profile/', null=True)
    alias = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.user.username