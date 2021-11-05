from django.db import models
from django.conf import settings
from django.db.models.fields import DateTimeField
from groups.models import Group
# Create your models here.
class Book(models.Model):
    NO_GOOD = 'No Good'
    OK = 'Okay'
    GOOD_READ = 'Good Read'
    LOVE = 'Loved It'
    CHOICES = [
        (NO_GOOD, 'No Good'),
        (OK, 'Okay'),
        (GOOD_READ, 'Good Read'),
        (LOVE, 'Loved It'),
    ]
    TRUE_FALSE_CHOICES = (
    (True, 'Yes'),
    (False, 'No')
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    author = models.CharField(max_length= 255, null=True)
    title = models.CharField(max_length= 255, null=True)
    description = models.TextField(null=True)
    image = models.ImageField(upload_to='profiles/', null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    categories = models.CharField(max_length= 255, null=True)
    page_count = models.IntegerField(null=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, null=True, related_name="books")
    options = models.CharField(
        max_length=10,
        choices=CHOICES,
        default='',
    )
    comments = models.TextField(null=True)
    finished = models.BooleanField(
        choices=TRUE_FALSE_CHOICES,
        default=True)
    # is_published = models.BooleanField(default=False, null=True)

    def __str__(self):  
        return self.title
