#!/bin/bash

while :
do
	~/website/venv/bin/python ~/website/manage.py manage_crawler_instances
	sleep 15
done

