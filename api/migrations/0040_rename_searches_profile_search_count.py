# Generated by Django 3.2.3 on 2021-08-05 14:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0039_student_last_crawled'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='searches',
            new_name='search_count',
        ),
    ]
