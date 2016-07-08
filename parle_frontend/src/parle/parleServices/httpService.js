angular.module("parleApp").factory("HttpService", function($http) {

  function get(url, callback, error) {
    $http.get(url).then(function(dat) {
      callback(dat);
    },
    function(dat) {
      error(dat);
    });
  }

  function post(url, data, callback, error) {
    $http.post(url, data).then(function(dat) {
      callback(dat);
    },
    function(dat) {
      error(dat);
    });
  }

  return {
    get : get,
    post : post,
    delete : undefined
  };
});
