angular.module("parleApp").factory("ServiceHelper", function() {
  function processCallback(data, callback, error) {
    if(callback !== undefined) {
      callback(data.data);
    }
  }

  function processError(data, error) {
    console.log("http error",data);
    if(error !== undefined) {
      error(data);
    }
  }

  return {
    processCallback : processCallback,
    processError : processError
  }
});
