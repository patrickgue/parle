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

"use strict";
const express = require('express');
const database = require("./parle/dbService.js");
const app = express();
const sha1 = require('sha1');
const bodyParser = require('body-parser')

var TESTRUN = false

process.argv.forEach((val, index) => {
  if(val === "test") {
    TESTRUN = true;
  }
  console.log(`${index}: ${val}`);
});

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



/**
 * User Services
 */

app.get("/parle/users/all", function(req, res) {
  database.select("SELECT * FROM TPAR_USER", function(data){
    res.end(JSON.stringify(data));
  });
});

app.get("/parle/users/user/:userId/", function(req, res) {
  let userId = req.params.userId;
  database.select("SELECT * FROM VPAR_SIMPLEUSER WHERE userId = " + userId, function(data) {
    if(data.length === 0) {
      res.end(JSON.stringify({}));
    } else {
      res.end(JSON.stringify(data[0]));
    }
  });
});

app.post("/parle/users/status/",function(req, res) {
  let userId = req.body.userId;
  let userStatus = req.body.userStatus;
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
        res.status(401);
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

app.post("/parle/users/search", function(req, res) {
  database.select("SELECT * FROM VPAR_SIMPLEUSER WHERE userName LIKE '%"+req.body.searchUserName+"%'", function(data) {
    res.end(JSON.stringify(data));
  });
});


/**
 * Chat Service
 */


app.get("/parle/chats/list/:userId/", function(req, res) {
  database.select("SELECT * FROM VPAR_CHATS WHERE userId = " + req.params.userId, function(data) {
    res.end(JSON.stringify(data));
  });
});


app.post("/parle/chats/new", function(req, res) {
  let chatname = req.body.chatName;
  let userId = req.body.userId;

  database.run("INSERT INTO TPAR_CHAT (chatName) VALUES(?)",[chatname], function(chatId) {
    database.run("INSERT INTO TPAR_CHATUSER (userId, chatId) VALUES (?,?)",[userId, chatId], function() {
      res.end(JSON.stringify({
        "chatName" : chatname,
        "userId" : userId,
        "chatId" : chatId
      }));
    });
  });
});

app.post("/parle/chats/adduser", function(req, res) {
  let chatId = req.body.chatId;
  let userId = req.body.userId;

  database.run("INSERT INTO TPAR_CHATUSER (userId, chatId) VALUES (?,?)",[userId, chatId], function() {
    res.end(JSON.stringify({
      "userId" : userId,
      "chatId" : chatId
    }));
  });
});


app.get("/parle/chats/messages/:chatId/:nrMessages/", function(req, res) {
    let chatId = req.params.chatId;
    let nrOfMessages = req.params.nrMessages;

    database.select("SELECT * FROM VPAR_CHATMESSAGES WHERE chatId = "+chatId + " LIMIT " + nrOfMessages, function(data) {
	     console.log(data);
	      res.end(JSON.stringify(data));
    });
});

if(!TESTRUN) {
  var server = app.listen(9080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host, port);
  });
}
