from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.User)
admin.site.register(models.Profile)
admin.site.register(models.Student)
admin.site.register(models.TestCenter)
admin.site.register(models.Proxy)
admin.site.register(models.Token)
admin.site.register(models.DateFound)
admin.site.register(models.CrawlerInstance)
