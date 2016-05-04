var ObjectId = require('mongodb').ObjectID;
var helpers = require('./helpers');
var response = helpers.response;
var error = helpers.error;
var getDatabaseConnection = helpers.getDatabaseConnection;
var getCurrentUser = helpers.getCurrentUser;

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
      getDatabaseConnection(function(db) {
        var query = params && params.id ? { _id: ObjectId(params.id) } : {};
        var collection = db.collection('races');
        var getRaceItems = function(raceId, callback) {
          var collection = db.collection('content');
          collection.find({ 
            $query: {
              raceId: raceId
            },
            $orderby: {
              date: -1 // Should be by time
            }
          }).toArray(function(err, result) {
            var comments = [];
            var events = [];
            result.forEach(function(value, index, arr) {
              //delete value.userId;
              //delete value._id;
            });
            callback(comments, events);
          });
        }
        collection.find({ 
          $query: query,
          $orderby: {
            date: -1
          }
        }).toArray(function(err, result) {
          if(params.id && result.length > 0) {
            getRaceItems(params.id, function(comments, events) {
              result[0].comments = comments;
              result[0].events = events;
              response({
                races: result
              }, res);
            });
          } else {
            response({
              races: result
            }, res);
          }
        });
      });
    break;
    case 'POST':
      var formidable = require('formidable');
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, formData, files) {
        var data = {
          firstlane: formData.firstlane,
          secondlane: formData.secondlane
        };
        if(!data.firstlane || data.firstlane === '') {
          error('Please add first lane car.', res);
        } else if(!data.secondlane || data.secondlane === '') {
          error('Please add second lane car.', res);
        } else {
          var done = function() {
            response({
              success: 'OK'
            }, res);
          }
          getDatabaseConnection(function(db) {
            getCurrentUser(function(user) {
              var collection = db.collection('races');
              var cars = db.collection('cars');
              data.userId = user._id.toString();
              //data.userName = user.firstName + ' ' + user.lastName; -- remove
              data.date = new Date();
              // data.laneoneuser = ??? id of user1
              // data.lanetwouser = ??? id of user2
              collection.insert(data, done);
            }, req, res);
          });
        }
      });
    break;
  };
}