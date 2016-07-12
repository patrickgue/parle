angular.module("parleApp").factory("UserService", function(HttpService, ParleConstants, ServiceHelper) {
  function searchAllUsers() {
    HttpService.get(ParleConstants.baseUrl + "users/all", function(dat) {
      return dat.data;
    });
  }


  function searchUserById(id, callback, error) {
    HttpService.get(ParleConstants.baseUrl + "users/user/"+id+"/",
      function(data) {
        ServiceHelper.processCallback(data,callback);
      },
      function(data) {
        ServiceHelper.processError(data,error);
      });
  }


  function login(userLogin, callback, error) {
    HttpService.post(ParleConstants.baseUrl + "users/login", userLogin,
      function(data) {
        ServiceHelper.processCallback(data, callback);
      },
      function(data) {
        ServiceHelper.processError(data,error);
      }
    );
  }

  function searchUser(partOfUserName, callback, error) {
    HttpService.post(ParleConstants.baseUrl + "users/search", {searchUserName : partOfUserName},
    function(data) {
      ServiceHelper.processCallback(data, callback);
    },
    function(data) {
      ServiceHelper.processError(data, error);
    });
  }

  function signup(userSignup, callback, error) {
    HttpService.post(ParleConstants.baseUrl + "users/signup", userSignup,
      function(data) {
        ServiceHelper.processCallback(data, callback);
      },
      function(data) {
        ServiceHelper.processError(data, error);
      }
    );
  };

  function deleteUser(userId, callback, error) {
    HttpService.post(ParleConstants.baseUrl + "users/delete", {userId : userId} ,
      function(data) {
        ServiceHelper.processCallback(data, callback);
      },
      function(data) {
        ServiceHelper.processError(data, error);
      }
    );
  }

  function setStatus(status, userId, callback, error) {
    HttpService.post(ParleConstants.baseUrl + "users/status/",
      {userId : userId, userStatus : status},
      function(data) {
        ServiceHelper.processCallback(data, callback);
      },
      function() {
        ServiceHelper.processError(data, error);
      });
  }

  return {
    searchAllUsers : searchAllUsers,
    login : login,
    signup : signup,
    deleteUser : deleteUser,
    searchUser : searchUser,
    searchUserById : searchUserById,
    setStatus : setStatus
  };
});
