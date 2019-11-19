#!/bin/bash
​
[ -s "/.nvm/nvm.sh" ] && \. "/.nvm/nvm.sh"

# echo yesss
apt-get update
sudo apt-get install nodejs -y
cd /var/www/html/website
npm --v
npm run build