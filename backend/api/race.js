var ObjectId = require('mongodb').ObjectID;
var helpers = require('./helpers');
var response = helpers.response;
var fs = require('fs');
var error = helpers.error;
var getDatabaseConnection = helpers.getDatabaseConnection;
var getCurrentUser = helpers.getCurrentUser;
var getNextCounter = helpers.getNextCounter;
var getActiveRace  = helpers.getActiveRace;
var setActiveRace  = helpers.setActiveRace;
var getActiveRaceTitle = helpers.getActiveRaceTitle;
var processPOSTRequest = helpers.processPOSTRequest;

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
      var raceId;
      var raceTitle;
      getActiveRaceTitle( function(title){
        raceTitle = title;
        getDatabaseConnection(function(db) {
          var query = params && params.id ? { _id: ObjectId(params.id) } : {};
        
          getActiveRace( function(id){
            raceId = id;
          });
        
          var collection = db.collection('races');
          collection.find({ 
            $query: query,
            $orderby: {
              date: -1
            }
          }).toArray(function(err, result) {
            response({
              races: result,
              activeRace: raceId,
              activeRaceTitle: raceTitle
            }, res);
          });
        });
      });
      

    break;
    case 'POST':
      var uploadDir = __dirname + '/../../static/uploads/';
      var formidable = require('formidable');
      var form = new formidable.IncomingForm();
      form.multiples = true;
      form.parse(req, function(err, formData, files) {
        var data = {
          descr: formData.descr,
          notation: formData.notation,
          title: formData.title
        };
        if(!data.title || data.title === '') {
          error('Please add Title.', res);
        } else {
          var processFiles = function(userId, cb) {
            if(files.files) {
              var fileName = files.files.name;
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
          };
          
          getDatabaseConnection(function(db) {
            getCurrentUser(function(user) {
              getNextCounter( function(newId) {
                var collection = db.collection('races');
                data._id = newId;
                data.userId = user._id.toString();
                data.date = new Date();
                processFiles(user._id, function(file) {
                  if(file) {
                    data.file = file;
                  }
                  collection.insert(data, done);
                });
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
    
  case 'PUT':
    processPOSTRequest(req, function(data) {
      if(!data.activeRace || data.activeRace === '') {
        error('Please the id of the race to activate.', res);
      } else {
        data.activeRace = parseInt(data.activeRace, 10);
        getDatabaseConnection(function(db) {
          var collection = db.collection('counters');
          collection.update(
              { _id:"active" },
              { $set: {"seq":data.activeRace} }, 
              function(err, result) {
                if(err) {
                  err('Error updating the data.');
                } else {
                  response({
                    success: 'OK'
                  }, res);
                }
              }
            );
          });
        }
      });
  }
};