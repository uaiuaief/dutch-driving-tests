from django.core.management.base import BaseCommand, CommandError
from api.models import Profile


class Command(BaseCommand):
    help = 'Reset search count on all instructors'

    def handle(self, *args, **options):
        instructors = Profile.objects.all()
        for each in instructors:
            each.search_count = 0
            each.save()
