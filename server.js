var http = require('http');
var session = require('cookie-session');

var Assets = require('./backend/Assets');
var API = require('./backend/API');
var Default = require('./backend/Default');

var Router = require('./frontend/js/lib/Router')();

Router
.add('static', Assets)
.add('api', API)
.add(Default);

var checkSession = function(req, res) {
  session({
    keys: ['nodejs-by-example']
  })(req, res, function() {
    Process(req, res);
  });
}

var Process = function(req, res) {
  Router.check(req.url, [req, res]);
}
// PORT must be 8080, 8081 or 8082. why is not process.env.PORT set properly?
var app = http.createServer(checkSession).listen(8080, process.env.IP);
console.log("Listening on " + process.env.IP + ":" + process.env.PORT);

