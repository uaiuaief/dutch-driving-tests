# Generated by Django 3.2.3 on 2021-09-07 19:05

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0043_alter_crawlerinstance_instructor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='crawlerinstance',
            name='last_ping',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
    ]
