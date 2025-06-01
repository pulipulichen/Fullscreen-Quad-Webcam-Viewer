#!/bin/bash

# 偵測如果沒有vlc，則安裝
if ! command -v vlc &> /dev/null
then
    echo "VLC not found, installing..."
    sudo apt-get update
    sudo apt-get install -y vlc
else
    echo "VLC is already installed."
fi

sudo pkill vlc

# 啟動vlc api
vlc -I telnet --telnet-password=password &
