# Generated by Django 3.2.3 on 2021-07-09 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_student_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='info_validation',
        ),
        migrations.AlterField(
            model_name='student',
            name='status',
            field=models.CharField(choices=[(1, 'In analysis'), (2, 'Invalid'), (3, 'Searching'), (4, 'Test found')], default=1, max_length=20),
        ),
    ]