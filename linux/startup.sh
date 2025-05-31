#!/bin/bash

cd "$(dirname "$0")"

# git pull

sudo pkill http-server

./vlc.sh

if ! command -v node &> /dev/null; then
  # Node.js
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - &&\
  sudo apt-get install -y nodejs

  sudo npm install -g jshint
fi

if ! command -v http-server &> /dev/null; then
  sudo npm install -g http-server
fi

if ! command -v xdotool &> /dev/null; then
  sudo apt install xdotool -y
fi



cd "$(dirname "$0")"
cd ..

# pwd
http-server ./../ -p 18080 &
# sh -c 'cd "$(dirname "$1")" && exec pwd && http-server'

sleep 10

#google-chrome-stable --kiosk http://localhost:8080/ &
BROWSER=""
if command -v firefox &> /dev/null; then
  BROWSER="firefox"
elif command -v firefox-esr &> /dev/null; then
  BROWSER="firefox-esr"
fi

if [ -n "$BROWSER" ]; then
  "$BROWSER" --kiosk http://localhost:18080/ &
else
  echo "Neither firefox nor firefox-esr found. Please install one of them."
fi

sleep 10

xdotool mousemove 50 50
