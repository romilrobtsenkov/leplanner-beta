(function() {
    'use strict';

    angular
    .module('app')
    .controller('EditController', ['$scope','$rootScope','$timeout','$routeParams','$location','requestService','$translate','$window',
    function($scope,$rootScope,$timeout,$routeParams,$location,requestService,$translate,$window) {

        if(typeof $routeParams.id !== 'undefined'){
            $scope.scenario_id = $routeParams.id;
        }else{
            $location.path('/');
        }

        // META
        $scope.involvement_options = [];
        $scope.displays_list = [];
        $scope.conveyor_list = [];

        $scope.whois_material = '';
        $scope.activity = null;

        //for timeline - show/hide edit buttons
        $scope.allow_edit = true;

        init();

        function init(){

            requestService.post('/scenarios/single-edit/' + $scope.scenario_id)
            .then(function(data) {

                console.log('Loaded scenario');
                $scope.scenario = data.scenario;

                //translate activities and displays
                for (var i = 0; i < $scope.scenario.activities.length; i++) {
                    //translate activity organization
                    $scope.scenario.activities[i].activity_organization.name = $rootScope.translated.organization[$scope.scenario.activities[i].activity_organization._id];

                    if(!$scope.scenario.activities[i].materials ) { continue; }
                    for (var m = 0; m < $scope.scenario.activities[i].materials.length; m++) {
                        for (var d = 0; d < $scope.scenario.activities[i].materials[m].displays.length; d++) {
                            //translate display name
                            $scope.scenario.activities[i].materials[m].displays[d].name = $rootScope.translated.displays[$scope.scenario.activities[i].materials[m].displays[d]._id];
                        }
                        //involvement_level
                        $scope.scenario.activities[i].materials[m].involvement.name = $rootScope.translated.co_authorship[$scope.scenario.activities[i].materials[m].involvement._id];
                    }
                }

                $translate('PAGE.EDIT').then(function (t) {
                    $rootScope.title = t+' '+$scope.scenario.name+' canvas';

                    /* ANALYTICS */
                    $window.ga('send', 'pageview', {
                        'page': $location.path(),
                        'title': $rootScope.title
                    });
                });

                loadMetaData();
            })
            .catch(function (error) {
                console.log(error);

                $translate('NOTICE.NO_SCENARIO').then(function (t) {
                    $scope.errorMessage = t;
                });
            });
        }

        function loadMetaData(){

            requestService.get('/meta/scenario')
            .then(function(data) {

                $scope.subjects = data.subjects;
                $scope.activity_organization = data.activity_organization;
                $scope.involvement_options = data.involvement_options;
                $scope.displays_list = data.displays;

                //load translations
                if($rootScope.translated && $rootScope.translated.organization){
                    for(var i = 0; i < $scope.activity_organization.length; i++){
                        $scope.activity_organization[i].name = $rootScope.translated.organization[i];
                    }
                }
                if($rootScope.translated && $rootScope.translated.co_authorship){
                    for(var j = 0; j < $scope.involvement_options.length; j++){
                        $scope.involvement_options[j].name = $rootScope.translated.co_authorship[j];
                    }
                }
                if($rootScope.translated && $rootScope.translated.displays){
                    for(var k = 0; k < $scope.displays_list.length; k++){
                        $scope.displays_list[k].name = $rootScope.translated.displays[k];
                    }
                }

                $scope.fully_loaded = true;
            })
            .catch(function (error) {
                console.log(error);
                //$scope.errorMessage = 'Please try reloading the page';
                $translate('NOTICE.RELOAD').then(function (t) {
                    $scope.errorMessage = t;
                });
            });

        }

        $scope.openAddMaterialModal = function(a, pos){

            $scope.activity = a;

            $scope.whois_material = 'Student';
            $scope.material_position = 'bottom';
            if(pos === 'top'){
                $scope.whois_material = 'Teacher';
                $scope.material_position = 'top';
            }
            $scope.material = {};
            $scope.material.involvement_level =  0;

            $scope.displays_selection = [];

            //empty conveyor on empty material
            $scope.material.conveyors = [
                {name: null, url: null},
            ];

            $scope.manageModal('show');
        };

        $scope.openEditMaterialModal = function(a, pos, material){

            $scope.activity = a;

            $scope.whois_material = 'Student';
            $scope.material_position = 'bottom';
            if(pos === 'top'){
                $scope.whois_material = 'Teacher';
                $scope.material_position = 'top';
            }
            $scope.material = material;

            $scope.displays_selection = [];
            for(var i = 0; i < material.displays.length; i++){
                $scope.displays_selection[material.displays[i]._id] = true;
            }

            // empty conveyor add empty one
            if($scope.material.conveyors.length === 0){
                $scope.material.conveyors = [
                    {name: null, url: null},
                ];
            }

            $scope.manageModal('show');
        };

        // making possible to launch directive fn
        $scope.setManageFunction = function(directiveFn) {
            $scope.manageModal = directiveFn.theDirFn;
        };
        $scope.setreDrawMaterialFunction = function(directiveFn) {
            $scope.reDrawMaterial = directiveFn.theDirFn;
        };

        /* FIXED */
        $scope.deleteMaterial = function(id){

            var del = window.confirm($rootScope.translated.confirm);
            if (!del) { return; }

            var params = {
                scenario: { _id: $scope.scenario_id },
            };

            $scope.deleting_material = true;

            requestService.post('/materials/delete/' + id, params)
            .then(function(data) {

                console.log('deleted');
                // enable delete button
                $scope.deleting_material = undefined;

                // remove material
                updateMaterialList(data.material, 'delete');
                $scope.manageModal('hide');
            })
            .catch(function (error) {
                console.log(error);
                $scope.deleting_material = undefined;
                // 'Unknown error';
                $translate('NOTICE.UNKNOWN').then(function (t) { $scope.materialErrorMessage = t; });
                $timeout(function() { $scope.materialErrorMessage = null; }, 2000);
            });
        };

        /* FIXED */
        $scope.saveMaterial = function(){

            if(!$scope.material.material_name || $scope.material.material_name.length === 0){
                $translate('NOTICE.MATERIAL_NAME_REQUIRED').then(function (t) { $scope.materialErrorMessage = t; });
                $timeout(function() { $scope.materialErrorMessage = null; }, 2000);
                return;
            }

            $scope.saving_material = true;

            // switch url and state depending on action - new / update
            var url = '/materials';
            var action = 'new';
            if($scope.material._id){
                action = 'update';
                url = '/materials/' + $scope.material._id;
            }

            $scope.material.activity_id = $scope.activity._id;
            $scope.material.position =$scope.material_position;

            //rearrange displays
            var temp_arr = [];
            for(var i = 0; i < $scope.displays_list.length; i++){
                //if checked then true
                if($scope.displays_selection[$scope.displays_list[i]._id]){
                    temp_arr.push($scope.displays_list[i]._id);
                }
            }
            $scope.material.displays = temp_arr;

            //clean empty conveyors
            for(var j = 0; j < $scope.material.conveyors.length; j++){
                //if both name and url empty
                if(!$scope.material.conveyors[j].name && !$scope.material.conveyors[j].url){
                    $scope.material.conveyors.splice(j, 1);
                }
            }

            var params = {
                scenario: { _id: $scope.scenario_id },
                material: $scope.material,
            };

            requestService.post(url, params)
            .then(function(data) {

                console.log('saved');
                // enable save button
                $scope.saving_material = undefined;

                if($scope.material.conveyors.length === 0){
                    $scope.material.conveyors = [ {name: null, url: null} ];
                }

                // replace saved/updated material
                updateMaterialList(data.material, action);
                $scope.manageModal('hide');

            })
            .catch(function (error) {
                console.log(error);
                $scope.saving_material = undefined;

                if($scope.material.conveyors.length === 0){
                    $scope.material.conveyors = [ {name: null, url: null} ];
                }

                switch (error.status) {
                    case 400:
                        // 'Material exists try reloading the page';
                        $translate('NOTICE.MATERIAL_EXISTS').then(function (t) { $scope.materialErrorMessage = t; });
                        $timeout(function() { $scope.materialErrorMessage = null; }, 2000);
                        break;
                    default:
                        // 'Unknown error'
                        $translate('NOTICE.UNKNOWN').then(function (t) { $scope.materialErrorMessage = t; });
                        $timeout(function() { $scope.materialErrorMessage = null; }, 2000);
                }
            });

        };

        var updateMaterialList = function(newMaterial, action){

            // NEW
            if(action === 'new'){

                // translate
                for (var d = 0; d < newMaterial.displays.length; d++) {
                    //translate display name
                    newMaterial.displays[d].name = $rootScope.translated.displays[newMaterial.displays[d]._id];
                }
                //translate involvement_level
                newMaterial.involvement.name = $rootScope.translated.co_authorship[newMaterial.involvement._id];

                for (var i = 0; i < $scope.scenario.activities.length; i++) {
                    if ($scope.scenario.activities[i]._id === newMaterial.activity_id) {

                        if (!$scope.scenario.activities[i].materials) { $scope.scenario.activities[i].materials = []; }

                        $scope.scenario.activities[i].materials.push(newMaterial);
                        break;
                    }
                }

                $scope.reDrawMaterial('new');

                return;
            }

            // DELETE
            if(action === 'delete'){

                var activity_index = null;
                var material_index = null;

                // find correct activty with material
                for (var j = 0; j < $scope.scenario.activities.length; j++) {
                    if ($scope.scenario.activities[j]._id === newMaterial.activity_id) {

                        for(var k = 0; k < $scope.scenario.activities[j].materials.length; k++){
                            if($scope.scenario.activities[j].materials[k]._id === newMaterial._id){
                                activity_index = j;
                                material_index = k;
                                break;
                            }
                        }

                        break;
                    }
                }

                $scope.scenario.activities[activity_index].materials.splice(material_index, 1);
                $scope.reDrawMaterial('delete', newMaterial._id);

                return;
            }

            // UPDATE
            if(action === 'update'){

                // translate
                for (var m = 0; m < newMaterial.displays.length; m++) {
                    //translate display name
                    newMaterial.displays[m].name = $rootScope.translated.displays[newMaterial.displays[m]._id];
                }
                //translate involvement_level
                newMaterial.involvement.name = $rootScope.translated.co_authorship[newMaterial.involvement._id];

                for(var a = 0; a < $scope.scenario.activities.length; a++){

                    if ($scope.scenario.activities[a]._id === newMaterial.activity_id) {
                        for(var l = 0; l < $scope.scenario.activities[a].materials.length; l++){
                            if($scope.scenario.activities[a].materials[l]._id === newMaterial._id){
                                $scope.scenario.activities[a].materials[l] = newMaterial;
                                break;
                            }
                        }

                        break;
                    }
                }

                $scope.reDrawMaterial('update', newMaterial._id);

                return;
            }
        };

        $scope.addNewActivityItem = function(){
            $scope.material.conveyors.push({name: null, url: null});
        };

        $scope.removeActivityItem = function(index){
            $scope.material.conveyors.splice(index, 1);
        };

    }]); //EditController end
}());
