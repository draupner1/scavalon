var ObjectId = require('mongodb').ObjectID;
var helpers = require('./helpers');
var fs = require('fs');
var response = helpers.response;
var error = helpers.error;
var getDatabaseConnection = helpers.getDatabaseConnection;
var processPOSTRequest = helpers.processPOSTRequest;
var getCurrentUser = helpers.getCurrentUser;

module.exports = function(req, res) {
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
        if(!user.friends) {
          user.friends = [];
        }
        getDatabaseConnection(function(db) {
          var collection = db.collection('laps');
          
          var ucol = db.collection('users');
          var latest = [];
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
          
          collection.find({}).sort({laptime:1}).limit(20).toArray(function(err, result) {
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
                    latest: latest
                  }, res);
                }
              });
            });
              
          });
        });
      }, req, res);
    break;
    case 'POST':
      var uploadDir = __dirname + '/../../static/uploads/';
      var formidable = require('formidable');
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
        if(formData.taggedFriends) {
          data.taggedFriends = JSON.parse(formData.taggedFriends);
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