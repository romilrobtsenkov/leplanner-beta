(function() {
  'use strict';

  angular
    .module('app')
    .factory('userService', userServiceFactory);

  userServiceFactory.$inject = ['$http'];

  function userServiceFactory($http) {
    return {
      getUser: getUser,
      loginUser: loginUser,
      createUser: createUser,
      loadUserData: loadUserData,
      addRemoveFollow: addRemoveFollow,
      recoverUser: recoverUser,
      getUsersList: getUsersList,
      logOutUser: logOutUser,
      updateUserProfile: updateUserProfile,
      updateUserPassword: updateUserPassword,
      resetPassword: resetPassword,
    };

    function getUser() {
      return $http.get('/api/users/me')
        .then(function(response) {
          return response.data;
        });
    }

    function loginUser(user) {
      return $http.post('/api/users/login', {email: user.email, password: user.password, rememberMe: user.rememberMe})
        .then(function(response) {
          return response.data;
        });
    }

    function createUser(user) {
      return $http.post('/api/users/create', user)
        .then(function(response) {
          return response.data;
        });
    }

    function loadUserData(query) {
      return $http.post('/api/users/load-user-data', query)
        .then(function(response) {
          return response.data;
        });
    }

    function addRemoveFollow(query) {
      return $http.post('/api/users/add-remove-follow', query)
        .then(function(response) {
          return response.data;
        });
    }

    function logOutUser(user) {
      return $http.get('/api/users/logout')
        .then(function(response) {
          return response.data;
        });
    }

    function recoverUser(user) {
      return $http.post('/api/users/recover', user)
        .then(function(response) {
          return response.data;
        });
    }

    function getUsersList(user) {
      return $http.post('/api/users/list', user)
        .then(function(response) {
          return response.data;
        });
    }

    function updateUserProfile(user) {
      return $http.post('/api/users/updateprofile', user)
        .then(function(response) {
          return response.data;
        });
    }

    function updateUserPassword(user) {
      return $http.post('/api/users/updatepassword', user)
        .then(function(response) {
          return response.data;
        });
    }

    function resetPassword(user) {
      return $http.post('/api/users/resetpassword', user)
        .then(function(response) {
          return response.data;
        });
    }

  }
}());
