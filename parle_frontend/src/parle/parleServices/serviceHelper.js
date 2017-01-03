angular.module("parleApp").factory("ServiceHelper", function() {
  function processCallback(data, callback, error) {
    if(callback !== undefined) {
      callback(data.data);
    }
    else {
      console.log("[warning] no callback handling");
    }
  }

  function processError(data, error) {
    console.log("http error",data);
    if(error !== undefined) {
      error(data);
    }
    else {
      console.log("[warning] no error handling")
    }
  }

  return {
    processCallback : processCallback,
    processError : processError
  }
});
