(function() {
    'use strict';

    angular
    .module('app')
    .controller('CreateController', ['$scope','$rootScope','$timeout','$location','requestService','$translate','$window', '$q',
    function($scope,$rootScope,$timeout,$location,requestService, $translate, $window, $q) {

        $translate('PAGE.CREATE').then(function (t) {
            $rootScope.title = t + ' | Leplanner beta';

            /* ANALYTICS */
            $window.ga('send', 'pageview', {
                'page': $location.path(),
                'title': $rootScope.title
            });
        });

        $scope.createScenario = function(scenario){

            $scope.saving_in_progress = true;

            if(!scenario || !scenario.name || scenario.name.length <= 2){
                // 'Scenario name has to be atleast 3 chars long!';
                $translate('NOTICE.SCENARIO_NAME_LONG').then(function (t) {
                    $scope.errorMessage = t;
                });
                $scope.saving_in_progress = undefined;
                $timeout(function() { $scope.errorMessage = null; }, 2000);
                return;
            }

            if(!scenario.description || scenario.description.length <= 2){
                // 'Scenario description has to be atleast 3 chars long!';
                $translate('NOTICE.SCENARIO_DESC_LONG').then(function (t) {
                    $scope.errorMessage = t;
                });
                $scope.saving_in_progress = undefined;
                $timeout(function() { $scope.errorMessage = null; }, 2000);
                return;
            }

            // By default scenario language is the UI language
            if($translate.use()){
                scenario.language = $translate.use();
            }

            var params = {
                scenario: scenario
            };

            $scope.saving = true;

            requestService.post('/scenarios/', params)
            .then(function(data) {

                $scope.errorMessage = null;

                $location.path('/edit/' + data._id);
            })
            .catch(function (error) {
                $scope.saving_in_progress = undefined;
                console.log(error);
                //$scope.errorMessage = 'Unknown error';
                $translate('NOTICE.UNKNOWN').then(function (t) {
                    $scope.errorMessage = t;
                });

                $timeout(function() { $scope.errorMessage = null; }, 2000);
            });

        };

    }]); // CreateController
}());
