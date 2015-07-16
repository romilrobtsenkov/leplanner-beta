(function() {
  'use strict';

  angular
    .module('app')
    .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope','$rootScope','scenarioService', 'metaService'];

    function SearchController($scope,$rootScope,scenarioService,metaService) {

      //  arrays to store selected multiple choices
      $scope.selected_subjects = [];
      $scope.selected_method = [];
      $scope.selected_stage = [];


      $scope.subjectSettings = {
        externalIdProp: '',
        scrollableHeight: '400px',
        scrollable: true,
        enableSearch: true,
        smartButtonMaxItems: 3,
        displayProp: 'label',
        idProp: 'id',
        buttonClasses: 'btn btn-default btn-fixed-width'
      };
      $scope.methodSettings = {
        externalIdProp: '',
        selectionLimit: 1,
        smartButtonMaxItems: 1,
        displayProp: 'label',
        idProp: 'id',
        buttonClasses: 'btn btn-default btn-fixed-width'
      };
      $scope.stageSettings = {
        externalIdProp: '',
        selectionLimit: 1,
        smartButtonMaxItems: 1,
        displayProp: 'label',
        idProp: 'id',
        buttonClasses: 'btn btn-default btn-fixed-width'
      };
      $scope.subjectText = {buttonDefaultText: 'Subject'};
      $scope.methodText = {buttonDefaultText: 'Method'};
      $scope.stageText = {buttonDefaultText: 'Stage'};
      $scope.subjects = metaService.getSubjectJSONList();
      $scope.methods = metaService.getMethodJSONList();
      $scope.stages = metaService.getStageJSONList();

      searchScenarios();

      $scope.search = function() {

        var subjects = [];
        var selected_subjects_labels = [];
        var selected_method_labels = [];
        var selected_stage_labels = [];

        $scope.selected_subjects.forEach(function(element) {
          selected_subjects_labels.push(element.label);
        });

        /*$scope.selected_method.forEach(function(element) {
          selected_method_labels.push(element.label);
        });
        $scope.selected_stage.forEach(function(element) {
          selected_stage_labels.push(element.label);
        });*/
        if(typeof $scope.selected_method.label != 'undefined'){
          selected_method_labels.push($scope.selected_method.label);
        }
        if(typeof $scope.selected_stage.label != 'undefined'){
          console.log($scope.selected_stage);
          selected_stage_labels.push($scope.selected_stage.label);
        }


        console.log($scope.selected_method);

        var search = {
          search_word: $scope.search_word,
          subjects: selected_subjects_labels,
          method: selected_method_labels,
          stage: selected_stage_labels
        };

        console.log(search);
        searchScenarios(search);

      };

      function searchScenarios(query){

        var q;

        if(typeof query != 'undefined'){

          q = query;

        }

        scenarioService.searchScenarios(q)
          .then(function(data) {
            console.log(data);
            if(data.scenarios){
              $scope.scenarios = data.scenarios;
              if(typeof q != 'undefined'){
                $scope.search_word_end = q.search_word;
              }else{
                $scope.search_word_end = undefined;
              }
              $scope.search_end = 1;
            }

            if(data.error){
              console.log(data.error);
            }
        });

      }

    }
}());
