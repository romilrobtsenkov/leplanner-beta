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
      getUser: getUser
    };

    function getScenarios() {
      return $http.get('/scenarios/api/scenarios')
        .then(function(response) {
          return response.data;
        });
    }

    function getScenarioDetails(restId) {
      return $http.get('/scenarios/api/scenarios-details/' + restId)
        .then(function(response) {
          return response.data;
        });
    }

    function getUser() {
      return $http.get('/users/me')
        .then(function(response) {
          return response.data;
        });
    }
  }
}());
