angular.module("parleApp").factory("ChatService", function(LocalStorageService, ServiceHelper, HttpService, ParleConstants) {

  function loadChats(callback, error) {
    let userId = LocalStorageService.load("login").userId;
    HttpService.get(ParleConstants.baseUrl + "chats/list/"+userId+"/",
      function(data) {
        ServiceHelper.processCallback(data,callback)
      },
      function(data) {
        ServiceHelper.processError(data,error);
      })
  }

  function createChat(chatName, callback, error) {
    let userId = LocalStorageService.load("login").userId;
    HttpService.post(ParleConstants.baseUrl + "chats/new/",
      {
        userId : userId,
        chatName : chatName
      },
      function(data) {
        ServiceHelper.processCallback(data,callback)
      },
      function(data) {
        ServiceHelper.processError(data,error);
      })
  }

  function addUserToChat(chatId, userId, callback, error) {
    HttpService.post(ParleConstants.baseUrl + "chats/adduser/",
      {
        chatId,
        userId
      },
      function(data) {
        ServiceHelper.processCallback(data, callback);
      },
      function() {
        ServiceHelper.processError(data,error);
      });
  }

  function getChatMessages(chatId, callback, error) {
    HttpService.get(ParleConstants.baseUrl + "chats/messages/" + chatId + "/64/",
      function(data) {
        ServiceHelper.processCallback(data,callback);
      },
      function(data) {
        ServiceHelper.processError(data,error);
      })
  }

  return {
    loadChats : loadChats,
    createChat : createChat,
    addUserToChat : addUserToChat,
    createChat : createChat,
    addUserToChat : addUserToChat,
    getChatMessages : getChatMessages
  };
});
