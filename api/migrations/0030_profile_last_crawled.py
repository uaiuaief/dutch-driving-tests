# Generated by Django 3.2.3 on 2021-07-31 17:36

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_remove_student_last_crawled'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='last_crawled',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
    ]
