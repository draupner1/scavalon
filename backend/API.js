var Router = require('../frontend/js/lib/Router')();

Router
.add('api/version', require('./api/version'))
.add('api/lap', require('./api/laps'))
.add('api/user/login', require('./api/user-login'))
.add('api/user/logout', require('./api/user-logout'))
.add('api/user/car', require('./api/user-car'))
.add('api/user', require('./api/user'))
.add('api/content/:id', require('./api/content'))
.add('api/content', require('./api/content'))
.add('api/race/:id', require('./api/race'))
.add('api/race', require('./api/race'))
.add('api/link', require('./api/link'))
.add(require('./api/default'));

module.exports = function(req, res) {
  Router.check(req.url, [req, res]);
}