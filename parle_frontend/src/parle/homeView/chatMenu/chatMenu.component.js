(function() {
  function ChatMenuController() {
    let self = this;

  }

  angular.module("parleApp").component("chatMenu", {
    controller : ChatMenuController,
    templateUrl : "parle/homeView/chatMenu/chatMenu.html",
    bindings : {
      name : '=',
      message : '='
    }
  });
})();
