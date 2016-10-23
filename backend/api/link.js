// var sha1 = require('sha1');
var helpers = require('./helpers');
var response = helpers.response;
var processPOSTRequest = helpers.processPOSTRequest2;
var getActiveRace = helpers.getActiveRace;
// var validEmail = helpers.validEmail;
var getDatabaseConnection = helpers.getDatabaseConnection;
var error = helpers.error;

module.exports = function(req, res) {
  
  switch(req.method) {
    case 'GET':

      getDatabaseConnection(function(db) {
        var collection = db.collection('tele');
        collection.find().toArray(function(err, result) {
          response({
            hook: result
          }, res);
        });
      });
      
    break;
//    case 'PUT':
//      
//      processPOSTRequest(req, function(data) {
//        if(!data.firstName || data.firstName === '') {
//          error('Please fill your first name.', res);
//        } else if(!data.lastName || data.lastName === '') {
//          error('Please fill your last name.', res);
//        } else {
//          getDatabaseConnection(function(db) {
//            var collection = db.collection('users');
//            if(data.password) {
//              data.password = sha1(data.password);
//            }
//            collection.update(
//              { email: req.session.user.email },
//              { $set: data }, 
//              function(err, result) {
//                if(err) {
//                  err('Error updating the data.');
//                } else {
//                  if(data.password) delete data.password;
//                  for(var key in data) {
//                    req.session.user[key] = data[key];
//                  }
//                  response({
//                    success: 'OK'
//                  }, res);
//                }
//              }
//            );
//          });
//        }
//      });
      
//    break;
    case 'POST':
      processPOSTRequest(req, function(data) {
        mdata=JSON.parse(data);
        if(!mdata.ip || mdata.ip === '') {
          error('Please fill the IP.', res);
        } else if(!mdata.url || mdata.url === '') {
          error('Please fill the URL.', res);
        } else {
          getDatabaseConnection(function(db) {
            var collection = db.collection('tele');
            collection.insert(mdata, function(err, docs) {
              response({
                success: 'OK'
              }, res);
            });
          });
        }
      });

      
    break;
    case 'DELETE':
      
      getDatabaseConnection(function(db) {
        var collection = db.collection('tele');
        collection.insert( {} , function(err, docs) {
            response({
              success: 'OK'
            }, res);
          }
        );
      });
      
    break;
  };
  
//  if(req.method != 'POST') {
//    error('Only POST supported.', res);
//  } else {
//    var formidable = require('formidable');
//    var form = new formidable.IncomingForm();
//    form.parse(req, function(err, formData, files) {
//      getActiveRace(function(aid){
//        var data = {
//          lane: formData.lane,
//          time: formData.timestamp,
//          laptime: formData.laptime,
//          car: formData.carID,
//        };

//        getDatabaseConnection(function(db) {
//          var collection = db.collection('laps');
//          collection.insert(data, function(err, docs) {
//            response({
//              success: 'OK'
//            }, res);
//          });
//        });
//      });
//    });
//  }
};