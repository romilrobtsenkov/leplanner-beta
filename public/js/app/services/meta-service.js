(function() {
  'use strict';

  angular
    .module('app')
    .factory('metaService', metaServiceFactory);

  metaServiceFactory.$inject = ['$http'];

  function metaServiceFactory($http) {
    return {
      getSubjectList: getSubjectList,

    };

    function getSubjectList() {
      return $http.get('/api/meta/subjects')
        .then(function(response) {
          return response.data;
        });
    }

  }
}());
