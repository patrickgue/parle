(function() {

  function SignupViewController (UserService, LocalStorageService) {
    let vm = this;

    vm.error = undefined;
    vm.signupUser = {
      userName : "",
      userPassword : "",
      userPasswordRepeat : ""
    };

    vm.signup = function() {
      vm.error = undefined;
      if(vm.signupUser.userName === ""
        || vm.signupUser.userPassword === ""
        || vm.signupUser.userPasswordRepeat === "") {
        vm.error = "username or password field empty";
      } else {
        UserService.signup(vm.signupUser, function(data) {
          LocalStorageService.store("login", {userId : data.userId, userName : vm.signupUser.userName});
          viewMan.nav("home");
        });
      }
    };
  }


  angular.module("parleApp").component("signupView" , {
    controller : SignupViewController,
    templateUrl : "parle/signupView/signupView.html"
  });
})();
