var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'users'
});

// our backend endpoint to check for users in the database
router.post('/', function(req,res,next) {
  var username = req.body.username;
  var password = req.body.password;
  connection.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], function(err,row,fields){
    if(err) console.log(err);
    if (row.length) {
      res.send({'success': true, 'message': row[0].username});
    } else {
      res.send({'success': false, 'message': 'User not found,please try again'});
    }
  });

});

module.exports = router;
