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
      getNotifications: getNotifications,
      sendResetUserToken: sendResetUserToken,
      getUsersList: getUsersList,
      logoutUser: logoutUser,
      updateUserProfile: updateUserProfile,
      updateUserPassword: updateUserPassword,
      resetPassword: resetPassword,
    };

    function getUser() {
      return $http.get('/api/user/me')
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

    function createUser(user) {
      return $http.post('/api/user/create', user)
        .then(function(response) {
          return response.data;
        },function(response) {
          return {error: {id: response.status, message: "Server errror"}};
        });
    }

    function loadUserData(query) {
      return $http.post('/api/user/load-user-data', query)
        .then(function(response) {
          return response.data;
        });
    }

    function addRemoveFollow(query) {
      return $http.post('/api/user/add-remove-follow', query)
        .then(function(response) {
          return response.data;
        });
    }

    function getNotifications(query) {
      return $http.post('/api/user/notifications', query)
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

    function sendResetUserToken(user) {
      return $http.post('/api/user/send-reset-token', user)
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

    function updateUserProfile(user) {
      return $http.post('/api/user/update-profile', user)
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

    function resetPassword(user) {
      return $http.post('/api/user/reset-password', user)
        .then(function(response) {
          return response.data;
        });
    }

  }
}());
