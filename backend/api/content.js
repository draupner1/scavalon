var ObjectId = require('mongodb').ObjectID;
var helpers = require('./helpers');
var queryString = require('querystring');
var fs = require('fs');
var formidable = require('formidable');
var response = helpers.response;
var error = helpers.error;
var getDatabaseConnection = helpers.getDatabaseConnection;
var processPOSTRequest = helpers.processPOSTRequest;
var getCurrentUser = helpers.getCurrentUser;
var getActiveRaceTitle = helpers.getActiveRaceTitle;

module.exports = function(req, res, params) {
  var user;
  if(req.session && req.session.user) {
    user = req.session.user;
  } else {
    error('You must be logged in in order to use this method.', res);
    return;
  }
  switch(req.method) {
    case 'GET':

        
        getCurrentUser(function(user) {
          getActiveRaceTitle(function(actTitle) {

          getDatabaseConnection(function(db) {
            var MAX_PER_PAGE = 15;
            var pages = 1;
            var collection = db.collection('laps');
            var ucol = db.collection('users');
            var latest = [];
            var paginateit = 0;
            var pno = params && params.id ? parseInt(params.id, 10) : 1 ;  /// Ska vara nummer inte String!!!
            var queryParams = 0;
            var viewRace = 1;
            if (req.url.indexOf('?') >= 0) {
              queryParams = queryString.parse(req.url.replace(/^.*\?/, ''));
              viewRace = parseInt(queryParams.race, 10);
            }
  ///          var viewRace = params && params.class.
          
            collection.count({"race":viewRace}, function(err, numOfDocs){
              if(numOfDocs > MAX_PER_PAGE)
              { paginateit = 1;}
              else
              { paginateit = 0;}
              pages = Math.floor(numOfDocs/MAX_PER_PAGE) + 1;
            });
          
            collection.find({}).sort({time:-1}).limit(4).toArray(function(err, result) {
              result.forEach(function(value, index, arr) {
                delete arr[index]._id;
                ucol.find({email: arr[index].pid}).toArray(function(err, result) {
                  if(result.length > 0) {
                    arr[index].userName = result[0].firstName + ' ' + result[0].lastName;
                  } else {
                    arr[index].userName = '';
                  }
                  delete arr[index].pid;
                });
              });
              latest = result;
            });

            collection.find({"race":viewRace}).sort({laptime:1}).skip(MAX_PER_PAGE*(pno-1)).limit(MAX_PER_PAGE).toArray(function(err, result) {
              if(result.length>0){
                result.forEach(function(value, index, arr) {
                  delete arr[index]._id;
                  ucol.find({email: arr[index].pid}).toArray(function(err, result) {
                    if(result.length > 0) {
                      arr[index].userName = result[0].firstName + ' ' + result[0].lastName;
                    } else {
                      arr[index].userName = '';
                    }
                    delete arr[index].pid;
                    if(index + 1 >= arr.length) {
                      response({
                        posts: arr,
                        pagit : paginateit,
                        frank : 1 + MAX_PER_PAGE*(pno - 1),
                        pno  : pno,
                        pages: pages,
                        latest: latest,
                        activeRaceTitle: actTitle
                      }, res);
                    }
                  });
                });
              } else {
                paginateit = 0;
                pno = 1
                pages = 1
                response({
                  posts: [],
                  pagit : paginateit,
                  frank : 1 + MAX_PER_PAGE*(pno - 1),
                  pno  : pno,
                  pages: pages,
                  latest: latest,
                  activeRaceTitle: actTitle
                }, res);
              }
            });
          });
          });
       }, req, res);
    
    break;
    case 'POST':
      var uploadDir = __dirname + '/../../static/uploads/';
      var form = new formidable.IncomingForm();
      form.multiples = true;
      form.parse(req, function(err, formData, files) {
        var data = {
          text: formData.text
        };
        if(formData.pageId) {
          data.pageId = formData.pageId;
        }
        if(formData.eventDate) {
          data.eventDate = formData.eventDate;
        }
        if(!data.text || data.text === '') {
          error('Please add some text.', res);
        } else {
          var processFiles = function(userId, cb) {
            if(files.files) {
              var fileName = userId + '_' + files.files.name;
              var filePath = uploadDir + fileName;
              fs.rename(files.files.path, filePath, function() {
                cb(fileName);
              });
            } else {
              cb();
            }
          };
          var done = function() {
            response({
              success: 'OK'
            }, res);
          }
          getDatabaseConnection(function(db) {
            getCurrentUser(function(user) {
              var collection = db.collection('content');
              data.userId = user._id.toString();
              data.userName = user.firstName + ' ' + user.lastName;
              data.date = new Date();
              processFiles(user._id, function(file) {
                if(file) {
                  data.file = file;
                }
                collection.insert(data, done);
              });
            }, req, res);
          });
        }
      });
      form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log('Downloading file: ' + percent_complete.toFixed(2));
      });
 
      form.on('error', function(err) {
        console.error(err);
      });
    break;
  };
}