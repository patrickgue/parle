(function() {

  function SettingsViewController (LocalStorageService) {
    let vm = this;


  }


  angular.module("parleApp").component("settingsView" , {
    controller : SettingsViewController,
    templateUrl : "parle/settingsView/settingsView.html"
  });
})();
