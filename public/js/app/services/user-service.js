(function() {
  'use strict';

  angular
    .module('app')
    .factory('userService', userServiceFactory);

  userServiceFactory.$inject = ['$http'];

  function userServiceFactory($http) {
    return {
      addRemoveFollow: addRemoveFollow,
      createUser: createUser,
      getNotifications: getNotifications,
      getUser: getUser,
      getUsersList: getUsersList,
      loadUserData: loadUserData,
      loginUser: loginUser,
      logoutUser: logoutUser,
      resetPassword: resetPassword,
      sendResetUserToken: sendResetUserToken,
      updateUserPassword: updateUserPassword,
      updateUserProfile: updateUserProfile
    };

    function addRemoveFollow(query) {
      return $http.post('/api/user/add-remove-follow', query)
        .then(function(response) {
          return response.data;
        });
    }

    function createUser(user) {
      return $http.post('/api/user/create', user)
        .then(function(response) {
          return response.data;
        },function(response) {
          return {error: {id: response.status, message: "Server errror"}};
        });
    }

    function getNotifications(query) {
      return $http.post('/api/user/notifications', query)
        .then(function(response) {
          return response.data;
        });
    }

    function getUser() {
      return $http.get('/api/user/me')
        .then(function(response) {
          return response.data;
        });
    }

    function getUsersList(user) {
      return $http.post('/api/user/list', user)
        .then(function(response) {
          return response.data;
        });
    }

    function loadUserData(query) {
      return $http.post('/api/user/load-user-data', query)
        .then(function(response) {
          return response.data;
        });
    }

    function loginUser(user) {
      return $http.post('/api/user/login', {email: user.email, password: user.password, remember_me: user.remember_me})
        .then(function(response) {
          return response.data;
        });
    }

    function logoutUser(user) {
      return $http.get('/api/user/logout')
        .then(function(response) {
          return response.data;
        });
    }

    function resetPassword(user) {
      return $http.post('/api/user/reset-password', user)
        .then(function(response) {
          return response.data;
        });
    }

    function sendResetUserToken(user) {
      return $http.post('/api/user/send-reset-token', user)
        .then(function(response) {
          return response.data;
        });
    }

    function updateUserPassword(user) {
      return $http.post('/api/user/update-password', user)
        .then(function(response) {
          return response.data;
        });
    }

    function updateUserProfile(user) {
      return $http.post('/api/user/update-profile', user)
        .then(function(response) {
          return response.data;
        });
    }

  }
}());
