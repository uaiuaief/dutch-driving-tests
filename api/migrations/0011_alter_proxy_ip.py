# Generated by Django 3.2.3 on 2021-07-09 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20210709_1711'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proxy',
            name='ip',
            field=models.CharField(max_length=30),
        ),
    ]