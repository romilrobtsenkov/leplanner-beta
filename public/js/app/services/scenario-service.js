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
      getSingleScenario: getSingleScenario

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

    function getSingleScenario(id) {
      console.log(id);
      return $http.post('/api/scenarios/single-scenario',{id: id})
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
