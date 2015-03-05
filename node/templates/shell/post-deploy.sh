#!/bin/bash
#set -e

export NODE_ENV=production
pm2 kill
# pm2 start index.js -i max --name hotel-fe-static
pm2 start processes.json
pm2 reload all
