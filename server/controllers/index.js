var models = require('../models');
var bluebird = require('bluebird');
var utils = require('../utils');


module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(results) {
        utils.sendResponse(res, {results: results}, 200);
      });
      // mysql.end()
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      utils.collectData(req, function(data) {
        models.messages.post(data, function(id) {
          utils.sendResponse(res, {objectId: id}, 201);
        });
      });
    }, // a function which handles posting a message to the database

    options: function (req, res) {
      utils.sendResponse(res);
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(results) {
        utils.sendResponse(res, {results: results}, 200);
      });
        
    },
    post: function (req, res) {
      // insert into users table
      // mysql.query('...', function(err, results) {});
      utils.collectData(req, function(data) {
        models.users.post(data, function(id) {
          utils.sendResponse(res, {objectId: id}, 201)
        });
      });

    }, 

    options: function (req, res) {
      utils.sendResponse(res);
    }
  }
};

