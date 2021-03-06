# Generated by Django 3.2.3 on 2021-09-05 18:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0040_rename_searches_profile_search_count'),
    ]

    operations = [
        migrations.CreateModel(
            name='CrawlerInstance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('last_ping', models.DateTimeField(blank=True, null=True)),
                ('role', models.CharField(choices=[('watch', 'Watch'), ('book', 'Book')], max_length=20)),
                ('proxy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='crawler_instance', to='api.proxy')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='crawler_instance', to='api.student')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
