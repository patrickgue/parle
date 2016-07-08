(function() {

  function AboutViewController (UserService,LocalStorageService,$scope) {
    let vm = this;

    vm.userName = "";
    vm.userId = "";

    viewMan.viewevent("about", function() {
      let user = LocalStorageService.load("login");
      vm.userName = user.userName;
      vm.userId = user.userId;

      $scope.$apply();
    });



    vm.error = undefined;

    vm.logout = function() {
      LocalStorageService.del("login");
      viewMan.nav("login");
    };



    vm.deleteUser = function() {
      UserService.deleteUser(vm.userId, function(data) {
        viewMan.nav("login");
      },
      function () {
        vm.error = "Removal of your account was unsuccessful. Please contact the system administrators.";
      });
    };
  }


  angular.module("parleApp").component("aboutView" , {
    controller : AboutViewController,
    templateUrl : "parle/aboutView/aboutView.html"
  });
})();
