(function() {
    'use strict';

    angular
    .module('app')
    .controller('TagsController', ['$scope','$rootScope','$location','$routeParams','requestService','$window','$translate',
    function($scope,$rootScope,$location, $routeParams,requestService,$window,$translate) {

        if(typeof $routeParams.tag !== 'undefined'){
            $scope.get_tag = $routeParams.tag;
        }else{
            $location.path('/');
        }

        if(typeof $rootScope.sort_tab === 'undefined'){
            $rootScope.sort_tab = {};
        }else if(typeof $rootScope.sort_tab.tag === 'undefined') {
            $rootScope.sort_tab.tag = 'latest';
        }

        getSingleTagScenarios();

        function getSingleTagScenarios(){

            $rootScope.title = '#'+$scope.get_tag+' | Leplanner beta';

            /* ANALYTICS */
            $window.ga('send', 'pageview', {
              'page': $location.path(),
              'title': $rootScope.title
            });

            $scope.loading_animation = true;
            $scope.no_scenarios = false;
            $scope.scenarios = [];

            var q = {};

            q.tag = {text: $scope.get_tag};

            if(typeof $rootScope.sort_tab.tag == 'undefined'){
                $rootScope.sort_tab.tag = 'latest';
            }

            switch ($rootScope.sort_tab.tag) {
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


            requestService.post('/scenario/tag', q)
            .then(function(data) {
                console.log(data);
                if(data.scenarios){
                    if(data.scenarios.length === 0){
                        $scope.no_scenarios = true;
                    }
                    $scope.scenarios = data.scenarios;

                    for(var j = 0; j < $scope.scenarios.length; j++){
                        //translating subjects
                        for(var a = 0; a < $scope.scenarios[j].subjects.length; a++){
                            $scope.scenarios[j].subjects[a].name = $scope.scenarios[j].subjects[a]["name_"+$translate.use()];
                        }
                    }

                    $scope.loading_animation = false;
                }

                if(data.error){
                    console.log(data.error);
                }
            });

        }

        $scope.isSortActive = function(tab){
            if(tab == $rootScope.sort_tab.tag){ return true; }
            return false;
        };

        $scope.updateSortList = function(tab){
            if(tab == 'latest ' || tab == 'popular' || tab == 'favorited' || tab == 'commented'){
                $rootScope.sort_tab.tag = tab;
                getSingleTagScenarios();
            }else{
                $rootScope.sort_tab.tag = 'latest';
                getSingleTagScenarios();
            }
        };

    }]); // UserController end
}());
