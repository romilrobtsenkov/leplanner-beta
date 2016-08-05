(function() {
    'use strict';

    angular
    .module('app')
    .controller('TagsController', ['$scope','$rootScope','$location','$routeParams','requestService','$window','$translate',
    function($scope,$rootScope,$location, $routeParams,requestService,$window,$translate) {

        if($routeParams.tag){
            $scope.get_tag = $routeParams.tag;
        }else{
            $location.path('/');
        }

        if(!$rootScope.sort_tab){
            $rootScope.sort_tab = {};
        }else if(!$rootScope.sort_tab.tag) {
            $rootScope.sort_tab.tag = 'latest';
        }

        $scope.pagination = {
            current: 1
        };
        $scope.total_count = 0;

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

            // fix negative page nr
            var CorrectedPage = $scope.pagination.current >= 1 ? $scope.pagination.current : 1;

            var q = {};
            q.tag = $scope.get_tag;
            q.page = CorrectedPage;

            if(!$rootScope.sort_tab.tag){
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

            requestService.get('/scenarios/tag', q)
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

        $scope.isSortActive = function(tab){
            if(tab === $rootScope.sort_tab.tag){ return true; }
            return false;
        };

        $scope.updateSortList = function(tab){
            if(tab === 'latest ' || tab === 'popular' || tab === 'favorited' || tab === 'commented'){
                $rootScope.sort_tab.tag = tab;
            }else{
                $rootScope.sort_tab.tag = 'latest';
            }

            $scope.pageChanged(1);
        };

        $scope.pageChanged = function(new_page_nr) {
            $scope.pagination.current = new_page_nr;
            getSingleTagScenarios();
            document.body.scrollTop = 0;
        };

    }]); // UserController end
}());
