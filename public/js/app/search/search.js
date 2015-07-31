(function() {
  'use strict';

  angular
    .module('app')
    .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope','$rootScope','scenarioService', 'metaService'];

    function SearchController($scope,$rootScope,scenarioService,metaService) {

      $rootScope.title = 'Search | Leplanner beta';

      $scope.$on('triggerSearchForm', function(e) {
        angular.element('#search-word-input').trigger('focus');
        $scope.search();
      });

      if(typeof $rootScope.sort_tab === 'undefined'){
        $rootScope.sort_tab = {};
      }else if(typeof $rootScope.sort_tab.search === 'undefined') {
        $rootScope.sort_tab.search = 'latest';
      }

      // search default pagination start
      if(typeof $rootScope.search_page_nr !== 'undefined'){
        $scope.search_page_nr = $rootScope.search_page_nr;
      }else{
        $rootScope.search_page_nr = 1;
      }

      $scope.loading_animation = true;

      createDropDownMenus();
      getSearchParamsAndSearch();

      $scope.search = function() {
        $scope.search_page_nr = 1;
        getSearchParamsAndSearch();
      };

      $scope.pageChanged = function(new_page_nr) {
        $rootScope.search_page_nr = new_page_nr;
        //console.log($scope.search_page_nr);
      };

      $scope.isSortActive = function(tab){
        if(tab == $rootScope.sort_tab.search){ return true; }
        return false;
      };

      $scope.updateSortList = function(tab){
        if(tab == 'latest ' || tab == 'popular' || tab == 'favorited' || tab == 'commented'){
          $rootScope.sort_tab.search = tab;
          getSearchParamsAndSearch();
        }else{
          $rootScope.sort_tab.search = 'latest';
          getSearchParamsAndSearch();
        }
      };

      function createDropDownMenus(){
        //  arrays to store selected multiple choices
        $scope.selected_subjects = [];
        $scope.selected_methods = [];
        $scope.selected_stages = [];

        $scope.subjectsSettings = {
          externalIdProp: '',
          scrollableHeight: '400px',
          scrollable: true,
          enableSearch: true,
          smartButtonMaxItems: 3,
          displayProp: 'label',
          idProp: 'id',
          buttonClasses: 'btn btn-default btn-fixed-width'
        };
        $scope.methodsSettings = {
          externalIdProp: '',
          smartButtonMaxItems: 2,
          displayProp: 'label',
          idProp: 'id',
          buttonClasses: 'btn btn-default btn-fixed-width'
        };
        $scope.stagesSettings = {
          externalIdProp: '',
          smartButtonMaxItems: 2,
          displayProp: 'label',
          idProp: 'id',
          buttonClasses: 'btn btn-default btn-fixed-width'
        };
        $scope.subjectsText = {buttonDefaultText: 'Subject'};
        $scope.methodsText = {buttonDefaultText: 'Method'};
        $scope.stagesText = {buttonDefaultText: 'Stage'};
        $scope.subjects = metaService.getSubjectJSONList();
        $scope.methods = metaService.getMethodJSONList();
        $scope.stages = metaService.getStageJSONList();

        if(typeof $rootScope.searchParams !== 'undefined'){

          // Retrieve search from navigation
          $scope.search_word = $rootScope.searchParams.search_word;

          for(var i = 0; i < $scope.subjects.length; i++){
            for(var j = 0; j < $rootScope.searchParams.subjects.length; j++){
              if($scope.subjects[i].label == $rootScope.searchParams.subjects[j]){
                 $scope.selected_subjects.push($scope.subjects[i]);
              }
            }
          }

          for(var k = 0; k < $scope.methods.length; k++){
            for(var l = 0; l < $rootScope.searchParams.methods.length; l++){
              if($scope.methods[k].label == $rootScope.searchParams.methods[l]){
                 $scope.selected_methods.push($scope.methods[k]);
              }
            }
          }

          for(var m = 0; m < $scope.stages.length; m++){
            for(var n = 0; n < $rootScope.searchParams.stages.length; n++){
              if($scope.stages[m].label == $rootScope.searchParams.stages[n]){
                 $scope.selected_stages.push($scope.stages[m]);
              }
            }
          }

        }

      }

      function getSearchParamsAndSearch(){

        $scope.loading_animation = true;

        if(typeof $rootScope.top_search_word !== 'undefined'){
          $scope.search_word = $rootScope.top_search_word;
          $rootScope.top_search_word = undefined;
          $scope.$parent.top_search_word = undefined;
          angular.element('#search-word-input').trigger('focus');
        }

        var subjects = [];
        var selected_subjects_labels = [];
        var selected_methods_labels = [];
        var selected_stages_labels = [];

        $scope.selected_subjects.forEach(function(element) {
          selected_subjects_labels.push(element.label);
        });
        $scope.selected_methods.forEach(function(element) {
          selected_methods_labels.push(element.label);
        });
        $scope.selected_stages.forEach(function(element) {
          selected_stages_labels.push(element.label);
        });

        var search_params = {
          search_word: $scope.search_word,
          subjects: selected_subjects_labels,
          methods: selected_methods_labels,
          stages: selected_stages_labels
        };

        //return search_params;
        //var search_params = getSearchParams();
        $rootScope.searchParams = search_params;
        $rootScope.search_page_nr = 1;
        searchScenarios(search_params);
      }



      function searchScenarios(query){

        var q;
        if(typeof query != 'undefined'){
          q = query;
        }

        if(typeof $rootScope.sort_tab.search == 'undefined'){
          $rootScope.sort_tab.search = 'latest';
        }else{
          switch ($rootScope.sort_tab.search) {
            case 'latest':
                q.order = 'latest';
              break;
              case 'popular':
                  q.order = 'popular';
                break;
              case 'favorited':
                  q.order = 'favorited';
                break;
              case 'commented':
                  q.order = 'commented';
                break;
            default:
              q.order = 'latest';
          }
        }

        scenarioService.searchScenarios(q)
          .then(function(data) {
            //console.log(data);
            if(data.scenarios){
              $scope.scenarios = data.scenarios;
              if(typeof q != 'undefined'){
                $scope.search_word_end = q.search_word;
              }else{
                $scope.search_word_end = undefined;
              }
              // update how many results found label
              //$scope.search_end = 1;
              $scope.loading_animation = false;
            }

            if(data.error){
              console.log(data.error);
            }
        });

      }

    }
}());
