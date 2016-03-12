(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', ['$scope','$rootScope','$location','requestService', '$translate',
    function($scope,$rootScope,$location,requestService, $translate) {

      $rootScope.title = 'Leplanner beta';

      //console.log($rootScope.user);
      $scope.logout = function(){
        requestService.get('/user/logout')
          .then(function(data){
            console.log(data);
            $rootScope.user = undefined;
            $location.path('/');
          });
      };

      $scope.navigateToLogin = function($event){
        $event.preventDefault();
        if($location.path().toString() != '/'){
          $rootScope.navigatedToLoginFrom = $location.path();
          $location.path('/login');
        }else{
          // if from home page
          $location.path('/login');
        }

      };

      $scope.searchFromTop = function($event){
        if($location.path() == '/search'){
          $rootScope.top_search_word = $scope.top_search_word;
          $scope.$broadcast ('triggerSearchForm');
        }else{
          if(typeof $event !== 'undefined'){
            $event.preventDefault();
          }
          $rootScope.top_search_word = $scope.top_search_word;
          $location.path('/search');
        }
      };

      //var currentLang = $translate.proposedLanguage() || $translate.use();
      //console.log('language ' + currentLang);

      $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);

        //if user - save preferred language
        if($rootScope.user){
            $scope.setLanguage();
        }

      };

      $scope.setLanguage = function(){
          var currentLang = $translate.proposedLanguage() || $translate.use();
          requestService.post('/user/save-language', {lang: currentLang})
            .then(function(data) {

              if(data.success){
                  //console.log(data.success);
                  $rootScope.user.lang = currentLang;
              }

              if(data.error){
                //console.log(data);
                console.log('unable to set user lang');
              }
          });

      };

  }]); // MainController end
}());
