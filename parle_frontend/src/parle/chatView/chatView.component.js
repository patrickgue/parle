(function() {
  console.log("ChatView");
  function ChatViewController($scope,ChatService) {
    console.log("ChatViewController");
    var self = this;
    self.messages = []

    $scope.$onChange = function() {

      ChatService.getChatMessages(self.chatId, function(data) {
        self.messages = data
      }, function() {

      })
    }
  }

  angular.module("parleApp").component("chatView",{
    controller : ChatViewController,
    templateUrl : "parle/chatView/chatView.html",
    bindings : {
      chatId : "="
    }
  });
})()
