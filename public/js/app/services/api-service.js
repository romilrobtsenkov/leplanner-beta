(function() {
  'use strict';

  angular
    .module('app')
    .factory('api', apiFactory);

  apiFactory.$inject = ['$http'];

  function apiFactory($http) {
    return {
      getScenarios: getScenarios,
      getScenarioDetails: getScenarioDetails,
      getUser: getUser,
      loginUser: loginUser,
      createUser: createUser,
      recoverUser: recoverUser,
      logOutUser: logOutUser,
    };

    function getScenarios() {
      return $http.get('/api/scenarios/')
        .then(function(response) {
          return response.data;
        });
    }

    function getScenarioDetails(restId) {
      return $http.get('/api/scenarios/scenarios-details/' + restId)
        .then(function(response) {
          return response.data;
        });
    }

    function getUser() {
      return $http.get('/api/users/me')
        .then(function(response) {
          return response.data;
        });
    }

    function loginUser(user) {
      return $http.post('/api/users/login', {email: user.email, password: user.password})
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

  }
}());
