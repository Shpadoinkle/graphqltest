#!/bin/bash
​

cd /var/www/html/website
echo yesss
sudo apt-get update
sudo apt-get install nodejs -y
npm --v
npm run build