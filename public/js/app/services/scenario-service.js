(function() {
  'use strict';

  angular
    .module('app')
    .factory('scenarioService', scenarioServiceFactory);

  scenarioServiceFactory.$inject = ['$http'];

  function scenarioServiceFactory($http) {
    return {
      getScenarios: getScenarios,
      createScenario: createScenario,
      searchScenarios: searchScenarios,
      getSingleScenario: getSingleScenario,
      addRemoveFavorite: addRemoveFavorite

    };

    function getScenarios(query) {
      return $http.post('/api/scenarios/scenarios-list',query)
        .then(function(response) {
          return response.data;
        });
    }

    function searchScenarios(query) {
      return $http.post('/api/scenarios/search',query)
        .then(function(response) {
          return response.data;
        });
    }

    function getSingleScenario(params) {
      return $http.post('/api/scenarios/single-scenario',params)
        .then(function(response) {
          return response.data;
        });
    }

    function addRemoveFavorite(params) {
      return $http.post('/api/scenarios/add-remove-favorite',params)
        .then(function(response) {
          return response.data;
        });
    }

    function createScenario(scenario) {
      return $http.post('/api/scenarios/create',scenario)
        .then(function(response) {
          return response.data;
        });
    }

  }
}());
