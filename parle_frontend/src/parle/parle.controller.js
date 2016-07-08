angular.module("parleApp").controller("ParleController", function() {
  setTimeout(function(){
    if(localStorage.login === undefined) {
      viewMan.nav("login");
    } else {
      viewMan.nav("home")
    }

  },500);
});
