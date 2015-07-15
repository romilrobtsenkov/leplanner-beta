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

    };

    function getScenarios(query) {
      return $http.post('/api/scenarios/scenarios-list',query)
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
