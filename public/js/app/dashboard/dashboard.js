(function() {
  'use strict';

  angular
    .module('app')
    .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope','$rootScope','scenarioService', 'userService', 'metaService'];

    function DashboardController($scope,$rootScope,scenarioService,userService,metaService) {

      if(typeof $rootScope.dash_active_tab === 'undefined'){
        $rootScope.dash_active_tab = 'feed';
      }

      if(typeof $rootScope.sort_tab === 'undefined'){
        $rootScope.sort_tab = {};
      }else if(typeof $rootScope.sort_tab.dash === 'undefined') {
        $rootScope.sort_tab.dash = 'latest';
      }

      getDashboardData();

      function getDashboardData(){

        $scope.loading_animation = true;
        clearMessages();
        $scope.scenarios = [];
        $scope.users_list = [];

        var q = {
          order : 'latest',
          user: {
            _id: $rootScope.user._id
          }
        };

        if(typeof $rootScope.sort_tab.dash == 'undefined'){
          $rootScope.sort_tab.dash = 'latest';
        }else{
          switch ($rootScope.sort_tab.dash) {
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

        if(typeof $rootScope.dash_active_tab == 'undefined'){
          q.filter = 'feed';
        }else{
          switch ($rootScope.dash_active_tab) {
            case 'feed':
                q.filter = 'feed';
              break;
            case 'drafts':
                q.filter = 'drafts';
              break;
            case 'published':
                q.filter = 'published';
              break;
            case 'favorites':
                q.filter = 'favorites';
              break;
            case 'users':
                q.filter = 'users';
              break;
            default:
              q.filter = 'feed';
          }
        }

        if(q.filter != 'users'){

          getScenarios(q);

        }else{

          // get users list to follow/unfollow

          var params = {
              user: {
                _id: $rootScope.user._id
              }
          };

          userService.getUsersList(params)
            .then(function(data) {

              if(data.users){

                if(data.following.length > 0){

                  for(var i = 0; i < data.users.length; i++){
                    for(var j = 0; j < data.following.length; j++){
                      if(data.users[i]._id == data.following[j].following){
                        data.users[i].following = true;
                      }
                    }
                  }
                }

                $scope.users_list = data.users;
                $scope.loading_animation = false;
              }

              if(data.error){
                switch(data.error.id) {
                  case 100:
                    // user changed
                    $location.path('/');
                    break;
                  default:
                    console.log(data.error);
                }
              }
          });

        }

      }

      function getScenarios(q){
        scenarioService.getDashScenarios(q)
          .then(function(data) {
            if(data.scenarios){

              switch (q.filter) {
                case 'feed':
                  if(data.scenarios.length === 0){
                    $scope.no_following = true;
                  }
                  break;
                case 'drafts':
                  $scope.drafts_count = data.scenarios.length;
                  if(data.scenarios.length === 0){
                    $scope.no_drafts = true;
                  }
                  break;
                case 'published':
                  if(data.scenarios.length === 0){
                    $scope.no_published = true;
                  }
                  break;
                case 'favorites':
                  if(data.scenarios.length === 0){
                    $scope.no_favorites = true;
                  }
                  break;
                default:
                  alert('something went wrong, please refresh the page');
                  break;
              }

              $scope.scenarios = data.scenarios;
              $scope.loading_animation = false;

            }

            if(data.error){
              switch(data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                default:
                  console.log(data.error);
              }
            }
        });
      }

      function clearMessages(){
        $scope.no_drafts = undefined;
        $scope.no_published = undefined;
        $scope.no_favorites = undefined;
        $scope.no_following = undefined;
      }

      $scope.isActiveDash = function(tab){
        if(tab == $rootScope.dash_active_tab){ return true; }
        return false;
      };

       $scope.updateDashList = function(tab){
        if(tab == 'feed ' || tab == 'drafts' || tab == 'published' || tab == 'favorites' || tab == 'users'){
          $rootScope.dash_active_tab = tab;
          getDashboardData();
        }else{
          $rootScope.dash_active_tab = 'feed';
          getDashboardData();
        }
      };

      $scope.isSortActive = function(tab){
        if(tab == $rootScope.sort_tab.dash){ return true; }
        return false;
      };

      $scope.updateSortList = function(tab){
        if(tab == 'latest ' || tab == 'popular' || tab == 'favorited' || tab == 'commented'){
          $rootScope.sort_tab.dash = tab;
          getDashboardData();
        }else{
          $rootScope.sort_tab.dash = 'latest';
          getDashboardData();
        }
      };


      $scope.addRemoveFollow = function(user_id,remove_follow){

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          following: {
            _id: user_id
          }
        };

        if(typeof remove_follow !== 'undefined'){
          params.remove_follow = true;
        }

        userService.addRemoveFollow(params)
          .then(function(data) {

            if(data.success){
              if(data.success == 'unfollow'){

                for(var i = 0; i < $scope.users_list.length; i++){
                  if($scope.users_list[i]._id == user_id){
                    $scope.users_list[i].following = undefined;
                  }
                }

              }else{
                for(var j = 0; j < $scope.users_list.length; j++){
                  if($scope.users_list[j]._id == user_id){
                    $scope.users_list[j].following = true;
                  }
                }
              }

            }

            if(data.error){
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                default:
                  console.log(data.error);

              }
            }
        });
      };


    } // DashboardController end
}());
