angular.module("parleApp").factory("ChatService", function(LocalStorageService, ServiceHelper, HttpService, ParleConstants) {

  function loadChats(callback, error) {
    let userId = LocalStorageService.load("login").userId;
    HttpService.get(ParleConstants.baseUrl + "chats/"+userId+"/",
      function(data) {
        ServiceHelper.processCallback(data,callback)
      },
      function(data) {
        ServiceHelper.processError(data,error);
      })
  }

  return {
    loadChats : loadChats
  };
});
