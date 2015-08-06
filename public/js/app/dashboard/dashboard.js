(function() {
  'use strict';

  angular
    .module('app')
    .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope','$rootScope','scenarioService', 'userService', 'metaService'];

    function DashboardController($scope,$rootScope,scenarioService,userService,metaService) {

      $rootScope.title = $rootScope.user.first_name+' '+$rootScope.user.last_name+' dashboard | Leplanner beta';

      if(typeof $rootScope.dash_active_tab === 'undefined'){
        $rootScope.dash_active_tab = 'feed';
      }

      if(typeof $rootScope.sort_tab === 'undefined'){
        $rootScope.sort_tab = {};
      }else if(typeof $rootScope.sort_tab.dash === 'undefined') {
        $rootScope.sort_tab.dash = 'latest';
      }

      getDashboardData();

      var notification_limit = 20;
      getNotifications(notification_limit);

      function getDashboardData(){

        $scope.loading_animation = true;
        $scope.messages = {};
        $scope.scenarios = [];
        $scope.users_list = [];

        var query = {
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
                query.order = 'latest';
              break;
              case 'popular':
                  query.order = 'popular';
                break;
              case 'favorited':
                  query.order = 'favorited';
                break;
              case 'commented':
                  query.order = 'commented';
                break;
            default:
              query.order = 'latest';
          }
        }

        if(typeof $rootScope.dash_active_tab == 'undefined'){
          query.page = 'feed';
        }else{
          switch ($rootScope.dash_active_tab) {
            case 'feed':
                query.page = 'feed';
              break;
            case 'drafts':
                query.page = 'drafts';
              break;
            case 'published':
                query.page = 'published';
              break;
            case 'favorites':
                query.page = 'favorites';
              break;
            case 'users':
                query.page = 'users';
              break;
            default:
              query.page = 'feed';
          }
        }

        if(query.page != 'users'){

          getScenarios(query);

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

      function getScenarios(query){
        scenarioService.getDashScenarios(query)
          .then(function(data) {
            if(data.scenarios){

              switch (query.page) {
                case 'feed':
                  if(data.scenarios.length === 0){
                    $scope.messages.no_following = true;
                  }
                  break;
                case 'drafts':
                  $scope.drafts_count = data.scenarios.length;
                  if(data.scenarios.length === 0){
                    $scope.messages.no_drafts = true;
                  }
                  break;
                case 'published':
                  if(data.scenarios.length === 0){
                    $scope.messages.no_published = true;
                  }
                  break;
                case 'favorites':
                  if(data.scenarios.length === 0){
                    $scope.messages.no_favorites = true;
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

      function getNotifications(limit){

        $scope.notifications_loading_animation = true;

        var params = {
          user: {
            _id: $rootScope.user._id
          }
        };

        if(typeof limit != 'undefined'){
          params.limit = limit;
        }

        userService.getNotifications(params)
          .then(function(data) {
            if(data.notifications){
              $scope.notifications = data.notifications;
              $scope.notifications_loading_animation = undefined;
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
                    $scope.users_list[j].following = 'following';
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

      $scope.getAllNotifications = function(){
        getNotifications();
      };

      $scope.getLatestNotifications = function(){
        getNotifications(notification_limit);
      };

    } // DashboardController end
}());
