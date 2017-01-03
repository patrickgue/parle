(function() {

  function HomeViewController (ChatService, UserService, LocalStorageService, $scope) {
    let vm = this;
    vm.errorMessage = undefined;
    vm.statusWindow = false;
    vm.status = "";
    vm.statusError = undefined;
    vm.users = {};

    vm.closeStatusWindow = function () {
      vm.statusWindow = false;
    }

    vm.openStatusWindow = function () {
      vm.statusWindow = true;
    }

    viewMan.viewevent("home", function() {
      loadChats();
      loadStatus();
    });

    function loadChats() {
      ChatService.loadChats(
        function(data) {
          vm.users = data;
          LocalStorageService.store("chatList",data);
          vm.errorMessage = undefined;
        },
        function() {
          vm.errorMessage = "Network error. Can't load chats. Displaying stored ones instead."
          vm.users = LocalStorageService.load("chatList");
          console.log("Error");
        });
    }

    function loadStatus() {
      var userId = LocalStorageService.load("login").userId;
      UserService.searchUserById(userId,
        function(data) {
          vm.status = data.userStatus;
        },
        function() {
          vm.statusError = "couldn't load status";
        })
    }

    vm.setStatus = function() {
      var userId = LocalStorageService.load("login").userId;
      UserService.setStatus(vm.status, userId,
        function(data) {
          vm.statusWindow = false;
          vm.statusError = undefined;
          vm.statusWindow = false;
        },
        function() {
          vm.statusError = "unable to change status";
        })
    };

    vm.enter = function(chatId) {
      self.chatId = chatId
      viewMan.nav("chat");
    }

  }


  angular.module("parleApp").component("homeView" , {
    controller : HomeViewController,
    templateUrl : "parle/homeView/homeView.html",
    bindings : {
      chatId : '='
    }
  });
})();
