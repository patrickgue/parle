var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var file = "parle.db";
var exists = fs.existsSync(file);
var db = new sqlite3.Database(file);

db.serialize(function(){
  if(!exists) {

    /* tables */
    db.run("CREATE TABLE TPAR_USER ("
              + "userId INTEGER PRIMARY KEY AUTOINCREMENT, "
              + "userName STRING, "
              + "userPassword STRING,"
              + "userStatus STRING "
            + ")");

    db.run("CREATE TABLE TPAR_CHAT ("
              + "chatId INTEGER PRIMARY KEY AUTOINCREMENT, "
              + "chatName STRING"
            + ")");

    db.run("CREATE TABLE TPAR_CHATUSER ("
              + "chatUserId INTEGER PRIMARY KEY AUTOINCREMENT,"
              + "userId INTEGER,"
              + "chatId INTEGER"
            + ")");

    db.run("CREATE TABLE TPAR_MESSAGE ("
              + "messageId INTEGER PRIMARY KEY AUTOINCREMENT,"
              + "chatUserId INTEGER, "
              + "message STRING "
            + ")")


    db.run("CREATE VIEW VPAR_CHATS AS "
          + "SELECT ch.userId, u.userName, u.userStatus, c.chatName "
          + "FROM TPAR_CHATUSER as ch "
          + "JOIN TPAR_USER u ON u.userId = ch.userId "
          + "JOIN TPAR_CHAT c ON c.chatId = ch.chatId");

    db.run("CREATE VIEW VPAR_SIMPLEUSER AS "
          + "SELECT userId, userName, userStatus "
          + "FROM TPAR_USER");
    //db.run("INSERT INTO TPAR_USER (userName) VALUES('pat')");

    /* testdata */
    run("INSERT INTO TPAR_USER (userId, userName, userPassword, userStatus) VALUES(1,\"Alice\",\"6367c48dd193d56ea7b0baad25b19455e529f5ee\",\"Status of Alice\")"); //pw abc123
    db.run("INSERT INTO TPAR_USER (userId, userName, userPassword, userStatus) VALUES(2,\"Bob\",\"6367c48dd193d56ea7b0baad25b19455e529f5ee\",\"Status of Bob\")");
    db.run("INSERT INTO TPAR_CHAT (chatId, chatName) VALUES(1, \"DefaultChat\")");
    db.run("INSERT INTO TPAR_CHATUSER (chatUserId, userId, chatId) VALUES(1,1,1)");
    db.run("INSERT INTO TPAR_CHATUSER (chatUserId, userId, chatId) VALUES(2,2,1)");
  }
});


function select(query, done) {
  var rows = [];
  db.each(query, function(err,row) {
    rows.push(row);
  }, function() {
    if(done !== undefined) {
      done(rows);
    }
  });
}

function run(query, argsarray, done) {
  var stmt = db.prepare(query);
  stmt.run(argsarray);
  stmt.finalize();
  select("SELECT last_insert_rowid();", function(d) {
    if(done !== undefined){
      done(d[0]["last_insert_rowid()"]);
    }
  });

}

module.exports = {
  select : select,
  run : run
}
