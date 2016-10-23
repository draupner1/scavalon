var ajax = require('../lib/Ajax');
var Base = require('./Base');
module.exports = Base.extend({
  data: {
    url: '/api/link'
  },
  getTele: function(callback) {
    ajax.request({
      url: this.get('url'),
      method: 'GET',
      json: true
    })
    .done(function(result) {
      callback(null, result.hook[0]);
    })
    .fail(function(xhr) {
      callback(JSON.parse(xhr.responseText));
    });
  },
});