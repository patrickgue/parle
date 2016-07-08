/**
 * parlé backend
 *
 * This is the backend of the parlé backend application.
 * This application handles the rest calls, database
 * persistance and of course parts of the logic of
 * the application.
 *
 * (c) 2016 by Patrick Günthard
 * This applcation is licensed under the GNU General Public
 * License version 3 or higher.
 */


var express = require('express');
var database = require("./parle/dbService.js");
var app = express();
var sha1 = require('sha1');
var bodyParser = require('body-parser')

function error(str) {
  return {
    errorMessage : str
  }
}

app.use(function(req, res, next) {
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/parle/users/all", function(req, res) {
  database.select("SELECT * FROM TPAR_USER", function(data){
    res.end(JSON.stringify(data));
  });
});

app.get("/parle/users/user/:userId/", function(req, res) {
  var userId = req.params.userId;
  database.select("SELECT * FROM VPAR_SIMPLEUSER WHERE userId = " + userId, function(data) {
    if(data.length === 0) {
      res.end(JSON.stringify({}));
    } else {
      res.end(JSON.stringify(data[0]));
    }
  });
});

app.post("/parle/users/status/",function(req, res) {
  var userId = req.body.userId;
  var userStatus = req.body.userStatus;
  database.run("UPDATE TPAR_USER SET userStatus = '"+userStatus+"' WHERE userId = " + userId, function() {
    res.end(JSON.stringify(req.body));
  });
});

app.post("/parle/users/login", function(req, res) {
  database.select("SELECT * FROM TPAR_USER WHERE userName = '"+req.body.userName+"'", function(data){
    if(data.length === 0) {
      res.end(JSON.stringify(new error("user not found")));
    } else {
      var user = data[0];
      console.log(sha1(req.body.userPassword), user.userPassword)
      if(sha1(req.body.userPassword) === user.userPassword) {
        res.end(JSON.stringify({userId : user.userId}));
      } else {
        res.end(JSON.stringify(new error("wrong password")));
      }
    }
  });
});

app.post("/parle/users/signup", function(req, res) {
  var user = req.body.userName;
  var password = sha1(req.body.userPassword);
  database.run("INSERT INTO TPAR_USER (userName, userPassword) VALUES (?,?)", [user, password] , function(data) {
    console.log(data);
    res.end(JSON.stringify({userId : data}));
  });
});

app.post("/parle/users/delete", function(req, res) {
  var userId = req.body.userId;
  database.select("SELECT * FROM TPAR_USER WHERE userId = " + userId, function(data) {
    if(data.length > 0) {
      database.run("DELETE FROM TPAR_USER WHERE userId = (?)", [userId], function(data) {
        res.end(JSON.stringify({message: "delete account successful"}));
      });
    } else {
      res.status(500).send({error:"user not found"});
      res.end();
    }

  });

});

app.get("/parle/chats/:userId/", function(req, res) {
  console.log("SELECT * FROM VPAR_CHATS WHERE userId = " + req.params.userId);
  database.select("SELECT * FROM VPAR_CHATS WHERE userId = " + req.params.userId, function(data) {
    res.end(JSON.stringify(data));
  });
});

app.post("/parle/users/search", function(req, res) {
  database.select("SELECT * FROM VPAR_SIMPLEUSER WHERE userName LIKE '%"+req.body.searchUserName+"%'", function(data) {
    res.end(JSON.stringify(data));
  });
});

var server = app.listen(9080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log(host, port);
});
