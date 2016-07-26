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

        $scope.outcomes_list = [];
        $scope.activity_list = [];
        $scope.materials = [];
        $scope.involvement_options = [];
        $scope.displays_list = [];
        $scope.conveyor_list = [];

        $scope.whois_material = '';
        $scope.activity = null;

        //for canvas - show/hide edit possibilities
        $scope.allow_edit = true;

        init();

        function init(){

            var params = {
                user: {
                    _id: $rootScope.user._id
                },
                scenario: {
                    _id: $scope.scenario_id
                }
            };

            requestService.post('/scenario/get-edit-data-single-scenario', params)
            .then(function(data) {

                if(data.scenario && data.materials){
                    //console.log(data.scenario);

                    $scope.scenario = data.scenario;
                    $translate('PAGE.EDIT').then(function (t) {
                        $rootScope.title = t+' '+$scope.scenario.name+' canvas';

                        /* ANALYTICS */
                        $window.ga('send', 'pageview', {
                            'page': $location.path(),
                            'title': $rootScope.title
                        });
                    });
                    console.log('Loaded scenario');

                    if(typeof data.scenario.outcomes !== 'undefined'){
                        $scope.outcomes_list = data.scenario.outcomes;
                        console.log('Loaded outcomes');
                    }

                    if(typeof data.scenario.activities !== 'undefined'){
                        $scope.activity_list = data.scenario.activities;
                        console.log('Loaded activities');
                    }
                    if(typeof data.materials !== 'undefined'){
                        $scope.materials = data.materials;

                        updateActivityList();
                        //console.log($scope.activity_list);
                        console.log('Loaded materials');
                    }

                    loadMetaData();
                }

                if(data.error){
                    if(typeof data.error.id !== 'undefined' && data.error.id === 0){
                        //$scope.errorMessage = 'No such scenario found, check URL!';
                        $translate('NOTICE.NO_SCENARIO').then(function (t) {
                            $scope.errorMessage = t;
                        });
                    }else if(typeof data.error.id !== 'undefined' && data.error.id === 3){
                        //no rights
                        $location.path('/');
                    }else{
                        //$scope.errorMessage = 'No such scenario found, check URL!';
                        $translate('NOTICE.NO_SCENARIO').then(function (t) {
                            $scope.errorMessage = t;
                        });
                    }
                    console.log(data.error);
                }
            });
        }

        function loadMetaData(){

            requestService.get('/meta/get-scenario-meta')
            .then(function(data) {

                if(data.subjects && data.activity_organization && data.involvement_options && data.displays){
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

                }else{
                    //$scope.errorMessage = 'Please try reloading the page';
                    $translate('NOTICE.RELOAD').then(function (t) {
                        $scope.errorMessage = t;
                    });
                }

                if(data.error){
                    console.log(data.error);
                    //$scope.errorMessage = 'Please try reloading the page';
                    $translate('NOTICE.RELOAD').then(function (t) {
                        $scope.errorMessage = t;
                    });
                }
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
            //console.log(material.displays);

            for(var i = 0; i < material.displays.length; i++){
                $scope.displays_selection[material.displays[i]] = true;
            }

            // empty conveyor add empty one
            if($scope.material.conveyors.length === 0){
                $scope.material.conveyors = [
                    {name: null, url: null},
                ];
            }

            $scope.manageModal('show');
        };

        // making possible to launch direcetive fn
        $scope.setManageFunction = function(directiveFn) {
            $scope.manageModal = directiveFn.theDirFn;
        };
        $scope.setreDrawMaterialFunction = function(directiveFn) {
            $scope.reDrawMaterial = directiveFn.theDirFn;
        };

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

        var updateMaterialList = function(new_material, action){

            if(action === 'new'){
                $scope.materials.push(new_material);
                updateActivityList();
                $scope.reDrawMaterial('new');
                return;
            }

            if(action === 'delete'){
                console.log(new_material._id);
                console.log($scope.materials.length);
                var index = null;
                for(var i = 0; i < $scope.materials.length; i++){
                    if($scope.materials[i]._id === new_material._id){
                        index = i;
                        break;
                    }
                }

                $scope.materials.splice(index, 1);
                updateActivityList();
                $scope.reDrawMaterial('delete', new_material._id);
                //console.log($scope.materials.length);

            }


            if(action === 'update'){
                for(var j = 0; j < $scope.materials.length; j++){
                    if($scope.materials[j]._id === new_material._id){
                        $scope.materials[j] = new_material;
                        break;
                    }
                }

                updateActivityList();
                $scope.reDrawMaterial('update', new_material._id);
            }

        };

        var updateActivityList = function(){
            // add material to relevant activities
            for(var i = 0; i < $scope.activity_list.length; i++){

                // empty materials
                $scope.activity_list[i].materials = undefined;

                for(var j = 0; j < $scope.materials.length; j++){
                    if($scope.activity_list[i]._id === $scope.materials[j].activity_id){
                        if(typeof $scope.activity_list[i].materials === 'undefined'){
                            $scope.activity_list[i].materials = [];
                        }
                        $scope.activity_list[i].materials.push($scope.materials[j]);
                    }
                }
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
