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
    
    this.on('showImage', function(file) {
      this.set('imageFile', "static/uploads/" + file.context);
      $('#modalShowImage').openModal();
    });
    
    this.on('forgetImage', function() {
      this.set('imageFile', "");
    });
    
    this.on('setActive', function(index){
      model.activate(index.context._id, function(error, result) {
        if(error) {
          self.set('error', error.error);
        } else {
          self.set('error', false);
          self.set('success', 'The race is prepared successfully.');
        }
        getRaces();
      });
    });

    this.on('create', function() {
      var files = this.find('input[type="file"]').files;
      var formData = new FormData();
      if(files.length > 0) {
        var file = files[0];
        if(file.type.match('image.*')) {
          formData.append('files', file, file.name);
        }
      }
      formData.append('title', this.get('title'));
      formData.append('descr', this.get('descr'));
      formData.append('notation', this.get('notation'));
      model.create(formData, function(error, result) {
        if(error) {
          self.set('error', error.error);
        } else {
          self.set('error', false);
          self.set('success', 'The race is prepared successfully.');
        }
        getRaces();
      });
    });

    var getRaces = function() {
      model.getRaces(function(err, result) {
        if(!err) {
          self.set('races', result.races);
          self.set('activeRace', result.activeRace);
          self.set('activeRaceTitle', result.activeRaceTitle);
        }
        $(document).ready(function(){
          $('.collapsible').collapsible();
        });
      });
    };

    getRaces();
  }
});