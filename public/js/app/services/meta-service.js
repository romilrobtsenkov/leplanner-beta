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
      getSubjectJSONList: getSubjectJSONList,
      getStageJSONList: getStageJSONList,
      getMethodJSONList: getMethodJSONList

    };

    function getSubjectList() {
      return ['Maths', 'History', 'English', 'Basic Education', 'Biology', 'Estonian (native language)', 'Estonian (foreign language)',
          'Speciality language', 'Special Education', 'Physics', 'Geography', 'Educational Technology', 'Informatics', 'Human Studies', 'Chemistry', 'Physical Education',
          'Literary', 'Home Economics', 'Arts', 'Crafts', 'Natural Science', 'Economics and Business', 'Media Studies', 'Music', 'French', 'Swedish', 'German', 'Finnish',
          'Handicraft and Home Economics', 'Russian (native language)', 'Russian (foreign language)', 'Social Education'].sort();
    }

    function getSubjectJSONList() {
      return [{id: 1, label: 'Maths'}, {id: 2, label: 'History'}, {id: 3, label: 'English'}, {id: 4, label: 'Basic Education'}, {id:5, label: 'Biology'},
      {id:6, label: 'Estonian (native language)'},
      {id:7, label: 'Estonian (foreign language)'},
        {id:8, label: 'Speciality language'}, {id:9, label: 'Special Education'}, {id:10, label: 'Physics'}, {id:11, label: 'Geography'}, {id:12, label: 'Educational Technology'},
        {id:13, label: 'Informatics'}, {id:14, label: 'Human Studies'},
        {id:15, label: 'Chemistry'}, {id:16, label: 'Physical Education'},
        {id:17, label: 'Literary'}, {id:18, label: 'Home Economics'}, {id:19, label: 'Arts'}, {id:20, label: 'Crafts'}, {id:21, label: 'Natural Science'},
        {id:22, label: 'Economics and Business'},
        {id:23, label: 'Media Studies'}, {id:24, label: 'Music'},
        {id:25, label: 'French'}, {id:26, label: 'Swedish'}, {id:27, label: 'German'}, {id:28, label: 'Finnish'},
        {id:29, label: 'Handicraft and Home Economics'}, {id:30, label: 'Russian (native language)'}, {id:31, label: 'Russian (foreign language)'},
        {id:32, label: 'Social Education'}];
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
