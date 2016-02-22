(function() {
  'use strict';

  angular
    .module('app')
    .factory('scenarioService', ['$http', function($http) {
    return {
      addComment: addComment,
      addRemoveFavorite: addRemoveFavorite,
      createScenario: createScenario,
      deleteComment: deleteComment,
      deleteMaterial: deleteMaterial,
      deleteScenario: deleteScenario,
      getComments: getComments,
      getDashScenarios: getDashScenarios,
      getEditDataSingleScenario: getEditDataSingleScenario,
      getSingleScenario: getSingleScenario,
      getUserScenarios: getUserScenarios,
      getWidgetScenarios: getWidgetScenarios,
      saveMaterial: saveMaterial,
      saveScenario: saveScenario,
      searchScenarios: searchScenarios
    };

    function addComment(params) {
      return $http.post('/api/scenario/add-comment',params)
        .then(function(response) {
          return response.data;
        });
    }

    function addRemoveFavorite(params) {
      return $http.post('/api/scenario/add-remove-favorite',params)
        .then(function(response) {
          return response.data;
        });
    }

    function createScenario(params) {
      return $http.post('/api/scenario/create',params)
        .then(function(response) {
          return response.data;
        });
    }

    function deleteComment(params) {
      return $http.post('/api/scenario/delete-comment',params)
        .then(function(response) {
          return response.data;
        });
    }

    function deleteMaterial(params) {
      return $http.post('/api/scenario/delete-material',params)
        .then(function(response) {
          return response.data;
        });
    }

    function deleteScenario(params) {
      return $http.post('/api/scenario/delete-scenario',params)
        .then(function(response) {
          return response.data;
        });
    }

    function getComments(params) {
      return $http.post('/api/scenario/comments',params)
        .then(function(response) {
          return response.data;
        });
    }

    function getDashScenarios(query) {
      return $http.post('/api/scenario/scenarios-dash-list',query)
        .then(function(response) {
          return response.data;
        });
    }

    function getEditDataSingleScenario(query) {
      return $http.post('/api/scenario/get-edit-data-single-scenario',query)
        .then(function(response) {
          return response.data;
        });
    }

    function getSingleScenario(params) {
      return $http.post('/api/scenario/single-scenario',params)
        .then(function(response) {
          return response.data;
        });
    }

    function getUserScenarios(query) {
      return $http.post('/api/scenario/list',query)
        .then(function(response) {
          return response.data;
        });
    }

    function getWidgetScenarios(query) {
      return $http.post('/api/scenario/widget-list',query)
        .then(function(response) {
          return response.data;
        });
    }

    function saveMaterial(params) {
      return $http.post('/api/scenario/save-material',params)
        .then(function(response) {
          return response.data;
        });
    }

    function saveScenario(params) {
      return $http.post('/api/scenario/save',params)
        .then(function(response) {
          return response.data;
        });
    }

    function searchScenarios(query) {
      return $http.post('/api/scenario/search',query)
        .then(function(response) {
          return response.data;
        });
    }

  }]);
}());
