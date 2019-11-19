#!/bin/bash
​
[ -s "/.nvm/nvm.sh" ] && \. "/.nvm/nvm.sh"

# echo yesss
cd /var/www/html/website
npm install
npm --v
npm run build