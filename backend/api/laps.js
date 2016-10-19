// var sha1 = require('sha1');
var helpers = require('./helpers');
var response = helpers.response;
var processPOSTRequest = helpers.processPOSTRequest;
var getActiveRace = helpers.getActiveRace;
// var validEmail = helpers.validEmail;
var getDatabaseConnection = helpers.getDatabaseConnection;
var error = helpers.error;

module.exports = function(req, res) {
  if(req.method != 'POST') {
    error('Only POST supported.', res);
  } else {
    var formidable = require('formidable');
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, formData, files) {
      getActiveRace(function(aid){
        var data = {
          lane: formData.lane,
          time: formData.timestamp,
          laptime: formData.laptime,
          car: formData.carID,
          pv: formData.protocolVersion,
          pid: formData.programmerID,
          swv: formData.controlProgramRevision,
          mxvel: formData.maxSpeed,
          mxacc: formData.maxAccel,
          mxdec: formData.maxDecel,
          mxlat: formData.maxLateral,
          mxtur: formData.maxTurn,
          itime: formData.inttime,
          race : aid
        };

        getDatabaseConnection(function(db) {
          var collection = db.collection('laps');
          collection.insert(data, function(err, docs) {
            response({
              success: 'OK'
            }, res);
          });
        });
      });
    });
  }
};