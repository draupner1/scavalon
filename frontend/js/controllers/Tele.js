var TeleModel = require('../models/Tele');

module.exports = Ractive.extend({
  template: require('../../tpl/tele'),
  components: {
    navigation: require('../view/Navigation'),
    appfooter: require('../view/Footer')
  },
  data: { },
  onrender: function() {
    var model = new TeleModel();
    var self = this;

    var getTele = function() {
      model.getTele(function(err, result) {
        if(!err) {
          self.set('wsip', result.ip);
          self.set('wsurl', result.url);
        }
      });
    };

    getTele();
    self.interval = setInterval(getTele, 15000);
  },
  
  onunrender: function() {
    var self = this;
    clearInterval( self.interval );
  }
});