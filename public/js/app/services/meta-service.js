(function() {
  'use strict';

  angular
    .module('app')
    .factory('metaService', metaServiceFactory);

  metaServiceFactory.$inject = ['$http'];

  function metaServiceFactory($http) {
    return {
      getSubjectList: getSubjectList,
      getcreateScenarioMeta: getcreateScenarioMeta

    };

    function getSubjectList() {
      return $http.get('/api/meta/subjects')
        .then(function(response) {
          return response.data;
        });
    }

    function getcreateScenarioMeta() {
      return $http.get('/api/meta/create-new-scenario-meta')
        .then(function(response) {
          return response.data;
        });
    }



  }
}());
