#!/bin/bash
​
[ -s "/.nvm/nvm.sh" ] && \. "/.nvm/nvm.sh"

# echo yesss
cd /var/www/html/website
npm install --unsafe-perm=true --allow-root
npm --v
npm run build