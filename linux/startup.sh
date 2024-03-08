#!/bin/bash

if ! command -v node &> /dev/null; then
  # Node.js
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - &&\
  sudo apt-get install -y nodejs

  sudo npm install -g jshint
fi

if ! command -v http-server &> /dev/null; then
  sudo npm install -g http-server
fi


cd "$(dirname "$0")"
cd ..

# pwd
http-server "$1"
# sh -c 'cd "$(dirname "$1")" && exec pwd && http-server'

google-chrome-stable --kiosk http://localhost:8080/