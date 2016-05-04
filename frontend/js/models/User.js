var ajax = require('../lib/Ajax');
var Base = require('./Base');
module.exports = Base.extend({
  data: {
    url: '/api/user'
  },
  login: function(callback) {
    var self = this;
    ajax.request({
      url: this.get('url') + '/login',
      method: 'POST',
      data: {
        email: this.get('email'),
        password: this.get('password')
      },
      json: true
    })
    .done(function(result) {
      callback(null, result);
    })
    .fail(function(xhr) {
      callback(JSON.parse(xhr.responseText));
    });
  },
  logout: function(callback) {
    var self = this;
    ajax.request({
      url: this.get('url') + '/logout',
      json: true
    })
    .done(function(result) {
      callback(null, result);
    })
    .fail(function(xhr) {
      callback(JSON.parse(xhr.responseText));
    });
  },
  isLogged: function() {
    return this.get('value.firstName') && this.get('value.lastName');
  },
  setCar: function(callback) {
    var self = this;
    ajax.request({
      url: self.get('url') + '/car',
      method: 'PUT',
      data: {
        car: this.get('value.car'),
        swv: this.get('value.swv')
        },
      json: true
    })
    .done(function(result) {
      if(callback) {
        callback(null, result);
      }
    })
    .fail(function(xhr) {
      if(callback) {
        callback(JSON.parse(xhr.responseText));
      }
    });
//    return this;
  }
});