# Generated by Django 3.2.3 on 2021-07-02 16:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_student_instructor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='instructor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='students', to='api.profile'),
        ),
    ]
