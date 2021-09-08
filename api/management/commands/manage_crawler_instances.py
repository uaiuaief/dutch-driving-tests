import datetime
from django.utils import timezone
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from api import models


logger = settings.LOGGER


class Command(BaseCommand):
    help = 'Manage crawler instances'
    dry_run = False

    def add_arguments(self, parser):
        parser.add_argument(
                '--dry-run',
                action='store_true',
                help='Logs what actions would be executed without executing them',
                )

    def handle(self, *args, **options):
        self.dry_run = options['dry_run']
        self.stdout.write('Running crawler manager')

        self.remove_instances_with_instructor_above_search_limit()
        self.remove_instances_with_invalid_instructor()
        self.remove_instances_with_invalid_student()
        self.remove_instances_with_banned_proxy()
        self.remove_instances_with_expired_cache()

        self.create_new_watcher_instances()
        self.create_new_booker_instances()

    def create_new_watcher_instances(self):
        self.stdout.write('Creating new watcher instances')
        active_profiles: list = self.get_active_profiles()

        watcher_instances = models.CrawlerInstance.objects\
                .filter(role='watch')\
                .values_list('id', flat=True)
        watcher_instances = list(watcher_instances)

        users_with_running_watcher = models.User.objects\
                .filter(crawler_instance__in=watcher_instances)\
                .values_list('id', flat=True)

        
        instructors_without_running_watcher = models.Profile.objects\
                .filter(id__in=active_profiles)\
                .exclude(user__in=users_with_running_watcher)
        
        students = []
        for each in instructors_without_running_watcher:
            student = each.students.filter(status='3').first()
            students.append(student)

        proxies = self.get_valid_proxies()

        for student, proxy in zip(students, proxies):
            self.stdout.write(f"""Creating watcher instance:
    Student - {student.get_full_name()}
    Proxy - {proxy.ip}
    Role - watch""")
            if not self.dry_run:
                self._create_crawler_instance(
                        instructor=student.instructor.user,
                        student=student,
                        proxy=proxy,
                        role='watch'
                        )

    def create_new_booker_instances(self):
        self.stdout.write('Creating new booker instances')
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

        for student, proxy in zip(students[:5], proxies):
            self.stdout.write(f"""Creating booker instance:
    Student - {student.get_full_name()}
    Proxy - {proxy.ip}
    Role - book""")
            if not self.dry_run:
                self._create_crawler_instance(
                        instructor=student.instructor.user,
                        student=student,
                        proxy=proxy,
                        role='book'
                        )

    def get_active_profiles(self) -> list:
        active_profiles = models.Profile.objects.filter(
                status='2',
                search_count__lte=settings.SEARCH_LIMIT
                ).values_list('id', flat=True)
        active_profiles = list(active_profiles)

        return active_profiles

    def get_valid_proxies(self):
        proxies = models.Proxy.objects.filter(
                is_banned=False
                ).order_by('last_used')

        return proxies

    def remove_instances_with_expired_cache(self):
        self.stdout.write('Removing instances with expired cache')
        time_limit = timezone.now() - datetime.timedelta(minutes=55)
        instances = models.CrawlerInstance.objects.filter(
                created_at__lte=time_limit
                )

        for each in instances:
            self.stdout.write(f'Removing "{each.role}" instance with id: {each.id}')
            if not self.dry_run:
                each.delete()

    def remove_instances_with_banned_proxy(self):
        self.stdout.write('Removing instances with banned proxies')
        instances = models.CrawlerInstance.objects.all()

        for each in instances:
            if each.proxy.is_banned:
                self.stdout.write(f'Removing "{each.role}" instance with id: {each.id}')
                if not self.dry_run:
                    each.delete()

    def remove_instances_with_instructor_above_search_limit(self):
        self.stdout.write('Removing instances with instructor above search limit')
        instances = models.CrawlerInstance.objects.all()

        for each in instances:
            if each.student.instructor.search_count >= settings.SEARCH_LIMIT:
                self.stdout.write(f'Removing "{each.role}" instance with id: {each.id}')
                if not self.dry_run:
                    each.delete()

    def remove_instances_with_invalid_instructor(self):
        self.stdout.write('Removing instances with invalid instructor')
        instances = models.CrawlerInstance.objects.all()

        for each in instances:
            if each.student.instructor.status != '2':
                self.stdout.write(f'Removing "{each.role}" instance with id: {each.id}')
                if not self.dry_run:
                    each.delete()

    def remove_instances_with_invalid_student(self):
        self.stdout.write('Removing instances with invalid student')
        instances = models.CrawlerInstance.objects.all()

        for each in instances:
            if each.student.status != '3':
                self.stdout.write(f'Removing "{each.role}" instance with id: {each.id}')
                if not self.dry_run:
                    each.delete()

    def _create_crawler_instance(self, **data):
        instance = models.CrawlerInstance(**data)

        instance.full_clean()
        instance.save()

        return instance
