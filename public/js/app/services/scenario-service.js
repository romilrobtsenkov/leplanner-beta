(function() {
  'use strict';

  angular
    .module('app')
    .factory('scenarioService', scenarioServiceFactory);

  scenarioServiceFactory.$inject = ['$http'];

  function scenarioServiceFactory($http) {
    return {
      getWidgetScenarios: getWidgetScenarios,
      getDashScenarios: getDashScenarios,
      createScenario: createScenario,
      searchScenarios: searchScenarios,
      getSingleScenario: getSingleScenario,
      addRemoveFavorite: addRemoveFavorite,
      addComment: addComment,
      getComments: getComments

    };

    function getWidgetScenarios(query) {
      return $http.post('/api/scenarios/scenarios-widget-list',query)
        .then(function(response) {
          return response.data;
        });
    }

    function getDashScenarios(query) {
      return $http.post('/api/scenarios/scenarios-dash-list',query)
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

    function createScenario(params) {
      return $http.post('/api/scenarios/create',params)
        .then(function(response) {
          return response.data;
        });
    }

    function addComment(params) {
      return $http.post('/api/scenarios/add-comment',params)
        .then(function(response) {
          return response.data;
        });
    }

    function getComments(params) {
      return $http.post('/api/scenarios/comments',params)
        .then(function(response) {
          return response.data;
        });
    }

  }
}());
