angular.module("parleApp").controller("ParleController", function($scope) {

  $scope.chatId = -1

  setTimeout(function(){
    if(localStorage.login === undefined) {
      viewMan.nav("login");
    } else {
      viewMan.nav("home")
    }

  },500);
});
