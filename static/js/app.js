(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"../../tpl/home":17,"../models/Content":10,"../view/Footer":14,"../view/Navigation":15}],2:[function(require,module,exports){
module.exports = Ractive.extend({
  template: require('../../tpl/login'),
  components: {
    navigation: require('../view/Navigation'),
    appfooter: require('../view/Footer')
  },
  onrender: function() {
    var self = this;
    this.observe('email', userModel.setter('email'));
    this.observe('password', userModel.setter('password'));
    this.on('login', function() {
      userModel.login(function(error, result) {
        if(error) {
          self.set('error', error.error);
        } else {
          self.set('error', false);
          window.location.href = '/';
        }
      });
    });
  }
});
},{"../../tpl/login":18,"../view/Footer":14,"../view/Navigation":15}],3:[function(require,module,exports){
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
},{"../../tpl/race":21,"../models/Race":11,"../view/Footer":14,"../view/Navigation":15}],4:[function(require,module,exports){
module.exports = Ractive.extend({
  template: require('../../tpl/profile'),
  components: {
    navigation: require('../view/Navigation'),
    appfooter: require('../view/Footer')
  },
  data: {
  },
  onrender: function() {
    var self = this;
    this.set(userModel.get('value'));
    this.on('updateProfile', function() {
      userModel.set('value.firstName', this.get('firstName'));
      userModel.set('value.lastName', this.get('lastName'));
      if(this.get('password') != '') {
        userModel.set('value.password', this.get('password'));
      }
      userModel.save(function(error, result) {
        if(error) {
          self.set('error', error.error);
        } else {
          self.set('error', false);
          self.set('success', 'Profile updated successfully.');
        }
      });
    });
    this.on('deleteProfile', function() {
      if(confirm('Are you sure! Your account will be deleted permanently.')) {
        userModel.del(function() {
          window.location.href = '/';
        });
      }
    });
    this.on('setCar', function() {
      userModel.set('value.car', this.get('carId'));
      userModel.set('value.swv', this.get('carSw'));
      userModel.setCar(function(error, result) {
        if(error) {
          self.set('error', error.error);
        } else {
          self.set('error', false);
          self.set('success', 'Car owner updated successfully.');
        }
      });
    })

  }
});
},{"../../tpl/profile":20,"../view/Footer":14,"../view/Navigation":15}],5:[function(require,module,exports){
module.exports = Ractive.extend({
  template: require('../../tpl/register'),
  components: {
    navigation: require('../view/Navigation'),
    appfooter: require('../view/Footer')
  },
  onrender: function() {
    var self = this;
    this.observe('firstName', userModel.setter('value.firstName'));
    this.observe('lastName', userModel.setter('value.lastName'));
    this.observe('email', userModel.setter('value.email'));
    this.observe('password', userModel.setter('value.password'));
    this.on('register', function() {
      userModel.create(function(error, result) {
        if(error) {
          self.set('error', error.error);
        } else {
          self.set('error', false);
          self.set('success', 'Registration successful. Click <a href="/login">here</a> to login.');
        }
      });
    });
  }
});
},{"../../tpl/register":22,"../view/Footer":14,"../view/Navigation":15}],6:[function(require,module,exports){
var Router = require('./lib/Router')();
var Home = require('./controllers/Home');
var Register = require('./controllers/Register');
var Login = require('./controllers/Login');
var NewRace = require('./controllers/NewRace');
var Profile = require('./controllers/Profile');
var UserModel = require('./models/User');
var currentPage;
var body;

var showPage = function(newPage) {
  if(currentPage) currentPage.teardown();
  currentPage = newPage;
  body.innerHTML = '';
  currentPage.render(body);
  currentPage.on('navigation.goto', function(e, route) {
    Router.navigate(route);
  });
};

window.onload = function() {

  body = document.querySelector('body .container2');
  userModel = new UserModel();
  userModel.fetch(function(error, result) {
    Router
    .add('home', function() {
      var p = new Home();
      showPage(p);
    })
    .add('register', function() {
      var p = new Register();
      showPage(p);
    })
    .add('login', function() {
      var p = new Login();
      showPage(p);
    })
    .add('newrace', function() {
      var p = new NewRace();
      showPage(p);
    })
    .add('logout', function() {
      userModel.logout(function(error, result) {
        window.location.href = '/';
      });
    })
    .add('profile', function() {
      if(userModel.isLogged()) {
        var p = new Profile();
        showPage(p);
      } else {
        Router.navigate('login');
      }    
    })
    .add(function() {
      Router.navigate('home');
    })
    .listen()
    .check();
  });

  
};

},{"./controllers/Home":1,"./controllers/Login":2,"./controllers/NewRace":3,"./controllers/Profile":4,"./controllers/Register":5,"./lib/Router":8,"./models/User":12}],7:[function(require,module,exports){
module.exports = {
  request: function(ops) {
    if(typeof ops == 'string') ops = { url: ops };
    ops.url = ops.url || '';
    ops.method = ops.method || 'get'
    ops.data = ops.data || {};
    var getParams = function(data, url) {
      var arr = [], str;
      for(var name in data) {
        arr.push(name + '=' + encodeURIComponent(data[name]));
      }
      str = arr.join('&');
      if(str != '') {
        return url ? (url.indexOf('?') < 0 ? '?' + str : '&' + str) : str;
      }
      return '';
    }
    var api = {
      host: {},
      process: function(ops) {
        var self = this;
        this.xhr = null;
        if(window.ActiveXObject) { this.xhr = new ActiveXObject('Microsoft.XMLHTTP'); }
        else if(window.XMLHttpRequest) { this.xhr = new XMLHttpRequest(); }
        if(this.xhr) {
          this.xhr.onreadystatechange = function() {
            if(self.xhr.readyState == 4 && self.xhr.status == 200) {
              var result = self.xhr.responseText;
              if(ops.json === true && typeof JSON != 'undefined') {
                result = JSON.parse(result);
              }
              self.doneCallback && self.doneCallback.apply(self.host, [result, self.xhr]);
            } else if(self.xhr.readyState == 4) {
              self.failCallback && self.failCallback.apply(self.host, [self.xhr]);
            }
            self.alwaysCallback && self.alwaysCallback.apply(self.host, [self.xhr]);
          }
        }
        if(ops.method == 'get') {
          this.xhr.open("GET", ops.url + getParams(ops.data, ops.url), true);
        } else {
          if(ops.formData) {
            this.xhr.open(ops.method, ops.url);
          } else {
            this.xhr.open(ops.method, ops.url, true);
            this.setHeaders({
              'X-Requested-With': 'XMLHttpRequest',
              'Content-type': 'application/x-www-form-urlencoded'
            });
          }
        }
        if(ops.headers && typeof ops.headers == 'object') {
          this.setHeaders(ops.headers);
        }       
        setTimeout(function() {
          if(ops.formData) {
            self.xhr.send(ops.formData); 
          } else {
            ops.method == 'get' ? self.xhr.send() : self.xhr.send(getParams(ops.data)); 
          }
        }, 20);
        return this;
      },
      done: function(callback) {
        this.doneCallback = callback;
        return this;
      },
      fail: function(callback) {
        this.failCallback = callback;
        return this;
      },
      always: function(callback) {
        this.alwaysCallback = callback;
        return this;
      },
      setHeaders: function(headers) {
        for(var name in headers) {
          this.xhr && this.xhr.setRequestHeader(name, headers[name]);
        }
      }
    }
    return api.process(ops);
  }
}
},{}],8:[function(require,module,exports){
module.exports = function() {
  return {
    routes: [],
    root: '/',
    getFragment: function() {
      var fragment = '';
      fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
      return this.clearSlashes(fragment);
    },
    clearSlashes: function(path) {
      return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },
    add: function(re, handler) {
      if(typeof re == 'function') {
        handler = re;
        re = '';
      }
      this.routes.push({ re: re, handler: handler});
      return this;
    },
    check: function(f, params) {
      var fragment = typeof f !== 'undefined' ? f.replace(/^\//, '') : this.getFragment(), vars;
      for(var i=0; i<this.routes.length; i++) {
        var match, re = this.routes[i].re;
        re = re.replace(/^\//, '');
        var vars = re.match(/:[^\s/]+/g);
        var r = new RegExp('^' + re.replace(/:[^\s/]+/g, '([\\w-]+)'));
        match = fragment.match(r);
        if(match) {
          match.shift();
          var matchObj = {};
          if(vars) {
            for(var j=0; j<vars.length; j++) {
              var v = vars[j];
              matchObj[v.substr(1, v.length)] = match[j];
            }
          }
          this.routes[i].handler.apply({}, (params || []).concat([matchObj]));
          return this;
        }
      }
      return false;
    },
    listen: function() {
      var self = this;
      var current = self.getFragment();
      var fn = function() {
        if(current !== self.getFragment()) {
          current = self.getFragment();
          self.check(current);
        }
      }
      clearInterval(this.interval);
      this.interval = setInterval(fn, 50);
      return this;
    },
    navigate: function(path) {
      path = path ? path : '';
      history.pushState(null, null, this.root + this.clearSlashes(path));
      return this;
    }
  }
};
},{}],9:[function(require,module,exports){
var ajax = require('../lib/Ajax');
module.exports = Ractive.extend({
  data: {
    value: null,
    url: ''
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
  create: function(cb) {
    var self = this;
    ajax.request({
      url: self.get('url'),
      method: 'POST',
      data: this.get('value'),
      json: true
    })
    .done(function(result) {
      if(cb) {
        cb(null, result);
      }
    })
    .fail(function(xhr) {
      if(cb) {
        cb(JSON.parse(xhr.responseText));
      }
    });
    return this;
  },
  save: function(cb) {
    var self = this;
    ajax.request({
      url: self.get('url'),
      method: 'PUT',
      data: this.get('value'),
      json: true
    })
    .done(function(result) {
      if(cb) {
        cb(null, result);
      }
    })
    .fail(function(xhr) {
      if(cb) {
        cb(JSON.parse(xhr.responseText));
      }
    });
    return this;
  },
  del: function(cb) {
    var self = this;
    ajax.request({
      url: self.get('url'),
      method: 'DELETE',
      json: true
    })
    .done(function(result) {
      if(cb) {
        cb(null, result);
      }
    })
    .fail(function(xhr) {
      if(cb) {
        cb(JSON.parse(xhr.responseText));
      }
    });
    return this;
  },
  bindComponent: function(component) {
    if(component) {
      this.observe('value', function(v) {
        for(var key in v) component.set(key, v[key]);
      }, { init: false });
    }
    return this;
  },
  setter: function(key) {
    var self = this;
    return function(v) {
      self.set(key, v);
    }
  }
});
},{"../lib/Ajax":7}],10:[function(require,module,exports){
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
},{"../lib/Ajax":7,"./Base":9}],11:[function(require,module,exports){
var ajax = require('../lib/Ajax');
var Base = require('./Base');
module.exports = Base.extend({
  data: {
    url: '/api/race'
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
  create: function(callback) {
    var self = this;
    ajax.request({
      url: this.get('url'),
      method: 'POST',
      data: {
        //laps: this.get('laps'),
        firstlane: this.get('firstlane'),
        secondlane: this.get('secondlane')
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
  getRace: function(raceId, callback) {
    var self = this;
    ajax.request({
      url: this.get('url') + '/' + raceId,
      method: 'GET',
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
},{"../lib/Ajax":7,"./Base":9}],12:[function(require,module,exports){
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
},{"../lib/Ajax":7,"./Base":9}],13:[function(require,module,exports){
var Base = require('./Base');
module.exports = Base.extend({
  data: {
    url: '/api/version'
  }
});
},{"./Base":9}],14:[function(require,module,exports){
var FooterModel = require('../models/Version');

module.exports = Ractive.extend({
  template: require('../../tpl/footer'),
  onrender: function() {
    var model = new FooterModel();
    model.bindComponent(this).fetch();
  },
    onconstruct: function() {
    this.data.isLogged = !!userModel.isLogged();
  }
});
},{"../../tpl/footer":16,"../models/Version":13}],15:[function(require,module,exports){
module.exports = Ractive.extend({
  template: require('../../tpl/navigation'),
  onconstruct: function() {
    this.data.isLogged = !!userModel.isLogged();
  }
});
},{"../../tpl/navigation":19}],16:[function(require,module,exports){
module.exports = {"v":3,"t":[{"t":7,"e":"footer","a":{"class":"page-footer blue"},"f":[{"t":4,"f":[{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"div","a":{"class":"row"},"f":[{"t":7,"e":"div","a":{"class":"col l6 s12"},"f":[{"t":7,"e":"p","a":{"class":"grey-text text-lighten-4"},"f":["Avalon Innovation, the inventive pal."]}]}," ",{"t":7,"e":"div","a":{"class":"col l3 s12"},"f":[{"t":7,"e":"ul","f":[{"t":7,"e":"li","f":[{"t":7,"e":"a","a":{"class":"white-text"},"f":["Mail to: some.one@avaloninnovation.com"]}]}," ",{"t":7,"e":"li","f":[{"t":7,"e":"a","a":{"class":"white-text"},"f":["Address: Långholmsgatan 34, 117 33 Stockholm"]}]}]}]}]}]}],"n":50,"x":{"r":["isLogged"],"s":"!_0"}}," ",{"t":7,"e":"div","a":{"class":"footer-copyright"},"f":[{"t":7,"e":"div","a":{"class":"container"},"f":["Version: ",{"t":2,"r":"version"},", Styled with ",{"t":7,"e":"a","a":{"class":"brown-text text-lighten-3","href":"http://materializecss.com"},"f":["Materialize, by Avalon Innovation."]}]}]}," ",{"t":7,"e":"script","a":{"type":"text/javascript","src":"/static/js/init.js"}}]}]}
},{}],17:[function(require,module,exports){
module.exports = {"v":3,"t":[{"t":7,"e":"header","f":[{"t":7,"e":"navigation"}]}," ",{"t":4,"f":[{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"div","a":{"class":"rankingtab"},"f":[{"t":7,"e":"h4","f":["Ranking"]}," ",{"t":7,"e":"table","a":{"class":"striped"},"f":[{"t":7,"e":"thead","f":[{"t":7,"e":"tr","f":[{"t":7,"e":"th","a":{"data-field":"lane"},"f":["Bana"]}," ",{"t":7,"e":"th","a":{"data-field":"laptime"},"f":["Varv Tid"]}," ",{"t":7,"e":"th","a":{"data-field":"userName"},"f":["Namn"]}," ",{"t":7,"e":"th","a":{"data-field":"car"},"f":["Bil"]}," ",{"t":7,"e":"th","a":{"data-field":"swv"},"f":["SW"]}," ",{"t":7,"e":"th","a":{"data-field":"time"},"f":["Tid"]}]}]}," ",{"t":7,"e":"tbody","f":[{"t":4,"f":[{"t":7,"e":"tr","f":[{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"lane"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"laptime"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"userName"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"car"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"swv"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"time"]}}]}]}],"n":52,"i":"index","r":"posts"}]}]}," ",{"t":4,"f":[{"t":7,"e":"ul","a":{"class":"pagination"},"f":[{"t":4,"f":[{"t":7,"e":"li","a":{"class":"disabled"},"f":[{"t":7,"e":"a","v":{"click":{"n":"getNext","a":[1]}},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["chevron_left"]}]}]}],"n":50,"x":{"r":["pno"],"s":"_0===1"}},{"t":4,"n":51,"f":[{"t":7,"e":"li","a":{"class":"waves-effect"},"f":[{"t":7,"e":"a","v":{"click":{"n":"getNext","d":[{"t":2,"x":{"r":["pno"],"s":"_0-1"}}]}},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["chevron_left"]}]}]}],"x":{"r":["pno"],"s":"_0===1"}}," ",{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"li","a":{"class":"active"},"f":[{"t":7,"e":"a","v":{"click":{"n":"getNext","d":[{"t":2,"x":{"r":["index"],"s":"_0+1"}}]}},"f":[{"t":2,"rx":{"r":"pagelist","m":[{"t":30,"n":"index"}]}}]}]}],"n":50,"x":{"r":["pno","index"],"s":"_0===_1+1"}},{"t":4,"n":51,"f":[{"t":7,"e":"li","a":{"class":"waves-effect"},"f":[{"t":7,"e":"a","v":{"click":{"n":"getNext","d":[{"t":2,"x":{"r":["index"],"s":"_0+1"}}]}},"f":[{"t":2,"rx":{"r":"pagelist","m":[{"t":30,"n":"index"}]}}]}]}],"x":{"r":["pno","index"],"s":"_0===_1+1"}}],"n":52,"i":"index","r":"pagelist"}," ",{"t":4,"f":[{"t":7,"e":"li","a":{"class":"disabled"},"f":[{"t":7,"e":"a","v":{"click":{"n":"getNext","d":[{"t":2,"r":"maxpages"}]}},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["chevron_right"]}]}]}],"n":50,"x":{"r":["pno","maxpages"],"s":"_0===_1"}},{"t":4,"n":51,"f":[{"t":7,"e":"li","a":{"class":"waves-effect"},"f":[{"t":7,"e":"a","v":{"click":{"n":"getNext","d":[{"t":2,"x":{"r":["pno"],"s":"_0+1"}}]}},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["chevron_right"]}]}]}],"x":{"r":["pno","maxpages"],"s":"_0===_1"}}]}],"n":50,"x":{"r":["paginateit"],"s":"_0===1"}}]}," ",{"t":7,"e":"div","a":{"class":"divider"}}," ",{"t":7,"e":"h4","f":["Senaste Varvtider"]}," ",{"t":7,"e":"table","a":{"class":"striped"},"f":[{"t":7,"e":"thead","f":[{"t":7,"e":"tr","f":[{"t":7,"e":"th","a":{"data-field":"lane"},"f":["Bana"]}," ",{"t":7,"e":"th","a":{"data-field":"laptime"},"f":["Varv Tid"]}," ",{"t":7,"e":"th","a":{"data-field":"userName"},"f":["Namn"]}," ",{"t":7,"e":"th","a":{"data-field":"car"},"f":["Bil"]}," ",{"t":7,"e":"th","a":{"data-field":"swv"},"f":["SW"]}," ",{"t":7,"e":"th","a":{"data-field":"time"},"f":["Tid"]}]}]}," ",{"t":7,"e":"tbody","f":[{"t":4,"f":[{"t":7,"e":"tr","f":[{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"latest","m":[{"t":30,"n":"index"},"lane"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"latest","m":[{"t":30,"n":"index"},"laptime"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"latest","m":[{"t":30,"n":"index"},"userName"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"latest","m":[{"t":30,"n":"index"},"car"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"latest","m":[{"t":30,"n":"index"},"swv"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"latest","m":[{"t":30,"n":"index"},"time"]}}]}]}],"n":52,"i":"index","r":"latest"}]}]}," ",{"t":7,"e":"br"}]}],"n":50,"x":{"r":["posting"],"s":"_0===true"}},{"t":4,"n":51,"f":[{"t":7,"e":"div","a":{"id":"index-banner","class":"parallax-container"},"f":[{"t":7,"e":"div","a":{"class":"section no-pad-bot"},"f":[{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"br"},{"t":7,"e":"br"}," ",{"t":7,"e":"h1","a":{"class":"header center blue-text text-lighten-2"},"f":["Scalectrix by Avalon"]}," ",{"t":7,"e":"div","a":{"class":"row center"},"f":[{"t":7,"e":"h5","a":{"class":"header col s12 light blue-text"},"f":["Programera din egen banbil."]}]}," ",{"t":7,"e":"div","a":{"class":"row center"},"f":[{"t":7,"e":"a","a":{"href":"/register","class":"btn-large waves-effect waves-light blue lighten-1"},"f":["Register"]}]}," ",{"t":7,"e":"br"},{"t":7,"e":"br"}]}]}," ",{"t":7,"e":"div","a":{"class":"parallax"},"f":[{"t":7,"e":"img","a":{"src":"static/uploads/background1.jpg","alt":"Unsplashed background img 1"}}]}]}," ",{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"div","a":{"class":"section"},"f":[" ",{"t":7,"e":"div","a":{"class":"row"},"f":[{"t":7,"e":"div","a":{"class":"col s12 m4"},"f":[{"t":7,"e":"div","a":{"class":"icon-block"},"f":[{"t":7,"e":"h2","a":{"class":"center blue-text darken-3"},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["flash_on"]}]}," ",{"t":7,"e":"h5","a":{"class":"center"},"f":["Hur snabbt kan du köra?"]}," ",{"t":7,"e":"p","a":{"class":"light"},"f":["Gör din egen mjukvara till en av våra bilar. Hur snabbt vågar du låta dom köra? Hur kommer du runt alla kurvor? Hur når du kortaste varvtiden?"]}]}]}," ",{"t":7,"e":"div","a":{"class":"col s12 m4"},"f":[{"t":7,"e":"div","a":{"class":"icon-block"},"f":[{"t":7,"e":"h2","a":{"class":"center blue-text darken-3"},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["group"]}]}," ",{"t":7,"e":"h5","a":{"class":"center"},"f":["Tävla mot alla andra i en rankingserie."]}," ",{"t":7,"e":"p","a":{"class":"light"},"f":["Alla vartider under helgen kommer att sparas. Rankingen uppdateras efter varje tävling. Vem kommer att ligga i topp?"]}]}]}," ",{"t":7,"e":"div","a":{"class":"col s12 m4"},"f":[{"t":7,"e":"div","a":{"class":"icon-block"},"f":[{"t":7,"e":"h2","a":{"class":"center blue-text darken-3"},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["settings"]}]}," ",{"t":7,"e":"h5","a":{"class":"center"},"f":["Enkelt att programmera"]}," ",{"t":7,"e":"p","a":{"class":"light"},"f":["Hämta ut ditt USB med ditt ID och våra libraries till en Arduinio-miljö. Sen är det bara att hacka ihop den bästa mjukvaran som går att ladda ner i våra bilar."]}]}]}]}]}]}," ",{"t":7,"e":"div","a":{"class":"parallax-container valign-wrapper"},"f":[{"t":7,"e":"div","a":{"class":"section no-pad-bot"},"f":[{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"div","a":{"class":"row center"},"f":[{"t":7,"e":"h5","a":{"class":"header col s12 light blue-text"},"f":["Du styr den snabbaste bilen med din mjukvara!"]}]}]}]}," ",{"t":7,"e":"div","a":{"class":"parallax"},"f":[{"t":7,"e":"img","a":{"src":"static/uploads/background2.jpg","alt":"Unsplashed background img 2"}}]}]}," ",{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"div","a":{"class":"section"},"f":[{"t":7,"e":"div","a":{"class":"row"},"f":[{"t":7,"e":"div","a":{"class":"col s12 center"},"f":[{"t":7,"e":"h3","f":[{"t":7,"e":"i","a":{"class":"mdi-content-send blue-text darken-3"}}]}," ",{"t":7,"e":"h4","f":["Mer detaljerad beskrivning"]}," ",{"t":7,"e":"p","a":{"class":"left-align light"},"f":["Tänk dig en bilbana där gasen alltid står på max. Du reglerar bilens hastighet genom att skriva Arduino-kod till våra bilar. Styr motorns effekt baserat på vad dom sensorer som finns i bilen säger. Vem får den snabbaste varvtiden?"]}]}]}]}]}," ",{"t":7,"e":"div","a":{"class":"parallax-container valign-wrapper"},"f":[{"t":7,"e":"div","a":{"class":"section no-pad-bot"},"f":[{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"div","a":{"class":"row center"},"f":[{"t":7,"e":"h5","a":{"class":"header col s12 light blue-text"},"f":["Arduino baserade banbilar!"]}]}]}]}," ",{"t":7,"e":"div","a":{"class":"parallax"},"f":[{"t":7,"e":"img","a":{"src":"static/uploads/background3.jpg","alt":"Unsplashed background img 3"}}]}]}],"x":{"r":["posting"],"s":"_0===true"}},{"t":7,"e":"appfooter"}]}
},{}],18:[function(require,module,exports){
module.exports = {"v":3,"t":[{"t":7,"e":"header","f":[{"t":7,"e":"navigation"}]}," ",{"t":7,"e":"div","a":{"class":"hero"},"f":[{"t":7,"e":"h1","f":["Login"]}]}," ",{"t":7,"e":"div","a":{"class":"row"},"f":[{"t":7,"e":"form","a":{"class":"col s10","method":"post"},"f":[{"t":7,"e":"div","a":{"class":"row"},"f":[{"t":4,"f":[{"t":7,"e":"div","a":{"class":"error"},"f":[{"t":2,"r":"error"}]}],"n":50,"x":{"r":["error"],"s":"_0&&_0!=\"\""}}," ",{"t":4,"f":[{"t":7,"e":"div","a":{"class":"success"},"f":[{"t":3,"r":"success"}]}],"n":50,"x":{"r":["success"],"s":"_0&&_0!=\"\""}},{"t":4,"n":51,"f":[{"t":7,"e":"div","a":{"class":"s10"},"f":[{"t":7,"e":"div","a":{"class":"input-field"},"f":[{"t":7,"e":"input","a":{"type":"text","id":"email","value":[{"t":2,"r":"email"}]}}," ",{"t":7,"e":"label","a":{"for":"email","class":"active"},"f":["Email"]}]}," ",{"t":7,"e":"div","a":{"class":"input-field"},"f":[{"t":7,"e":"input","a":{"type":"password","id":"password","value":[{"t":2,"r":"password"}]}}," ",{"t":7,"e":"label","a":{"for":"password","class":"active"},"f":["Password"]}]}," ",{"t":7,"e":"div","a":{"class":"input-field"},"f":[" ",{"t":7,"e":"div","a":{"class":"row"}}," ",{"t":7,"e":"a","a":{"class":"waves-effect waves-light blue lighten-1 btn"},"v":{"click":"login"},"f":[{"t":7,"e":"i","a":{"class":"material-icons right"},"f":["send"]},"login"]}]}]}],"x":{"r":["success"],"s":"_0&&_0!=\"\""}}]}]}]}," ",{"t":7,"e":"appfooter"}]}
},{}],19:[function(require,module,exports){
module.exports = {"v":3,"t":[{"t":7,"e":"nav","a":{"class":"blue","role":"navigation"},"f":[{"t":7,"e":"div","a":{"class":"nav-wrapper container"},"f":[{"t":7,"e":"a","a":{"id":"logo-container","href":"#","class":"brand-logo"},"f":["ScAvalon"]}," ",{"t":7,"e":"ul","a":{"class":"right hide-on-med-and-down"},"f":[{"t":7,"e":"li","f":[{"t":7,"e":"a","v":{"click":{"n":"goto","a":"home"}},"f":["Home"]}]}," ",{"t":4,"f":[{"t":7,"e":"li","f":[{"t":7,"e":"a","v":{"click":{"n":"goto","a":"register"}},"f":["Register"]}]}," ",{"t":7,"e":"li","f":[{"t":7,"e":"a","v":{"click":{"n":"goto","a":"login"}},"f":["Login"]}]}],"n":50,"x":{"r":["isLogged"],"s":"!_0"}},{"t":4,"n":51,"f":[{"t":7,"e":"li","a":{"class":"right"},"f":[{"t":7,"e":"a","v":{"click":{"n":"goto","a":"logout"}},"f":["Logout"]}]}," ",{"t":7,"e":"li","a":{"class":"right"},"f":[{"t":7,"e":"a","v":{"click":{"n":"goto","a":"profile"}},"f":["Profile"]}]}],"x":{"r":["isLogged"],"s":"!_0"}}]}," ",{"t":7,"e":"ul","a":{"id":"nav-mobile","class":"side-nav"},"f":[{"t":7,"e":"li","f":[{"t":7,"e":"a","v":{"click":{"n":"goto","a":"home"}},"f":["Home"]}]}," ",{"t":4,"f":[{"t":7,"e":"li","f":[{"t":7,"e":"a","v":{"click":{"n":"goto","a":"register"}},"f":["Register"]}]}," ",{"t":7,"e":"li","f":[{"t":7,"e":"a","v":{"click":{"n":"goto","a":"login"}},"f":["Login"]}]}],"n":50,"x":{"r":["isLogged"],"s":"!_0"}},{"t":4,"n":51,"f":[{"t":7,"e":"li","f":[{"t":7,"e":"a","v":{"click":{"n":"goto","a":"profile"}},"f":["Profile"]}]}," ",{"t":7,"e":"li","f":[{"t":7,"e":"a","v":{"click":{"n":"goto","a":"logout"}},"f":["Logout"]}]}],"x":{"r":["isLogged"],"s":"!_0"}}]}," ",{"t":7,"e":"a","a":{"href":"#","data-activates":"nav-mobile","class":"button-collapse white-text"},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["menu"]}]}]}]}]}
},{}],20:[function(require,module,exports){
module.exports = {"v":3,"t":[{"t":7,"e":"header","f":[{"t":7,"e":"navigation"}]}," ",{"t":7,"e":"div","a":{"class":"hero"},"f":[{"t":7,"e":"h1","f":["Profile"]}]}," ",{"t":7,"e":"div","a":{"class":"row"},"f":[{"t":7,"e":"form","a":{"class":"col s10"},"f":[{"t":7,"e":"div","a":{"class":"row"},"f":[{"t":4,"f":[{"t":7,"e":"div","a":{"class":"error"},"f":[{"t":3,"r":"error"}]}],"n":50,"x":{"r":["error"],"s":"_0&&_0!=\"\""}}," ",{"t":4,"f":[{"t":7,"e":"div","a":{"class":"success"},"f":[{"t":3,"r":"success"}]}],"n":50,"x":{"r":["success"],"s":"_0&&_0!=\"\""}}," ",{"t":7,"e":"div","a":{"class":"s10"},"f":[{"t":7,"e":"div","a":{"class":"input-field"},"f":[{"t":7,"e":"input","a":{"type":"text","id":"first-name","value":[{"t":2,"r":"firstName"}]}}," ",{"t":7,"e":"label","a":{"for":"first-name","class":"active"},"f":["First name"]}]}," ",{"t":7,"e":"div","a":{"class":"input-field"},"f":[{"t":7,"e":"input","a":{"type":"text","id":"last-name","value":[{"t":2,"r":"lastName"}]}}," ",{"t":7,"e":"label","a":{"for":"last-name","class":"active"},"f":["Last name"]}]}," ",{"t":7,"e":"div","a":{"class":"input-field"},"f":[{"t":7,"e":"input","a":{"type":"password","id":"password","value":[{"t":2,"r":"password"}]}}," ",{"t":7,"e":"label","a":{"for":"password"},"f":["Change password"]}]}," ",{"t":7,"e":"div","f":[" ",{"t":7,"e":"a","a":{"class":"waves-effect waves-light blue lighten-1 btn"},"v":{"click":"updateProfile"},"f":[{"t":7,"e":"i","a":{"class":"material-icons right"},"f":["send"]},"update"]}," ",{"t":7,"e":"a","a":{"class":"waves-effect waves-light blue lighten-1 btn","style":"float: right;"},"v":{"click":"deleteProfile"},"f":[{"t":7,"e":"i","a":{"class":"material-icons right"},"f":["delete"]},"delete"]}," "]}]}]}]}]}," ",{"t":7,"e":"appfooter"}]}
},{}],21:[function(require,module,exports){
module.exports = {"v":3,"t":[{"t":7,"e":"header","f":[{"t":7,"e":"navigation"}]}," ",{"t":4,"f":[" ",{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"h1","f":["Race"]}," ",{"t":7,"e":"p","f":["Lane 1 ",{"t":2,"r":"firstLane"}]}," ",{"t":7,"e":"p","f":["Lane 2 ",{"t":2,"r":"secondLane"}]}]}],"n":50,"r":"raceId"},{"t":4,"n":51,"f":[" ",{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"form","a":{"method":"post"},"f":[{"t":7,"e":"h3","f":["Add a new race"]}," ",{"t":4,"f":[{"t":7,"e":"div","a":{"class":"error"},"f":[{"t":2,"r":"error"}]}],"n":50,"x":{"r":["error"],"s":"_0&&_0!=\"\""}}," ",{"t":4,"f":[{"t":7,"e":"div","a":{"class":"success"},"f":[{"t":3,"r":"success"}]}],"n":50,"x":{"r":["success"],"s":"_0&&_0!=\"\""}},{"t":4,"n":51,"f":[{"t":7,"e":"div","a":{"class":"s10"},"f":[{"t":7,"e":"div","a":{"class":"input-field"},"f":[{"t":7,"e":"input","a":{"id":"firstlane","type":"text","value":[{"t":2,"r":"firstLane"}]}}," ",{"t":7,"e":"label","a":{"for":"firstlane"},"f":["Bil Id, Bana 1"]}]}," ",{"t":7,"e":"div","a":{"class":"input-field"},"f":[{"t":7,"e":"input","a":{"type":"text","id":"secondlane","value":[{"t":2,"r":"secondLane"}]}}," ",{"t":7,"e":"label","a":{"for":"secondlane"},"f":["Bil Id, Bana 2"]}]}," ",{"t":7,"e":"div","a":{"class":"row"}}," ",{"t":7,"e":"a","a":{"class":"waves-effect waves-light blue lighten-1 btn"},"v":{"click":"create"},"f":[{"t":7,"e":"i","a":{"class":"material-icons right"},"f":["send"]},"setup"]}," ",{"t":7,"e":"a","a":{"class":"waves-effect waves-light blue lighten-1 btn","style":"float: right;"},"v":{"click":"readLanes"},"f":[{"t":7,"e":"i","a":{"class":"material-icons right"},"f":["input"]},"Läs av banan"]}," ",{"t":7,"e":"div","a":{"class":"row"}}]}],"x":{"r":["success"],"s":"_0&&_0!=\"\""}}]}]}],"r":"raceId"},{"t":7,"e":"appfooter"}]}
},{}],22:[function(require,module,exports){
module.exports = {"v":3,"t":[{"t":7,"e":"header","f":[{"t":7,"e":"navigation"}]}," ",{"t":7,"e":"div","a":{"class":"hero"},"f":[{"t":7,"e":"h1","f":["Register"]}]}," ",{"t":7,"e":"div","a":{"class":"row"},"f":[{"t":7,"e":"form","a":{"class":"col s10"},"f":[{"t":7,"e":"div","a":{"class":"row"},"f":[{"t":4,"f":[{"t":7,"e":"div","a":{"class":"error"},"f":[{"t":2,"r":"error"}]}],"n":50,"x":{"r":["error"],"s":"_0&&_0!=\"\""}}," ",{"t":4,"f":[{"t":7,"e":"div","a":{"class":"success"},"f":[{"t":3,"r":"success"}]}],"n":50,"x":{"r":["success"],"s":"_0&&_0!=\"\""}},{"t":4,"n":51,"f":[{"t":7,"e":"div","a":{"class":"s10"},"f":[{"t":7,"e":"div","a":{"class":"input-field"},"f":[{"t":7,"e":"input","a":{"id":"first-name","type":"text","value":[{"t":2,"r":"firstName"}]}}," ",{"t":7,"e":"label","a":{"for":"first-name"},"f":["First name"]}]}," ",{"t":7,"e":"div","a":{"class":"input-field"},"f":[{"t":7,"e":"input","a":{"type":"text","id":"last-name","value":[{"t":2,"r":"lastName"}]}}," ",{"t":7,"e":"label","a":{"for":"last-name"},"f":["Last name"]}]}," ",{"t":7,"e":"div","a":{"class":"input-field"},"f":[{"t":7,"e":"input","a":{"type":"text","id":"email","value":[{"t":2,"r":"email"}],"class":"validate"}}," ",{"t":7,"e":"label","a":{"for":"email"},"f":["Email"]}]}," ",{"t":7,"e":"div","a":{"class":"input-field"},"f":[{"t":7,"e":"input","a":{"type":"password","id":"password","value":[{"t":2,"r":"password"}]}}," ",{"t":7,"e":"label","a":{"for":"password"},"f":["Password"]}]}," ",{"t":7,"e":"div","a":{"class":"row"}}," ",{"t":7,"e":"a","a":{"class":"waves-effect waves-light blue lighten-1 btn"},"v":{"click":"register"},"f":[{"t":7,"e":"i","a":{"class":"material-icons right"},"f":["send"]},"register"]}," "]}],"x":{"r":["success"],"s":"_0&&_0!=\"\""}}]}]}]}," ",{"t":7,"e":"appfooter"}]}
},{}]},{},[6])