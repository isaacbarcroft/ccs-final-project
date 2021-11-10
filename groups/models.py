from django.db import models
from django.conf import settings


# Create your models here.

class Group(models.Model):
    name = models.CharField(max_length=255)
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL)

    def __str__(self):
        return self.name
 

    