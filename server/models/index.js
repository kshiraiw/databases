var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
            // mysql.connect();
      db.query('SELECT messages.id, users.username, messages.text, messages.roomname \
                FROM messages, users \
                WHERE messages.user_id = users.id \
                ORDER BY messages.id', 
      function (err, results) {
        if (err) {
          throw err;
        }
        // console.log("RESULTS FROM QUERY: ", results);
        callback(results);
      });
    }, // a function which produces all the messages
    post: function (data, callback) {
      db.query('SELECT id FROM users WHERE username=?',[data.username], function(err, results) {
        if (err) {
          throw err;
        }
        var roomname = data.roomname || 'lobby';

        if (results.length === 0) {
          // no username found
          module.exports.users.post({ username: data.username }, function(id) {
            db.query('INSERT INTO messages SET ?', {user_id: id, text: data.text, roomname: roomname}, function(err, postRes) {
              callback(postRes.insertId);
            });
          });
        } else {
          db.query('INSERT INTO messages SET ?', {user_id: results[0].id, text: data.text, roomname: roomname}, function(err, postRes) {
              callback(postRes.insertId);
          });
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT * FROM users', function (err, results) {
        if (err) {
          throw err;
        }
        // console.log("RESULTS FROM QUERY: ", results);
        callback(results);
      });
    },
    post: function (data, callback) {
      db.query('INSERT INTO users SET ?', data, function(err, result) {
        callback(result.insertId);
      });
    }
  }
};