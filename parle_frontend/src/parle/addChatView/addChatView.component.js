(function() {

  function AddChatViewController (UserService, ChatService) {
    let vm = this;
    vm.search;
    vm.results;
    vm.selectedResult = -1;
    vm.addUserToMenuOpen = false;
    vm.errorMessage = undefined;
    vm.newChatWindow = false;
    vm.newChatName = "";


    vm.loadSearchUsers = function() {
      UserService.searchUser(vm.search,
        function(data) {
          vm.results = data;
          vm.errorMessage = undefined;
        },
        function() {
          vm.errorMessage = "unable to load user list";
        });
      vm.search
    }
    vm.addUser = function(userId) {
      vm.selectedResult = userId;
      vm.addUserToMenuOpen = true;
    };

    vm.addUserToMenuClose = function() {
      vm.addUserToMenuOpen = false;
      vm.selectedResult = -1;
    };

    vm.createChat = function(userId) {
      ChatService.createChat()
    };

    vm.openNewChatWindow = function() {
      vm.newChatWindow = true;
    };

    vm.closeNewChatWindow = function() {
      vm.newChatWindow = false;
    };

    vm.createNewChat = function () {
      ChatService.createChat(vm.newChatName,
        function(data) {
          console.log(data)
        },
        function() {

        }
      )
      vm.newChatWindow = false;
    }

  }



  angular.module("parleApp").component("addChatView" , {
    controller : AddChatViewController,
    templateUrl : "parle/addChatView/addChatView.html"
  });
})();
