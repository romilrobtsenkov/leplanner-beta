(function() {
  'use strict';

  angular
    .module('app')
    .controller('SearchController', ['$scope','$rootScope','requestService','$translate','$routeParams','$route','$window','$location',
    function($scope,$rootScope,requestService,$translate,$routeParams, $route, $window, $location) {

       if($routeParams.key){
           console.log($routeParams);
           $rootScope.top_search_word = $routeParams.key;
       }

        $translate('PAGE.SEARCH').then(function (t) {
            $rootScope.title = t+' | Leplanner beta';

            /* ANALYTICS */
            $window.ga('send', 'pageview', {
              'page': $location.path(),
              'title': $rootScope.title
            });
        });


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

      // INIT
      createDropDownMenusAndInitialSearch();

      function createDropDownMenusAndInitialSearch(){
        //  arrays to store selected multiple choices
        $scope.selected_subjects = [];

        $scope.subjectsSettings = {
          scrollableHeight: '400px',
          scrollable: true,
          enableSearch: true,
          smartButtonMaxItems: 3,
          displayProp: 'name',
          idProp: '_id',
          showCheckAll: false,
          //externalIdProp: '_id',
          externalIdProp: '',
          buttonClasses: 'btn btn-default btn-fixed-width',
        };

        //$scope.subjectsText = {buttonDefaultText: 'Filter subjects'};
        $scope.subjectsText = {
            buttonDefaultText: $rootScope.translated.dropdowns.subjects,
            uncheckAll: $rootScope.translated.dropdowns.uncheck_all,
            searchPlaceholder: $rootScope.translated.dropdowns.search
        };

        $scope.selected_languages = [];

        $scope.languagesSettings = {
          scrollableHeight: '400px',
          scrollable: false,
          enableSearch: false,
          smartButtonMaxItems: 3,
          displayProp: 'name',
          idProp: 'value',
          showCheckAll: false,
          showUncheckAll: false,
          //externalIdProp: '_id',
          externalIdProp: '',
          buttonClasses: 'btn btn-default btn-fixed-width',
        };

        //$scope.subjectsText = {buttonDefaultText: 'Filter subjects'};
        $scope.languagesText = {
            buttonDefaultText: $rootScope.translated.dropdowns.language,
            uncheckAll: $rootScope.translated.dropdowns.uncheck_all,
            searchPlaceholder: $rootScope.translated.dropdowns.search
        };

        $scope.language_options = [{name: $rootScope.translated.dropdowns.estonian, value: 'et'},{name: $rootScope.translated.dropdowns.english, value: 'en'}];

         requestService.get('/meta/subjects')
          .then(function(data) {

            if(data.subjects){

              $scope.subjects = data.subjects;

              for(var a = 0; a < $scope.subjects.length; a++){
                  $scope.subjects[a].name = $scope.subjects[a]["name_"+$translate.use()];
              }

              // Retrieve search from navigating back to search
              if(typeof $rootScope.searchParams !== 'undefined'){

                $scope.search_word = $rootScope.searchParams.search_word;

                for(var i = 0; i < $scope.subjects.length; i++){
                  for(var j = 0; j < $rootScope.searchParams.subjects.length; j++){
                    if($scope.subjects[i].name == $rootScope.searchParams.subjects[j]){
                       $scope.selected_subjects.push($scope.subjects[i]);
                    }
                  }
                }

              }

              // INITAL SEARCH
              getSearchParamsAndSearch();

            }

            if(data.error){
              console.log(data.error);
            }
        });

      }

      function getSearchParamsAndSearch(){

         console.log($rootScope.searchParams);

        $scope.loading_animation = true;

        if(typeof $rootScope.top_search_word !== 'undefined'){
          $scope.search_word = $rootScope.top_search_word;
          $rootScope.top_search_word = undefined;
          $scope.$parent.top_search_word = undefined;
          angular.element('#search-word-input').trigger('focus');
        }

        var subjects = [];
        var selected_subjects_labels = [];
        var selected_languages_labels = [];


        // redirect from home page, search for subject only
        if(typeof $rootScope.search_subject !== 'undefined'){
          $scope.search_word = '';
          $scope.selected_subjects = [];
          for(var i = 0; i < $scope.subjects.length; i++){
            if($scope.subjects[i].name == $rootScope.search_subject){
              $scope.selected_subjects.push($scope.subjects[i]);
            }
          }
          $rootScope.search_subject = undefined;
      }else if($scope.selected_subjects.length === 0 && $rootScope.searchParams && $rootScope.searchParams.subjects){
          //$scope.search_word = '';
          $scope.selected_subjects = [];
          for(var j = 0; j < $scope.subjects.length; j++){
              for(var k = 0; k < $rootScope.searchParams.subjects.length; k++){

                if($scope.subjects[j]._id == $rootScope.searchParams.subjects[k]){
                  $scope.selected_subjects.push($scope.subjects[j]);
                }
              }
          }
      }

      if($scope.selected_languages.length === 0 && $rootScope.searchParams && $rootScope.searchParams.languages){
          //$scope.search_word = '';
          $scope.selected_languages = [];
          for(var l = 0; l < $scope.language_options.length; l++){
              for(var m = 0; m < $rootScope.searchParams.languages.length; m++){
                if($scope.language_options[l].value == $rootScope.searchParams.languages[m]){
                  $scope.selected_languages.push($scope.language_options[l]);
                }
              }
          }
      }

        $scope.selected_subjects.forEach(function(element) {
          selected_subjects_labels.push(element._id);
        });

        $scope.selected_languages.forEach(function(element) {
          selected_languages_labels.push(element.value);
        });

        var search_params = {
          search_word: $scope.search_word,
          subjects: selected_subjects_labels,
          languages: selected_languages_labels
        };

        console.log(search_params);

        // Save to rootScope to use when user navigates back
        $rootScope.searchParams = search_params;

        $route.updateParams({key:search_params.search_word});

        // Start search
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

        requestService.post('/scenario/search', q)
          .then(function(data) {

            /* ANALYTICS */
            if(q.search_word){
                console.log('logged ANALYTICS');
                $window.ga('send', 'event', 'Keyword', 'search', q.search_word);
            }

            //console.log(data);
            if(data.scenarios){
              $scope.scenarios = data.scenarios;
              if(typeof q != 'undefined'){
                $scope.search_word_end = q.search_word;
              }else{
                $scope.search_word_end = undefined;
              }

              for(var j = 0; j < $scope.scenarios.length; j++){
                  //translating subjects
                  for(var a = 0; a < $scope.scenarios[j].subjects.length; a++){
                      $scope.scenarios[j].subjects[a].name = $scope.scenarios[j].subjects[a]["name_"+$translate.use()];
                  }
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

      $scope.search = function() {
        $scope.search_page_nr = 1;
        $rootScope.search_page_nr = 1;
        $rootScope.searchParams = undefined;
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

  }]); // SearchController end
}());
