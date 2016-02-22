(function() {
  'use strict';

  angular
    .module('app')
    .factory('metaService', ['$http',
    function($http) {
        return {
          getSubjectList: getSubjectList,
          getScenarioMeta: getScenarioMeta

        };

        function getSubjectList() {
          return $http.get('/api/meta/subjects')
            .then(function(response) {
              return response.data;
            });
        }

        function getScenarioMeta() {
          return $http.get('/api/meta/get-scenario-meta')
            .then(function(response) {
              return response.data;
            });
        }



  }]);
}());
