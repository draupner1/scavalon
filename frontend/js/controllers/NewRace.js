var RaceModel = require('../models/Race');

module.exports = Ractive.extend({
  template: require('../../tpl/race'),
  components: {
    navigation: require('../view/Navigation'),
    appfooter: require('../view/Footer')
  },
  data: { },
  onrender: function() {
    var model = new RaceModel();
    var self = this;
    this.observe('firstLane', model.setter('firstlane'));
    this.observe('secondLane', model.setter('secondlane'));
    var raceId = this.get('raceId');
    
    if(raceId) {
      var showPage = function() {
        model.getRace(raceId, function(err, result) {
          if(!err && result.races.length > 0) {
            var race = result.races[0];
            self.set('firstLane', race.firstlane);
            self.set('secondLane', race.secondlane);
            self.set('raceId', raceId);
          } else {
            self.set('pageTitle', 'No Races.');
          }
        });
      }
      showPage();
      
      
      return;
    }
    this.on('readLanes', function() {
      self.set('firstLane', '#24');
      self.set('secondLane', '#42');
      Materialize.updateTextFields();
//      showPage();
    });

    this.on('create', function() {
      var formData = new FormData();
      model.create(function(error, result) {
        if(error) {
          self.set('error', error.error);
        } else {
          self.set('error', false);
          self.set('success', 'The race is prepared successfully. Go <a href="">there</a> and race.');
          self.set('raceId', '23');
        }
        getRaces();
      });
    });

    var getRaces = function() {
      model.fetch(function(err, result) {
        if(!err) {
          self.set('raceses', result.races);
        }
      });
    };

    getRaces();
  }
});