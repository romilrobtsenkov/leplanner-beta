(function() {
    'use strict';

    angular
    .module('app')
    .controller('UserController', ['$scope','$rootScope','$location','$routeParams','requestService','$window','$translate',
    function($scope,$rootScope,$location, $routeParams,requestService, $window, $translate) {

        if($routeParams.id){
            $scope.get_profile_id = $routeParams.id;
        }else{
            $location.path('/');
        }

        if(!$rootScope.sort_tab){
            $rootScope.sort_tab = {};
        }else if(!$rootScope.sort_tab.profile) {
            $rootScope.sort_tab.profile = 'latest';
        }

        $scope.sidebox_quantity = {
            followings: 8,
            followers: 8,
        };

        $scope.pagination = {
            current: 1
        };
        $scope.total_count = 0;

        // INIT
        getUserData();

        function getUserData(){

            requestService.get('/users/single/' + $scope.get_profile_id)
            .then(function(data) {

                getSingleUserScenarios();

                //console.log(data);
                $scope.profile = data.profile;
                $rootScope.title = data.profile.first_name+' '+data.profile.last_name+' | Leplanner beta';

                /* ANALYTICS */
                $window.ga('send', 'pageview', {
                    'page': $location.path(),
                    'title': $rootScope.title
                });

                //check if user is following
                if(!$rootScope.user || !data.followers){
                    $scope.is_following = false;
                } else {
                    for(var i = 0; i < data.followers.length; i++){
                        if($rootScope.user._id === data.followers[i].follower._id){
                            // following user
                            $scope.is_following = true;
                            break;
                        }
                    }
                }

                if(data.following){
                    $scope.followings = data.following;
                }
                if(data.followers){
                    $scope.followers = data.followers;
                }
            })
            .catch(function (error) {
                $scope.no_user = true;
                console.log(error);
            });
        }

        function getSingleUserScenarios(){

            $scope.loading_animation = true;
            $scope.no_scenarios = false;
            $scope.scenarios = [];

            // fix negative page nr
            var CorrectedPage = $scope.pagination.current >= 1 ? $scope.pagination.current : 1;

            var q = {};
            q.page = CorrectedPage;

            if(!$rootScope.sort_tab.profile){
                $rootScope.sort_tab.profile = 'latest';
            }

            switch ($rootScope.sort_tab.profile) {
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

            requestService.get('/scenarios/user/' + $scope.get_profile_id, q)
            .then(function(data) {

                $scope.loading_animation = false;

                if(data.scenarios.length === 0){
                    $scope.no_scenarios = true;
                    return;
                }
                $scope.scenarios = data.scenarios;
                $scope.total_count = data.count;

                for(var j = 0; j < $scope.scenarios.length; j++){
                    //translating subjects
                    for(var a = 0; a < $scope.scenarios[j].subjects.length; a++){
                        $scope.scenarios[j].subjects[a].name = $scope.scenarios[j].subjects[a]["name_"+$translate.use()];
                    }
                }

            })
            .catch(function (error) {
                console.log(error);
            });

        }

        function followerExists(follower) {
            if(!$scope.followers){ return false; }
            for(var i = 0; i < $scope.followers.length; i++){
                if($scope.followers[i]._id === follower._id){
                    return i;
                }
            }
        }

        $scope.addFollow = function(){

            requestService.post('/followers/' + $scope.get_profile_id)
            .then(function(follower) {
                $scope.is_following = true;
                // add to list
                if(!followerExists(follower)){
                    if(!$scope.followers){ $scope.followers = []; }
                    $scope.followers.push(follower);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        };

        $scope.removeFollow = function(){

            requestService.post('/followers/remove/' + $scope.get_profile_id)
            .then(function(follower) {
                $scope.is_following = false;

                // remove from list
                var index;
                if((index = followerExists(follower)) >= 0){
                    $scope.followers.splice( index, 1 );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        };

        $scope.isSortActive = function(tab){
            if(tab === $rootScope.sort_tab.profile){ return true; }
            return false;
        };

        $scope.expandSideBox = function(box_name){
            switch (box_name) {
                case 'followings':
                    $scope.sidebox_quantity.followings = undefined;
                    break;
                case 'followers':
                    $scope.sidebox_quantity.followers = undefined;
                    break;
                default:
                console.log('no name');
            }
        };

        $scope.updateSortList = function(tab){
            if(tab === 'latest ' || tab === 'popular' || tab === 'favorited' || tab === 'commented'){
                $rootScope.sort_tab.profile = tab;
            }else{
                $rootScope.sort_tab.profile = 'latest';
            }

            $scope.pageChanged(1);
        };

        $scope.pageChanged = function(new_page_nr) {
            $scope.pagination.current = new_page_nr;
            getSingleUserScenarios();
            document.body.scrollTop = 0;
        };

    }]); // UserController end
}());
