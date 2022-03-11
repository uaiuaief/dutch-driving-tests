import datetime
from django.utils import timezone
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from api import models


logger = settings.LOGGER


class Command(BaseCommand):
    help = 'Unban proxies'

    def handle(self, *args, **options):
        all_proxies = models.Proxy.objects.all()
        if all_proxies.filter(is_banned=True).count() > 40:
            self.unban_all_proxies()

    def unban_all_proxies(self):
        all_proxies = models.Proxy.objects.all()
        for proxy in all_proxies:
            proxy.is_banned = False
            proxy.save()

        
