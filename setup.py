import os
import logging
os.environ['DJANGO_SETTINGS_MODULE'] = 'dutch_driving_tests.settings'
import django
django.setup()
from django.db import IntegrityError
from test_centers import TEST_CENTERS
from api import models
from dotenv import load_dotenv


logger = logging.getLogger(__name__)


if __name__ == "__main__":
    load_dotenv()

    # Create crawler user
    logger.info("Creating crawler user")
    try:
        crawler_user = models.User(
                is_superuser=True, 
                is_active=True,
                is_staff=True,
                is_admin=True,
                email=os.environ['CRAWLER_USERNAME'],
                password=os.environ['CRAWLER_PASSWORD']
        )
        crawler_user.save()
    except IntegrityError:
        logger.info("Crawler user already exists")


    # Add Test centers
    logger.info("Creating test centers")
    models.TestCenter.objects.all().delete()
    for tc in TEST_CENTERS:
        instance = models.TestCenter(name=tc)
        instance.save()




