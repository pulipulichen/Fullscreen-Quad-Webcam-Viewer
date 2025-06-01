#!/bin/bash
sleep 10

while [ -z "$(wmctrl -l | grep 'KDE Wallet Service')" ]; do
  sleep 1
done

sleep 1
wmctrl -a "KDE Wallet Service"
sleep 1
#echo "p" >> /tmp/ok.txt
xdotool type "password"
sleep 1
xdotool key Return
