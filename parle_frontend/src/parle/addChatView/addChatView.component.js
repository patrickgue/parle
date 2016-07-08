(function() {

  function AddChatViewController (UserService) {
    let vm = this;
    vm.search;
    vm.results;
    vm.selectedResult = -1;
    vm.addUserToMenuOpen = false;

    vm.loadSearchUsers = function() {
      UserService.searchUser(vm.search,
        function(data) {
          vm.results = data;
        },
        function() {

        });
      vm.search
    }
    vm.addUser = function(userId) {
      vm.selectedResult = userId;
      vm.addUserToMenuOpen = true;
    };

    vm.addUserToMenuClose = function() {
      vm.addUserToMenuOpen = false;
      vm.selectedResult -1;
    };

  };



  angular.module("parleApp").component("addChatView" , {
    controller : AddChatViewController,
    templateUrl : "parle/addChatView/addChatView.html"
  });
})();
