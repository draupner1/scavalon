var ContentModel = require('../models/Content');
var Friends = require('../models/Friends');

module.exports = Ractive.extend({
  template: require('../../tpl/home'),
  components: {
    navigation: require('../view/Navigation'),
    appfooter: require('../view/Footer')
  },
  data: {
    posting: true,
    taggedFriends: []
  },
  onrender: function() {
    if(userModel.isLogged()) {

      var model = new ContentModel();
      var self = this;

      this.on('post', function() {
      });
      
      this.on('share', function(e, id) {
      });
      this.on('like', function(e, id) {
      });

      var getPosts = function() {
        model.fetch(function(err, result) {
          if(!err) {
            self.set('posts', result.posts);
            self.set('latest',result.latest);
          }
        });
      };

      getPosts();
    } else {
      this.set('posting', false);
    }
  }
});