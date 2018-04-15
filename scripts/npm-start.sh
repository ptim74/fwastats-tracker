#!/bin/bash
cd /data/tracker
pm2 reload ecosystem.config.js --env production
