(function() {

  function LoginViewController (UserService, LocalStorageService) {
    let vm = this;

    vm.error = undefined;
    vm.loginUser = {
      userName : "",
      userPassword : ""
    };

    vm.login = function() {
      vm.error = undefined;
      if(vm.loginUser.userName === "" || vm.loginUser.userPassword === "") {
        vm.error = "username or password field empty";
      } else {
        UserService.login(vm.loginUser, function(data) {
          if(data.userId !== undefined){
            LocalStorageService.store("login", {
              userId : data.userId,
              userName : vm.loginUser.userName
            });
            viewMan.nav("home");
            vm.error = undefined;
          } else {
            vm.error = data.errorMessage;
          }
        });

        // = "Wrong password or username";
      }
    };
  }


  angular.module("parleApp").component("loginView" , {
    controller : LoginViewController,
    templateUrl : "parle/loginView/loginView.html"
  });
})();
