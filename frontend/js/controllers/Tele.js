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
        getTele();
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
        getTele();
      });
    });

    var getTele = function() {
      model.getTele(function(err, result) {
        if(!err) {
///          self.set('races', result.races);
///          self.set('activeRace', result.activeRace);
///          self.set('activeRaceTitle', result.activeRaceTitle);
        }
      });
    };

    getTele();
  }
});