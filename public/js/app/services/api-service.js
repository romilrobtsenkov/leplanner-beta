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
      loginUser: loginUser
    };

    function getScenarios() {
      return $http.get('/api/scenarios/scenarios')
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

    function loginUser(email,password) {
      return $http.post('/api/users/login', {email: email, password: password})
        .then(function(response) {
          return response.data;
        });
    }
  }
}());
