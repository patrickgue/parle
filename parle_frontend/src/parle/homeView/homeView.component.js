(function() {

  function HomeViewController (ChatService, UserService, LocalStorageService, $scope) {
    let vm = this;
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
      ChatService.loadChats(function(data) {
        vm.users = data;
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

  }


  angular.module("parleApp").component("homeView" , {
    controller : HomeViewController,
    templateUrl : "parle/homeView/homeView.html"
  });
})();
