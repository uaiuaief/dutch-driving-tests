# Generated by Django 3.2.3 on 2021-07-23 23:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20210723_2317'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='test_center',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='students', to='api.testcenter'),
        ),
    ]
