var ContentModel = require('../models/Content');
var RaceModel = require('../models/Race');

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
      var races = new RaceModel();
      var self = this;
      var pagelist = [];
      var frank = 1;
      self.pno = 1;
      self.viewRace = 1;

      this.on('post', function() {
      });
      
      var doGetRaces = function() {
        races.getRaces(function(err, result) {
          if(!err) {
            self.set('races', result.races);
          }
          $('select').material_select();
          $('#viewSelect').change(function(){
            self.viewRace=$('#viewSelect').val();
            console.log("Selected change: "+self.viewRace);
            doGetNext(1);
          })
        });
      };
      
      var repeatGetNext = function() {
//        console.log("repeat update of page :" + self.pno);
        doGetNext(self.pno);
      };
      
      var doGetNext = function(rpn) {
//        console.log("Trying to get page :" + rpn);
        model.fetisch(rpn, self.viewRace, function(err, result) {
          if(!err) {
            self.set('posts', result.posts);
            self.set('latest',result.latest);
            self.set('paginateit', result.pagit);
            self.set('pno', result.pno);
            self.set('maxpages', result.pages);
            self.set('frank', result.frank);
            self.set('activeRaceTitle', result.activeRaceTitle);
            pagelist = [];
            for (var i = 1; i <= result.pages; i++) {
              pagelist.push(i);
            }
            self.set('pagelist', pagelist);
            $(document).ready(function(){
              $('.collapsible').collapsible();
            });
          }
        });
      };
      
      this.on('getNext', function(evt, rpn){
//        console.log("Now off to get page :" + rpn);
        self.pno = rpn;
        doGetNext(rpn);
        
      });
      
      doGetNext(self.pno);
      doGetRaces();
      self.interval = setInterval(repeatGetNext, 60000);
    } else {
      this.set('posting', false);
    }
  },
  
  onunrender: function() {
    var self = this;
    clearInterval( self.interval );
  }
});