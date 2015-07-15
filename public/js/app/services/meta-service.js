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
       getTechList: getTechList

    };

    function getSubjectList() {
      return ['Maths', 'History', 'English', 'Basic Education', 'Biology', 'Estonian (native language)', 'Estonian (foreign language)',
          'Speciality language', 'Special Education', 'Physics', 'Geography', 'Educational Technology', 'Informatics', 'Human Studies', 'Chemistry', 'Physical Education',
          'Literary', 'Home Economics', 'Arts', 'Crafts', 'Natural Science', 'Economics and Business', 'Media Studies', 'Music', 'French', 'Swedish', 'German', 'Finnish',
          'Handicraft and Home Economics', 'Russian (native language)', 'Russian (foreign language)', 'Social Education'].sort();
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

    function getLanguageList() {
      return ['Estonian', 'English', 'Russian', 'Swedish', 'Latvian', 'Lithuanian', 'Finnish', 'Spanish', 'French', 'Norwegian', 'Chinese', 'Japanese'].sort();
    }

    function getMethodList() {
      return ['Game-based', 'Project-based', 'Exploratory-based', 'Task-based', 'Inverted'];
    }

    function getTechList() {
      return ['VOSK', 'Arvutiklass'];
    }


  }
}());
