# Generated by Django 3.2.3 on 2021-08-04 22:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0037_auto_20210804_0055'),
    ]

    operations = [
        migrations.AddField(
            model_name='datefound',
            name='status',
            field=models.CharField(choices=[('1', 'Not Booked'), ('2', 'Booked')], default='1', max_length=20),
        ),
    ]