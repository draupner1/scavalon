var ContentModel = require('../models/Content');

module.exports = Ractive.extend({
  template: require('../../tpl/home'),
  components: {
    navigation: require('../view/Navigation'),
    appfooter: require('../view/Footer')
  },
  data: {
    posting: true,
  },
  onrender: function() {
    if(userModel.isLogged()) {

      var model = new ContentModel();
      var self = this;
      var pagelist = [];
      var pno = 1;

      this.on('post', function() {
      });
      
      var doGetNext = function(rpn) {
        console.log("Trying to get page :" + rpn);
        model.fetisch(rpn, function(err, result) {
          if(!err) {
            self.set('posts', result.posts);
            self.set('latest',result.latest);
            self.set('paginateit', result.pagit);
            self.set('pno', result.pno);
            self.set('maxpages', result.pages);
            pagelist = [];
            for (var i = 1; i <= result.pages; i++) {
              pagelist.push(i);
            }
            self.set('pagelist', pagelist);
            console.log("Pagelist: " + pagelist);
          }
        });
      };
      
      this.on('getNext', function(evt, rpn){
        console.log("Now off to get page :" + rpn);
        self.pno = rpn;
        doGetNext(rpn);
      });

      var getPosts = function() {
        model.fetch(function(err, result) {
          if(!err) {
            self.set('posts', result.posts);
            self.set('latest',result.latest);
            self.set('paginateit', result.pagit);
            self.set('pno', result.pno);
            self.set('maxpages', result.pages);
            pagelist = [];
            for (var i = 1; i <= result.pages; i++) {
              pagelist.push(i);
            }
            self.set('pagelist', pagelist);
            console.log("Pagelist: " + pagelist);
          }
        });
      };
      
      doGetNext(pno);

//      getPosts();
//      setInterval(getPosts, 60000);
    } else {
      this.set('posting', false);
    }
  }
});