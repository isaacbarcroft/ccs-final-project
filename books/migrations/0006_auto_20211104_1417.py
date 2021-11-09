# Generated by Django 3.2.9 on 2021-11-04 14:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0003_auto_20211103_1821'),
        ('books', '0005_auto_20211103_1821'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='options',
            field=models.CharField(choices=[('No Good', 'No Good'), ('Okay', 'Okay'), ('Good Read', 'Good Read'), ('Loved It', 'Loved It')], default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='book',
            name='group',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='books', to='groups.group'),
        ),
    ]