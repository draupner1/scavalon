# Charon
Basic test of NodeJS server

Installs on the server:
npm install -g grunt-cli
npm install -g gulp
npm install mocha -g
npm install -g requirejs
npm install -g browserify
npm install mocha-phantomjs -g

mongod

Test commands:
mocha-phantomjs http://localhost:9000\?test=1


npm install dalek-cli -g
> dalek ./tests/dalekjs.spec.js -b chrome
