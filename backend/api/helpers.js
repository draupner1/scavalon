var response = function(result, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(result) + '\n');
};
var error = function(message, res) {
  res.writeHead(500, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({error: message}) + '\n');
};

var MongoClient = require('mongodb').MongoClient;
var database;
var getDatabaseConnection = function(callback) {
  if(database) {
    callback(database);
    return;
  } else {
    MongoClient.connect('mongodb://127.0.0.1:27017/scavalon-db', function(err, db) {
      if(err) {
        throw err;
      };
      database = db;
      callback(database);
    });
  }
};

var querystring = require('querystring');
var processPOSTRequest = function(req, callback) {
  var body = '';
  req.on('data', function (data) {
    body += data.toString();
  });
  req.on('end', function () {
    callback(querystring.parse(body));
  });
};
var processPOSTRequest2 = function(req, callback) {
  var body = '';
  req.on('data', function (data) {
    body += data.toString();
  });
  req.on('end', function () {
    callback(body);
  });
};
var validEmail = function(value) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
};
var getCurrentUser = function(callback, req, res) {
  getDatabaseConnection(function(db) {
    var collection = db.collection('users');
    collection.find({ 
      email: req.session.user.email
    }).toArray(function(err, result) {
      if(result.length === 0) {
        error('No such user', res);
      } else {
        callback(result[0]);
      }
    });
  });
};

var getNextCounter = function(callback) {
  getDatabaseConnection(function(db){
    var count = db.collection('counters');
    var oldId = count.find( { _id: 'race'} ).toArray(function(err, result) {
      if(result.length === 0) {
        error('No such counter', res);
      } else {
        var newId = result[0].seq + 1;
        count.update({_id:"race"}, {$inc: {seq:1}}, {upsert: true});
        callback(newId);
      }
    });
  });
};

var getActiveRace = function(callback) {
  getDatabaseConnection(function(db){
    var count = db.collection('counters');
    var oldId = count.find( { _id: "active"} ).toArray(function(err, result) {
      if(result.length === 0) {
        error('No such race', result);
      } else {
        callback(result[0].seq);
      }
    });
  });
};

var setActiveRace = function(actId) {
  getDatabaseConnection(function(db){
    var count = db.collection('counters');
    count.update({_id:"active"}, {$set: {seq:actId}}, {upsert: true});
  });
};

var getActiveRaceTitle = function(callback){
  getActiveRace( function(id){
    getDatabaseConnection(function(db){
      var races = db.collection('races');
      races.find({_id:id}).toArray(function (err,result){
        if(result.length === 0){
          console.log('No Title found on Active race');
          callback("");
        } else {
          callback(result[0].title);
        }
      });
    });
  });
};

module.exports = {
  response: response,
  error: error,
  getDatabaseConnection: getDatabaseConnection,
  processPOSTRequest: processPOSTRequest,
  processPOSTRequest2: processPOSTRequest2,
  validEmail: validEmail,
  getCurrentUser: getCurrentUser,
  getNextCounter: getNextCounter,
  getActiveRace: getActiveRace,
  setActiveRace: setActiveRace,
  getActiveRaceTitle: getActiveRaceTitle
};