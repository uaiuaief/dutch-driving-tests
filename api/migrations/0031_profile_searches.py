# Generated by Django 3.2.3 on 2021-07-31 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_profile_last_crawled'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='searches',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
