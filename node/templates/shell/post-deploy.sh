#!/bin/bash
#set -e

source /usr/local/nvm/nvm.sh
nvm use 0.12.0
node --version

export NODE_ENV=production
./node_modules/.bin/pm25 kill
./node_modules/.bin/pm25 interact 056147cb0b76621b 0a9b46b7b35348d9
./node_modules/.bin/pm25 start processes.json
