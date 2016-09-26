var ajax = require('../lib/Ajax');
var Base = require('./Base');
module.exports = Base.extend({
  data: {
    url: '/api/content'
  },
  create: function(formData, callback) {
    var self = this;
    ajax.request({
      url: this.get('url'),
      method: 'POST',
      formData: formData,
      json: true
    })
    .done(function(result) {
      callback(null, result);
    })
    .fail(function(xhr) {
      callback(JSON.parse(xhr.responseText));
    });
  },
  fetisch: function( rpn, cb) {
    var self = this;
    ajax.request({
      url: self.get('url') + '/' + rpn,
      json: true
    })
    .done(function(result) {
      self.set('value', result);
      if(cb) {
        cb(null, result);
      }
    })
    .fail(function(xhr) {
      self.set('value', null);
      if(cb) {
        cb({ error: 'Error loading ' + self.get('url') + '/' + rpn});
      }
    });
    return this;
  },
  fetch: function(cb) {
    var self = this;
    ajax.request({
      url: self.get('url'),
      json: true
    })
    .done(function(result) {
      self.set('value', result);
      if(cb) {
        cb(null, result);
      }
    })
    .fail(function(xhr) {
      self.set('value', null);
      if(cb) {
        cb({ error: 'Error loading ' + self.get('url')});
      }
    });
    return this;
  },
  usePost: function(url, formData, callback) {
    var self = this;
    ajax.request({
      url: this.get('url') + '/' + url,
      method: 'POST',
      formData: formData,
      json: true
    })
    .done(function(result) {
      callback(null, result);
    })
    .fail(function(xhr) {
      callback(JSON.parse(xhr.responseText));
    });
  }
});