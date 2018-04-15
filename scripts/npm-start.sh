#!/bin/bash
cd /data/tracker
pm2 restart ecosystem.config.js --env production
