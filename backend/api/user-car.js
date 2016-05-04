var sha1 = require('sha1');
var helpers = require('./helpers');
var response = helpers.response;
var error = helpers.error;
var getDatabaseConnection = helpers.getDatabaseConnection;
var processPOSTRequest = helpers.processPOSTRequest;

module.exports = function(req, res) {
      processPOSTRequest(req, function(data) {
        if(!data.car || data.car === '') {
          error('Please provide the car tag.', res);
        } else {
          var done = function() {
            response({
              success: 'OK'
            }, res);
          }
          getDatabaseConnection(function(db) {
            var collection = db.collection("cars");
            data.usermail = req.session.user.email;
            collection.find({car: data.car}).toArray( function(err, acar){
              if (acar.length != 0) {
                collection.update(
                 { car: data.car },
                 { $set: data }, 
                 function(err, result) {
                   if(err) {
                     err('Error updating the car data.');
                   } else {
                     response({ success: 'OK' }, res);
            //         console.log("Car existed/n");
                   }
                 }
                );
              } else {
                var ptr =collection.insert( data, done );
            //    console.log("Car NOT existed "+ data + "/n");
              }
              
            });
          });
        }
      });
}