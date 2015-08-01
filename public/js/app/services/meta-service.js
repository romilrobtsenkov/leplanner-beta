(function() {
  'use strict';

  angular
    .module('app')
    .factory('metaService', metaServiceFactory);

  metaServiceFactory.$inject = ['$http'];

  function metaServiceFactory($http) {
    return {
      getSubjectList: getSubjectList,
      getLicenseList: getLicenseList,
      getMaterialList: getMaterialList,
      getStageList: getStageList,
      getLanguageList: getLanguageList,
      getMethodList: getMethodList,
      getStageJSONList: getStageJSONList,
      getMethodJSONList: getMethodJSONList

    };

    function getSubjectList() {
      return $http.get('/api/meta/subjects')
        .then(function(response) {
          return response.data;
        });
    }

    function getLicenseList() {
      return ['All rights reserved', 'Creative Commons', 'No license'];
    }

    function getMaterialList() {
      return ['Text', 'App', 'Sound', 'Test', 'Presentation'];
    }

    function getStageList() {
      return ['I_stage', 'II_stage', 'III_stage', 'IV_stage'];
    }

    function getStageJSONList() {
      return [{id:1, label:'I_stage'}, {id:2, label:'II_stage'}, {id:3, label:'III_stage'}, {id:4, label:'IV_stage'}];
    }

    function getLanguageList() {
      return ['Estonian', 'English', 'Russian', 'Swedish', 'Latvian', 'Lithuanian', 'Finnish', 'Spanish', 'French', 'Norwegian', 'Chinese', 'Japanese'].sort();
    }

    function getMethodList() {
      return ['Game-based', 'Project-based', 'Exploratory-based', 'Task-based', 'Inverted'];
    }

    function getMethodJSONList() {
      return [{id:1, label:'Game-based'}, {id:2, label:'Project-based'}, {id:3, label:'Exploratory-based'}, {id:4, label:'Task-based'}, {id:5, label:'Inverted'}];
    }

  }
}());
