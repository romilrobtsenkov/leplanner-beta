(function() {
  'use strict';

  angular
    .module('app')
    .controller('EditController', ['$scope','$rootScope','$timeout','$routeParams','$location','requestService',
    function($scope,$rootScope,$timeout,$routeParams,$location,requestService) {

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

          requestService.post('/api/scenario/get-edit-data-single-scenario', params)
          .then(function(data) {

            if(data.scenario && data.materials){
              //console.log(data.scenario);

              $scope.scenario = data.scenario;
              $rootScope.title = 'Edit scenario: '+$scope.scenario.name+' canvas';
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
                $scope.errorMessage = 'No such scenario found, check URL!';
              }else if(typeof data.error.id !== 'undefined' && data.error.id === 3){
                //no rights
                $location.path('/');
              }else{
                $scope.errorMessage = 'No such scenario found, check URL!';
              }
              console.log(data.error);
            }
          });
      }

      function loadMetaData(){

        requestService.get('/api/meta/get-scenario-meta')
        .then(function(data) {

          if(data.subjects && data.activity_organization && data.involvement_options && data.displays){
            $scope.subjects = data.subjects;
            $scope.activity_organization = data.activity_organization;
            $scope.involvement_options = data.involvement_options;
            $scope.displays_list = data.displays;

            $scope.fully_loaded = true;

          }else{
            $scope.errorMessage = 'Please try reloading the page';
          }

          if(data.error){
            console.log(data.error);
            $scope.errorMessage = 'Please try reloading the page';
          }
        });

      }

      $scope.openAddMaterialModal = function(a, top){

        $scope.activity = a;

        $scope.whois_material = 'Student';
        $scope.material_position = 'bottom';
        if(top === true){
          $scope.whois_material = 'Teacher';
          $scope.material_position = 'top';
        }
        $scope.material = {};
        $scope.material.involvement_level =  0;

        $scope.manageModal('show');
      };

      $scope.openEditMaterialModal = function(a, top, material){

        $scope.activity = a;

        $scope.whois_material = 'Student';
        $scope.material_position = 'bottom';
        if(top === true){
          $scope.whois_material = 'Teacher';
          $scope.material_position = 'top';
        }
        $scope.material = material;

        $scope.manageModal('show');
      };

      // making possible to launch direcetive fn
      $scope.setManageFunction = function(directiveFn) {
        $scope.manageModal = directiveFn.theDirFn;
      };
      $scope.setReDrawFunction = function(directiveFn) {
        $scope.reDraw = directiveFn.theDirFn;
      };

      $scope.deleteMaterial = function(id){

        var del = confirm('Do you really want to delete this material?');

        if(del !== true){ return; }

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          scenario: {
            _id: $scope.scenario_id
          },
          material: {
            _id: id
          }
        };

        $scope.deleting_material = true;

        requestService.post('/api/scenario/delete-material', params)
        .then(function(data) {

          // enable save button
          $scope.deleting_material = undefined;

          if(data.material){
            console.log('deleted');
            // replace updated material
            updateMaterialList(data.material, 'delete');
            $scope.manageModal('hide');
          }

          if(data.error){
            console.log(data.error);
            switch (data.error.id) {
              case 100:
                // user changed
                $location.path('/');
                break;
              default:
                $scope.materialErrorMessage = 'Unknown error';
            }

            $timeout(function() { $scope.materialErrorMessage = null; }, 2000);

          }
        });
      };

      $scope.saveMaterial = function(){

        var action = 'update';
        if(typeof $scope.material._id == 'undefined'){
          action = 'new';
        }

        $scope.material.activity_id = $scope.activity._id;
        $scope.material.position =$scope.material_position;

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          scenario: {
            _id: $scope.scenario_id
          },
          material: $scope.material
        };

        $scope.saving_material = true;

        requestService.post('/api/scenario/save-material', params)
        .then(function(data) {

          // enable save button
          $scope.saving_material = undefined;

          if(data.material){
            console.log('saved');
            // replace updated material
            updateMaterialList(data.material, action);
            $scope.manageModal('hide');
          }

          if(data.error){
            console.log(data.error);
            switch (data.error.id) {
              case 100:
                // user changed
                $location.path('/');
                break;
              case 0:
                $scope.materialErrorMessage = 'Material name can not be empty';
                break;
              case 1:
                $scope.materialErrorMessage = 'Material url can not be empty';
                break;
              /*case 2:
                $scope.materialErrorMessage = 'Conveyor name can not be empty';
                break;
              case 3:
                $scope.materialErrorMessage = 'Conveyor url can not be empty';
                break;
              case 4:
                $scope.materialErrorMessage = 'Display can not be empty';
                break;*/
              case 20:
                $scope.materialErrorMessage = 'Material exists try reloading the page';
                break;
              default:
                $scope.materialErrorMessage = 'Unknown error';
            }

            $timeout(function() { $scope.materialErrorMessage = null; }, 2000);

          }
        });
      };

      var updateMaterialList = function(new_material, action){

        if(action == 'new'){
          $scope.materials.push(new_material);
          updateActivityList();
          $scope.reDraw();
          return;
        }

        if(action == 'delete'){
          console.log(new_material._id);
          console.log($scope.materials.length);
          var index = null;
          for(var i = 0; i < $scope.materials.length; i++){
            if($scope.materials[i]._id == new_material._id){
              index = i;
              break;
            }
          }

          $scope.materials.splice(index, 1);
          updateActivityList();
          $scope.reDraw();

          console.log($scope.materials.length);

        }


        if(action == 'update'){
          for(var j = 0; j < $scope.materials.length; j++){
            if($scope.materials[j]._id == new_material._id){
              $scope.materials[j] = new_material;
              break;
            }
          }

          updateActivityList();
          $scope.reDraw();
        }

      };

      var updateActivityList = function(){
        // add material to relevant activities
        for(var i = 0; i < $scope.activity_list.length; i++){

          // empty materials
          $scope.activity_list[i].materials = undefined;

          for(var j = 0; j < $scope.materials.length; j++){
            if($scope.activity_list[i]._id == $scope.materials[j].activity_id){
              if(typeof $scope.activity_list[i].materials == 'undefined'){
                $scope.activity_list[i].materials = [];
              }
              $scope.activity_list[i].materials.push($scope.materials[j]);
            }
          }
        }

      };


  }]); //EditController end
}());
