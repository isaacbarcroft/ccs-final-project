# Generated by Django 3.2.9 on 2021-11-07 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0010_book_finished'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='pages_read',
            field=models.PositiveIntegerField(null=True),
        ),
    ]