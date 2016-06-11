(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', ['$scope','$rootScope','$location','requestService','$window','$translate',
    function($scope,$rootScope,$location,requestService,$window,$translate) {

      $rootScope.title = 'Leplanner beta';

      /* ANALYTICS */
      $window.ga('send', 'pageview', {
        'page': $location.path(),
        'title': $rootScope.title
      });

      if(typeof $rootScope.home_active_sort_tab === 'undefined'){
        $rootScope.home_active_sort_tab = 'latest';
      }

      // INIT
      getScenarios();
      loadSubjects();

      function getScenarios(){
        var q = {};
        q.limit = 4;

        if(typeof $rootScope.home_active_sort_tab == 'undefined'){
          $rootScope.home_active_sort_tab = 'latest';
        }else{
          switch ($rootScope.home_active_sort_tab) {
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

        requestService.post('/scenario/widget-list', q)
          .then(function(data) {
            //console.log(data);
            if(data.scenarios){
              $scope.scenarios = data.scenarios;
            }

            if(data.error){
              console.log(data.error);
            }
        });

      }

      function loadSubjects(){
        requestService.get('/meta/subjects')
        .then(function(data) {

          if(data.subjects){
            $scope.subjects = data.subjects;

            for(var a = 0; a < $scope.subjects.length; a++){
                $scope.subjects[a].name = $scope.subjects[a]["name_"+$translate.use()];
            }

          }

          if(data.error){
            console.log(data.error);
          }
        });
      }

      $scope.isSortActive = function(tab){
        if(tab == $rootScope.home_active_sort_tab){ return true; }
        return false;
      };

       $scope.updateSortList = function(tab){
        if(tab == 'latest ' || tab == 'popular' || tab == 'favorited' || tab == 'commented'){
          $rootScope.home_active_sort_tab = tab;
          getScenarios();
        }else{
          $rootScope.home_active_sort_tab = 'latest';
          getScenarios();
        }
      };

      $scope.searchSubject = function(subject_name, $event){
        if(typeof $event !== 'undefined'){
          $event.preventDefault();
        }
        $rootScope.search_subject = subject_name;
        $location.path('/search');
      };

  }]);
}());
