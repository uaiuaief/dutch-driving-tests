import datetime
from django.utils import timezone
from django.core.management.base import BaseCommand, CommandError
from api import models


class Command(BaseCommand):
    help = 'Manage crawler instances'

    def handle(self, *args, **options):
        print(self.create_new_booker_instances())

    def create_new_watcher_instances(self):
        pass

    def create_new_booker_instances(self):
        active_profiles: list = self.get_active_profiles()

        booker_instances = models.CrawlerInstance.objects.filter(
                role='book'
                ).values_list('id', flat=True)
        booker_instances = list(booker_instances)

        students = models.Student.objects.exclude(
                crawler_instance__in=booker_instances,
                )
        students = students.filter(
                instructor__in=active_profiles,
                status='3'
                )

        proxies = self.get_valid_proxies()

        for student, proxy in zip(students, proxies):
            self._create_crawler_instance(
                    student=student,
                    proxy=proxy,
                    role='book'
                    )


    def get_active_profiles(self) -> list:
        active_profiles = models.Profile.objects.filter(
                status='2',
                search_count__lte=270
                ).values_list('id', flat=True)
        active_profiles = list(active_profiles)

        return active_profiles

    def get_valid_proxies(self):
        proxies = models.Proxy.objects.filter(
                is_banned=False
                ).order_by('last_used')

        return proxies

    def remove_instances_with_expired_cache(self):
        print('Removing instances with expired cache')
        time_limit = timezone.now() - datetime.timedelta(minutes=55)
        instances = models.CrawlerInstance.objects.filter(
                created_at__lte=time_limit
                )

        for each in instances:
            each.delete()

    def remove_instances_with_banned_proxy(self):
        print('Removing instances with banned proxies')
        instances = models.CrawlerInstance.objects.all()

        for each in instances:
            if each.proxy.is_banned:
                each.delete()

    def _create_crawler_instance(self, **data):
        instance = models.CrawlerInstance(**data)

        instance.full_clean()
        instance.save()

        return instance
