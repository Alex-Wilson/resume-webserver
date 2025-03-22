#!/bin/bash

cd /var/www/resume-webserver
pm2 stop resume-website
git pull origin main
npm install --omit=dev
pm2 restart resume-website
pm2 logs resume-website
