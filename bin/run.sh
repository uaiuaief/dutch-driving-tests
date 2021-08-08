#!/bin/bash
~/website/venv/bin/gunicorn -c conf/gunicorn_config.py dutch_driving_tests.wsgi
