(function() {
  'use strict';

  angular
    .module('app')
    .directive('scenariocanvas', scenariocanvas);

    scenariocanvas.$inject = ['$routeParams','$timeout','$window','$filter'];

    function scenariocanvas ($routeParams,$timeout,$window,$filter) {
      return {
  			restrict: 'E',
        templateUrl: 'js/app/directives/canvas/canvas.html',
  			link: function postLink($scope, element, attrs) {
          // favicon
          //http://www.google.com/s2/favicons?domain=twitter.com
          var scroll = false;

          var COLOR_IN_CLASS = 'rgb(204, 255, 204)';
          var COLOR_OFF_CLASS = 'rgb(255, 144, 144)';

          /*
		  
		   var COLOR_IN_CLASS = 'rgb(112,207,250)';
          var COLOR_OFF_CLASS = 'rgb(255,249,115)';
		  
		  uued 254
		  245 
		  52

          //apple blue & yellow
          var COLOR_IN_CLASS = 'rgb(90,200,250)';
          var COLOR_OFF_CLASS = 'rgb(255,204,0)';

          keep blue http://noseyparka.me.uk/2014/01/26/google-keep-pallete/
          keep yellow
          var COLOR_IN_CLASS = 'rgb(133,214,228)';
          var COLOR_OFF_CLASS = 'rgb(241,241,78)';


          blue green combo
          var COLOR_IN_CLASS = 'rgb(204, 255, 204)';
          var COLOR_OFF_CLASS = 'rgb(203, 239, 251)';
          */

          /*
          yellow green combo
          var COLOR_IN_CLASS = 'rgb(255, 255, 153)';
          var COLOR_OFF_CLASS = 'rgb(204, 255, 204)';
          */

          /*
          yellow blue combo
          var COLOR_IN_CLASS = 'rgb(255, 255, 153)';
          var COLOR_OFF_CLASS = 'rgb(203, 239, 251)';
          */

          /*
          yellow oranz combo
          var COLOR_IN_CLASS = 'rgb(255, 255, 153)';
          var COLOR_OFF_CLASS = 'rgb(255, 204, 153)';
          */

          /*
          blue oranz combo
          var COLOR_IN_CLASS = 'rgb(255, 204, 153)';
          var COLOR_OFF_CLASS = 'rgb(203, 239, 251)';
          */

          /*
          blue combo
          var COLOR_IN_CLASS = 'rgb(153, 204, 255)';
          var COLOR_OFF_CLASS = 'rgb(203, 239, 251)';
          */

          var isTouch = !!('ontouchstart' in window);
          var point = {x: 0, y: 0};

    			var P_START = isTouch ? 'touchstart' : 'mousedown';
    			var P_MOVE = isTouch ? 'touchmove' : 'mousemove';
    			var P_END = isTouch ? 'touchend' : 'mouseup';

          var canvas = document.createElement('canvas');
          canvas.id = 'scenario-edit-canvas';
          var temp_canvas = document.createElement('canvas');
          temp_canvas.id = 'scenario-edit-canvas-tmp';
          var image = new Image();
          image.id = 'scenario-edit-canvas-image';

          angular.element(temp_canvas).css({
            position: 'absolute',
            top: 0,
            left: 0,
          });
          angular.element(image).css({
            display: 'none',
          });

          element.find('div').append(temp_canvas);
          element.find('div').append(canvas);
          element.find('div').append(image);

          //load organization images - one / pair / group
          var activity_organization_images = [];
          var one_icon_img = new Image();
          one_icon_img.src = './images/one.png';
          activity_organization_images.push(one_icon_img);
          var pair_icon_img = new Image();
          pair_icon_img.src = './images/pair.png';
          activity_organization_images.push(pair_icon_img);
          var group_icon_img = new Image();
          group_icon_img.src = './images/group.png';
          activity_organization_images.push(group_icon_img);
          // same icon for whole class
          activity_organization_images.push(group_icon_img);


          var LEPLANNER = {

          	WIDTH: 1920,
          	HEIGHT: 1080,
            scale: null,
          	canvas: null,
            temp_canvas: null,
            temp_canvas_cursor_pointer: false,
            image: null,
          	ctx: null,
            temp_ctx: null,
            activities: null,
            materials: null,
            activities_duration: null,
            activities_width: null,
            enlarged_activity: null,
            has_tooltip_drawn: null,
            add_material_button_radius: 50,
            edit: false,

          	init: function(){
              if(scroll === true){
                this.WIDTH = 5000;
              }

              this.canvas = canvas;
              this.temp_canvas = temp_canvas;
              this.image = image;
              this.activities = [];
              this.materials = [];
              this.activities_duration = $scope.scenario.activities_duration;

              this.canvas.width =  this.temp_canvas.width  = this.WIDTH;
              this.canvas.height = this.temp_canvas.height = this.HEIGHT;

              this.ctx = canvas.getContext('2d');
      				this.temp_ctx = temp_canvas.getContext('2d');
              this.resizeCanvas();
              this.Draw.clear(this.ctx);
              this.drawBaseLayer();

              //fix icon rendering on page load
              //console.log(one_icon_img);
              this.drawActivitiesAndMaterials();
              this.updateImageUrl();

          	},

            reDraw: function(){
              LEPLANNER.activities = [];
              LEPLANNER.materials = [];
              LEPLANNER.Draw.clear(LEPLANNER.ctx);
              LEPLANNER.drawBaseLayer();
              LEPLANNER.drawActivitiesAndMaterials();
              LEPLANNER.updateImageUrl();
            },

            resizeCanvas: function(){
              var canvas_wrapper = document.getElementById('scenario-canvas-wrapper');

              var style;

              if(scroll === true){
                style = {
                  width: this.WIDTH/1080*500,
                  height: "500px"
                };
                console.log(style);
                angular.element(canvas).css(style);
                angular.element(temp_canvas).css(style);
                angular.element(canvas_wrapper).css({
                  overflowX: "scroll"
                });
              }else{
                style = {
                  width: canvas_wrapper.offsetWidth
                };
                angular.element(canvas).css(style);
                angular.element(temp_canvas).css(style);

              }

              //!important scale
              this.scale = this.WIDTH/style.width;
            },

            updateImageUrl: function(){
              image.src = this.canvas.toDataURL("image/png");
            },

            drawBaseLayer: function(){

              //bg
              this.Draw.fillRect(this.ctx, 0, 0, LEPLANNER.WIDTH, LEPLANNER.HEIGHT, 'rgba(255,255,255,1)');

              //bg-border
              this.Draw.strokeRect(this.ctx, 0, 0, LEPLANNER.WIDTH, LEPLANNER.HEIGHT, 1, 'rgba(0,0,0,1)');


              //middle divider
              this.Draw.line(this.ctx, 0, this.HEIGHT/2, this.WIDTH, this.HEIGHT/2, 1, 'rgba(0,0,0,1)');

              // legend
              var legend_x = 30;
              var legend_y = LEPLANNER.HEIGHT-50;
              var legend_box = 20;

              this.Draw.fillRect(this.ctx, legend_x, legend_y, legend_box, legend_box, COLOR_IN_CLASS);
              this.Draw.text(this.ctx, 'tunnitegevus (in-class)', legend_x + legend_box*2-5, legend_y+legend_box-2, legend_box, 'rgba(0,0,0,1)');
              legend_x += 280;
              
              this.Draw.fillRect(this.ctx, legend_x, legend_y, legend_box, legend_box, COLOR_OFF_CLASS);
              this.Draw.text(this.ctx, 'muu (off-class)', legend_x + legend_box*2-5, legend_y+legend_box-2, legend_box, 'rgba(0,0,0,1)');
              
              // student/teacher
              //teacher up-top
              this.ctx.save();
              this.ctx.translate(50, 408);
              this.ctx.rotate(-Math.PI/2);
              this.Draw.text(this.ctx, 'õpetaja (teacher)', 0, 0, 30, 'rgba(0,0,0,1)');
              this.Draw.text(this.ctx, 'õpilane (student)', -500, 0, 30, 'rgba(0,0,0,1)');
              this.ctx.restore();
              //this.Draw.text(this.ctx, 'Student / Õpilane', legend_x + legend_box*2, legend_y+legend_box-2, 30, 'rgba(0,0,0,1)');

              //scenario name and author and date edited
              if(LEPLANNER.edit !== true){

                this.ctx.font = '30px Helvetica';
                var name_length = this.ctx.measureText($scope.scenario.name).width;

                this.Draw.text(this.ctx, $scope.scenario.name, LEPLANNER.WIDTH/2-name_length/2,  40, 30, 'rgba(0,0,0,1)');
                this.Draw.text(this.ctx, $scope.scenario.author.first_name+' '+$scope.scenario.author.last_name, 1595,  LEPLANNER.HEIGHT-30, 20, 'rgba(0,0,0,1)');
                this.Draw.text(this.ctx, $filter('date')($scope.scenario.last_modified, 'dd.MM.yyyy HH:mm'), 1420,  LEPLANNER.HEIGHT-30, 20, 'rgba(0,0,0,1)');
              }




            },

            drawActivitiesAndMaterials: function(){

              if($scope.activity_list.length === 0 ||
                ($scope.activity_list.length === 1 && $scope.activity_list[0].duration === 0)){
                this.Draw.text(this.ctx, 'Please add more activity (or duration)', 50*this.scale, 50*this.scale, 20*this.scale, 'rgba(0,0,0,1)');
                return;
              }

              var start_time = 0;
              var materials_index = 0;

              for(var i = 1; i <= $scope.activity_list.length; i++){

                var has_top_material = false;
                var has_bottom_material = false;

                //Activity materials
                if(typeof $scope.activity_list[i-1].materials != 'undefined'){
                  // draw materials
                  for(var j = 0; j < $scope.activity_list[i-1].materials.length; j++){
                    if($scope.activity_list[i-1].materials[j].position == 'top'){
                      has_top_material = materials_index;
                      materials_index++;
                    }else{
                      has_bottom_material = materials_index;
                      materials_index++;
                    }
                    var Material = new LEPLANNER.Material(i, start_time, $scope.activity_list[i-1].duration, $scope.activity_list[i-1].in_class, $scope.activity_list[i-1].materials[j]);
                    this.materials.push(Material);
                    Material.Draw();
                  }
                }

                //has material
                $scope.activity_list[i-1].has_top_material = has_top_material;
                $scope.activity_list[i-1].has_bottom_material = has_bottom_material;

                var Activity = new LEPLANNER.Activity(i, start_time, $scope.activity_list[i-1]);
                this.activities.push(Activity);
                Activity.Draw();

                start_time += $scope.activity_list[i-1].duration;
              }

            }

          };

          LEPLANNER.Activity = function(indent, start_time, data){

            this.indent = indent;
            this.start_time = start_time;
            this._id = data._id;
          	this.name = data.name;
          	this.duration = data.duration;
            if(typeof data.in_class == 'undefined'){
              this.in_class = false;
            }else{
              this.in_class = true;
            }
            this.organization = data.activity_organization._id;
            this.org_title = '';
            for(var i = 0; i < $scope.activity_organization.length; i++){
              if($scope.activity_organization[i]._id == this.organization){
                this.org_title = $scope.activity_organization[i].name_eng;
              }
            }
            this.org_image = activity_organization_images[this.organization];
            this.outcomes = data.outcomes;
            this.has_top_material = data.has_top_material;
            this.has_bottom_material = data.has_bottom_material;

            //for drawing
            this.padding = 10;
            this.height = 40;
            // - 20 is to give padding from left side
            var minute_constant = ((LEPLANNER.WIDTH-80-(($scope.activity_list.length+1)*this.padding))/LEPLANNER.activities_duration);
            this.x = parseInt(80+(minute_constant * this.start_time) + (this.indent* this.padding));
            this.y = parseInt(LEPLANNER.HEIGHT/2-this.height/2);
            this.width = parseInt(minute_constant * this.duration);

            //for enlarged drawing
            this.enlarged_x = null;
            this.enlarged_y = null;
            this.enlarged_width = null;
            this.enlarged_height = null;

          	this.Draw = function(){

              var class_color;
              if(this.in_class){
                // green
                class_color = COLOR_IN_CLASS;
              }else{
                class_color = COLOR_OFF_CLASS;
              }
              //draw box
              LEPLANNER.Draw.fillRect(LEPLANNER.ctx, this.x, this.y, this.width, this.height, class_color);
              LEPLANNER.Draw.strokeRect(LEPLANNER.ctx, this.x, this.y, this.width, this.height, 1, 'rgba(0,0,0,1)');

              //write duration
              var duration_font = 19;
              LEPLANNER.Draw.text(LEPLANNER.ctx, this.duration, this.x+duration_font/4, this.y+duration_font, duration_font, 'rgba(0,0,0,1)');

              //draw organizaticon - one / pair / group - if it fits to the box
              if(this.width > 50){
                LEPLANNER.Draw.imageIcon(LEPLANNER.ctx, this.org_image, this.x+this.width-32.5, this.y+this.height-32.5, 25);
              }

              //write name
              var name_font = 25;
              LEPLANNER.Draw.activityName(LEPLANNER.ctx, this.name, this.width-name_font-45, this.x+name_font+7, this.y+name_font+2, name_font, 'rgba(0,0,0,1)');

          	};

            this.EnlargeOne = function(){

              LEPLANNER.Draw.clear(LEPLANNER.temp_ctx);

              var class_color;
              if(this.in_class){
                // green
                class_color = COLOR_IN_CLASS;
              }else{
                class_color = COLOR_OFF_CLASS;
              }

              this.enlarged_width = this.width + 250;
              // min width
              if(this.enlarged_width < 250){
                this.enlarged_width = 250;
              }
              this.enlarged_height = this.height + 200;

              this.enlarged_x = parseInt(this.x-((this.enlarged_width-this.width) / 2));
              // fix outside of canvas
              if(this.enlarged_x < 5){ this.enlarged_x = 5; }
              if(this.enlarged_x+this.enlarged_width+5 > LEPLANNER.WIDTH){ this.enlarged_x = LEPLANNER.WIDTH-5-this.enlarged_width; }

              this.enlarged_y = this.y-100;

              // draw add or edit material buttons
              if(LEPLANNER.edit === true){
                if(typeof this.has_top_material != 'number'){
                  LEPLANNER.Draw.addMaterialButton(LEPLANNER.temp_ctx, this.enlarged_x+this.enlarged_width/2, this.enlarged_y, LEPLANNER.add_material_button_radius, 'rgba(255,255,255,1)', false);
                }else{
                  LEPLANNER.Draw.editMaterialButton(LEPLANNER.temp_ctx, this.enlarged_x+this.enlarged_width/2, this.enlarged_y, LEPLANNER.add_material_button_radius, 'rgba(255,255,255,1)', false);
                }
                if(typeof this.has_bottom_material != 'number'){
                  LEPLANNER.Draw.addMaterialButton(LEPLANNER.temp_ctx, this.enlarged_x+this.enlarged_width/2, this.enlarged_y+this.enlarged_height, LEPLANNER.add_material_button_radius, 'rgba(255,255,255,1)', true);
                }else{
                  LEPLANNER.Draw.editMaterialButton(LEPLANNER.temp_ctx, this.enlarged_x+this.enlarged_width/2, this.enlarged_y+this.enlarged_height, LEPLANNER.add_material_button_radius, 'rgba(255,255,255,1)', true);
                }
              }

              //draw box
              LEPLANNER.Draw.fillRect(LEPLANNER.temp_ctx, this.enlarged_x, this.enlarged_y, this.enlarged_width, this.enlarged_height, class_color);
              LEPLANNER.Draw.strokeRect(LEPLANNER.temp_ctx, this.enlarged_x, this.enlarged_y, this.enlarged_width, this.enlarged_height, 1, 'rgba(0,0,0,1)');

              //write name in lines
              var name_font = 25;
              var max_line_count = 5;
              var line_count = 0;
              var words = this.name.split(' ');
              var line = '';
              var y = this.enlarged_y+name_font+10;
              var lineHeight = name_font;
              //75 fixing overflow
              var maxWidth = this.enlarged_width-name_font-2;
              for(var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                // fix measureText
                LEPLANNER.temp_ctx.font = name_font+'px Helvetica';
                var metrics = LEPLANNER.temp_ctx.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > maxWidth && line_count < max_line_count-1) {
                  LEPLANNER.Draw.text(LEPLANNER.temp_ctx, line, this.enlarged_x+name_font-5, y, name_font, 'rgba(0,0,0,1)');
                  line = words[n] + ' ';
                  y += lineHeight;
                  line_count++;
                }
                else {
                  line = testLine;
                }

              }
              //if last line too long add (...)
              var text_width = LEPLANNER.temp_ctx.measureText(line).width;
              // count chars to leave
              if(text_width > maxWidth){
                var new_length = Math.floor((text_width-(text_width-maxWidth)) * (line.length) / text_width);
                // make also space for 3 ...
                line = line.slice(0, new_length-4);
                line += '...';
              }

              LEPLANNER.Draw.text(LEPLANNER.temp_ctx, line, this.enlarged_x+name_font-5, y, name_font, 'rgba(0,0,0,1)');

              //write duration
              var duration_font = 25;
              LEPLANNER.Draw.text(LEPLANNER.temp_ctx, this.duration+' min', this.enlarged_x+duration_font-5, this.enlarged_y+this.enlarged_height-duration_font-40, duration_font, 'rgba(0,0,0,1)');

              //draw organizaticon - one / pair / group
              LEPLANNER.Draw.imageIcon(LEPLANNER.temp_ctx, this.org_image, this.enlarged_x+15, this.enlarged_y+this.enlarged_height-50, 30);
              // + write out
              LEPLANNER.Draw.text(LEPLANNER.temp_ctx, this.org_title, this.enlarged_x+55, this.enlarged_y+this.enlarged_height-duration_font, duration_font, 'rgba(0,0,0,1)');

            };

          };

          LEPLANNER.Material = function(indent, start_time, duration, in_class, data){

            // temp workarounf for edititng purpose
            this.data = data;

            this.indent = indent;
            this.start_time = start_time;
            this.duration = duration;
            //console.log(data);
            this._id = data._id;
            this.in_class = in_class;
            this.display_name = null;

            //for drawing
            this.padding = 10;
            this.height = 60+(60*this.data.involvement_level);
            // - 80 to fix padding from left side
            var minute_constant = ((LEPLANNER.WIDTH-80-(($scope.activity_list.length+1)*this.padding))/LEPLANNER.activities_duration);
            this.x = parseInt(80+(minute_constant * this.start_time) + (this.indent* this.padding));
            // -20 to start from activity height
            if(this.data.position == 'top'){
              this.y = parseInt(LEPLANNER.HEIGHT/2-this.height-20);
            }else{
              this.y = parseInt(LEPLANNER.HEIGHT/2+20);
            }
            this.width = parseInt(minute_constant * this.duration);

            //for enlarged drawing
            this.needs_to_be_enlarged = null;

          	this.Draw = function(){

              var class_color;
              if(this.in_class){
                // green
                class_color = COLOR_IN_CLASS;
              }else{
                class_color = COLOR_OFF_CLASS;
              }


              //draw display
              var r = 25;
              var too_small_for_icon = false;
              if(this.width < 70){
                r = 10;
                too_small_for_icon = true;
                this.needs_to_be_enlarged = true;
              }

              var bottom = true;
              var display_y = this.y + this.height;
              if(this.data.position == 'top'){
                //console.log(this.data.position);
                display_y = this.y;
                bottom = false;
              }

              this.display_y = display_y;
              this.display_r = r*2;
              //console.log(this.data.display_id);

              if(this.data.display_id !== null && typeof this.data.display_id != 'undefined'){

                LEPLANNER.Draw.display(LEPLANNER.ctx, this.x+r, display_y, r, 'rgba(0,0,0,1)', bottom);

                //draw icon
                //console.log($scope.displays_list[this.data.display_id]);
                // var display_icon_hover_name = $scope.displays_list[this.data.display_id].name;
                var icon_size = 24;
                var display_icon = new Image();
                if(typeof $scope.displays_list[this.data.display_id] != 'undefined'){
                  display_icon.src = 'images/'+$scope.displays_list[this.data.display_id].icon;
                  if(this.data.display_id == $scope.displays_list.length-1){
                    this.display_name = this.data.other_display;
                  }else{
                    this.display_name = $scope.displays_list[this.data.display_id].name;
                  }

                  var d_x = this.x;
                  display_icon.onload = function() {
                    if(!too_small_for_icon) {
                      if(bottom){
                        LEPLANNER.Draw.imageIcon(LEPLANNER.ctx, display_icon, d_x+icon_size/2, display_y+5, icon_size);
                      }else{
                        LEPLANNER.Draw.imageIcon(LEPLANNER.ctx, display_icon, d_x+icon_size/2, display_y-icon_size-5, icon_size);
                      }
                    }
                  };
                }

              }

              if(typeof this.data.conveyor_url != 'undefined' && (this.data.conveyor_url !== null || this.data.conveyor_name !== null)){
                // draw conveyor
                LEPLANNER.Draw.display(LEPLANNER.ctx, this.x+this.width-r, display_y, r, 'rgba(0,0,0,1)', bottom);

                if(this.data.conveyor_url !== null){

                  //draw conveyor icon
                  // var conveyor_icon_hover_name = $scope.displays_list[this.data.display_id].name;
                  var conveyor_icon_size = 24;
                  var conveyor_icon = new Image();
                  //console.log(this.data.conveyor_url);
                  // google favicon fetcher
                  //fixing - Uncaught SecurityError: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.
                  conveyor_icon.src = '/images/favs/icon_'+escapeRegExp(this.data.conveyor_url)+'.png';

                  var width = this.width;
                  var x = this.x;
                  conveyor_icon.onload = function() {
                    if(!too_small_for_icon) {
                      //console.log(x);
                      if(bottom){
                        LEPLANNER.Draw.imageIcon(LEPLANNER.ctx, conveyor_icon, x+width-conveyor_icon_size*1.5, display_y+5, conveyor_icon_size);
                      }else{
                        LEPLANNER.Draw.imageIcon(LEPLANNER.ctx, conveyor_icon, x+width-conveyor_icon_size*1.5, display_y-conveyor_icon_size-5, conveyor_icon_size);
                      }
                      LEPLANNER.updateImageUrl();
                    }
                  };

                }

              }


              //draw box
              LEPLANNER.Draw.fillRect(LEPLANNER.ctx, this.x, this.y, this.width, this.height, class_color);
              LEPLANNER.Draw.strokeRect(LEPLANNER.ctx, this.x, this.y, this.width, this.height, 1, 'rgba(0,0,0,1)');

              //write material name
              var material_font = 23;
              //var material_name_color = 'rgba(2,89,121,1)';
              var material_name_color = 'rgba(0,0,0,1)';
              //if not link, change color to black;
              if(!this.data.material_url){
                material_name_color = 'rgba(0,0,0,1)';
              }
              //LEPLANNER.Draw.materialName(LEPLANNER.ctx, this.data.material_name, this.width, this.x+material_font/4, this.y+material_font, material_font, 'rgba(0,0,0,1)');

              //console.log(max_line_count);
              //console.log(max_line_count);
              var line_count = 0;
              var words = this.data.material_name.split(' ');
              var line = '';
              var y = this.y+material_font+10;
              var lineHeight = material_font+5;
              var max_line_count = Math.floor((this.height-30)/lineHeight);
              var maxWidth = this.width-material_font-10;
              //console.log(maxWidth);
              // can fit one letter
              if(maxWidth > material_font-5){

                for(var n = 0; n < words.length; n++) {
                  var testLine = line + words[n] + ' ';
                  // fix measureText
                  LEPLANNER.ctx.font = material_font+'px Helvetica';
                  var metrics = LEPLANNER.ctx.measureText(testLine);
                  var testWidth = metrics.width;
                  if (testWidth > maxWidth && line_count < max_line_count-1 && n > 0) {
                    //LEPLANNER.ctx.font = material_font+'px Helvetica';
                    var test_width = LEPLANNER.ctx.measureText(line).width;
                    while (test_width > maxWidth){
                      //console.log(test_width);
                      // if word is too long, trim to fit in the box
                      var temp_length = Math.floor((test_width-(test_width-maxWidth)) * (line.length) / test_width);
                      var new_line = line.slice(0, temp_length);
                      var new_line_width = LEPLANNER.ctx.measureText(new_line).width;
                      LEPLANNER.Draw.text(LEPLANNER.ctx, new_line, this.x+material_font-5, y, material_font, material_name_color);
                      if(this.data.material_url){
                        LEPLANNER.Draw.fillRect(LEPLANNER.ctx, this.x+material_font-5, y+3, new_line_width, 2, material_name_color);
                      }
                      var left_from_line = line.slice(temp_length, line.length);
                      line = left_from_line;
                      y += lineHeight;
                      //console.log(line_count);
                      line_count++;
                      test_width = LEPLANNER.ctx.measureText(line).width;
                      if(line_count == max_line_count){
                        this.needs_to_be_enlarged = true;
                        break;
                      }
                      if(test_width === 0 ){ break; }
                    }
                    if(line_count < max_line_count && line !== ' '){
                      LEPLANNER.Draw.text(LEPLANNER.ctx, line, this.x+material_font-5, y, material_font, material_name_color);
                      if(this.data.material_url){
                        LEPLANNER.Draw.fillRect(LEPLANNER.ctx, this.x+material_font-5, y+3, test_width, 2, material_name_color);
                      }
                      y += lineHeight;
                      line_count++;
                    }
                    line = words[n] + ' ';

                  } else {
                    line = testLine;
                  }

                }

                if(line_count < max_line_count){
                  //if last line too long add (...)
                  LEPLANNER.ctx.font = material_font+'px Helvetica';
                  var text_width = LEPLANNER.ctx.measureText(line).width;
                  //console.log(line);
                  // count chars to leave
                  if(text_width > maxWidth){
                    var new_length = Math.floor((text_width-(text_width-maxWidth)) * (line.length) / text_width);
                    // make also space for 3 ...
                    if(new_length > 1){
                      new_length = new_length-1;
                    }
                    //console.log(new_length);
                    line = line.slice(0, new_length);
                    line += '...';
                    text_width = LEPLANNER.ctx.measureText(line).width;
                    this.needs_to_be_enlarged = true;
                  }
                  LEPLANNER.Draw.text(LEPLANNER.ctx, line, this.x+material_font-5, y, material_font, material_name_color);
                  if(this.data.material_url){
                    LEPLANNER.Draw.fillRect(LEPLANNER.ctx, this.x+material_font-5, y+3, text_width, 2, material_name_color);
                  }
                }
              }


          	};

          };

          LEPLANNER.checkIfHoveringActivity = function(){

            var hovering = false;

            for(var i = 0; i < LEPLANNER.activities.length; i++){
              var a = LEPLANNER.activities[i];

              if(LEPLANNER.enlarged_activity == a._id){
                //check if hovering enlarged part

                if ((point.x>=a.enlarged_x)&(point.x<=a.enlarged_x+a.enlarged_width)&(point.y>=a.enlarged_y)&(point.y<=a.enlarged_y+a.enlarged_height)){
                  //console.log('true');
                  hovering = true;
                }

                //check if hovering add material buttons
                // LEPLANNER.add_material_button_radius
                var x1 = point.x;
                var x0 = a.enlarged_x+a.enlarged_width/2;
                var y1 = point.y;
                var y0 = a.enlarged_y;
                var y2 = a.enlarged_y+a.enlarged_height;
                var r = LEPLANNER.add_material_button_radius;
                if(
                  (Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) < r && y1 <= y0) ||
                  (Math.sqrt((x1-x0)*(x1-x0) + (y1-y2)*(y1-y2)) < r && y1 >= y2)
                ){
                  if(LEPLANNER.temp_canvas_cursor_pointer === false){
                    LEPLANNER.temp_canvas_cursor_pointer = true;
                    LEPLANNER.cursorPointer(temp_canvas, true);
                  }
                  hovering = true;
                }else{
                  if(LEPLANNER.temp_canvas_cursor_pointer === true){
                    LEPLANNER.temp_canvas_cursor_pointer = false;
                    LEPLANNER.cursorPointer(temp_canvas, false);
                  }
                }

              }

            }

            if(LEPLANNER.enlarged_activity !== null && hovering === false){
              LEPLANNER.enlarged_activity = null;
              LEPLANNER.Draw.clear(LEPLANNER.temp_ctx);
            }

            // if hovering small activity
            if(!hovering){
              for(var j = 0; j < LEPLANNER.activities.length; j++){
                var ac = LEPLANNER.activities[j];

                //hovering small activity
                if ((point.x>=ac.x)&(point.x<=ac.x+ac.width)&(point.y>=ac.y)&(point.y<=ac.y+ac.height)){

                  if(LEPLANNER.enlarged_activity != ac._id){
                    LEPLANNER.activities[j].EnlargeOne();
                    LEPLANNER.enlarged_activity = ac._id;
                  }

                  hovering = true;

                }
              }
            }

          };

          LEPLANNER.checkIfHoveringMaterial = function(){

            var hovering = false;
            var hovering_without_tooltip = false;
            var hovering_display = false;
            var hovering_conveyor = false;

            for(var i = 0; i < LEPLANNER.materials.length; i++){
              var m = LEPLANNER.materials[i];

              //hovering material
              if (LEPLANNER.enlarged_activity === null && (point.x>=m.x)&(point.x<=m.x+m.width)&(point.y>=m.y)&(point.y<=m.y+m.height)){

                //console.log(hovering);
                hovering_without_tooltip = true;

                //if needed show full text
                if(m.needs_to_be_enlarged === true){
                  hovering = true;

                  //console.log(m.data.material_name);
                  LEPLANNER.Draw.clear(LEPLANNER.temp_ctx);
                  var size = 25;
                  var extra_space = 10;
                  LEPLANNER.temp_ctx.font = size+'px Helvetica';
                  var measure = LEPLANNER.temp_ctx.measureText(m.data.material_name).width;
                  //console.log(point.x+extra_space+measure+' '+(LEPLANNER.WIDTH-extra_space));
                  if(point.x+extra_space+measure > LEPLANNER.WIDTH-extra_space){
                    point.x = parseInt(LEPLANNER.WIDTH - extra_space*2 - measure);
                    //console.log('extra');
                  }
                  LEPLANNER.Draw.tooltip(LEPLANNER.temp_ctx, point.x+extra_space, point.y-extra_space, measure, 25, m.data.material_name);
                  LEPLANNER.has_tooltip_drawn = true;
                }

              }


              // if hovering display
              if (LEPLANNER.enlarged_activity === null &&
                m.display_name !== null && (
                (point.x>=m.x)&(point.x<=m.x+m.display_r)&(point.y>=m.display_y-m.display_r)&(point.y<=m.display_y) ||
                (point.x>=m.x)&(point.x<=m.x+m.display_r)&(point.y>=m.y+m.height)&(point.y<=m.y+m.height+m.display_r) )
              ){
                hovering_display = true;
                hovering = true;
                LEPLANNER.Draw.clear(LEPLANNER.temp_ctx);
                var d_size = 25;
                var d_extra_space = 10;
                LEPLANNER.temp_ctx.font = d_size+'px Helvetica';
                var d_measure = LEPLANNER.temp_ctx.measureText(m.display_name).width;
                //console.log(point.x+extra_space+measure+' '+(LEPLANNER.WIDTH-extra_space));
                if(point.x+d_extra_space+d_measure > LEPLANNER.WIDTH-d_extra_space){
                  point.x = parseInt(LEPLANNER.WIDTH - d_extra_space*2 - d_measure);
                  //console.log('extra');
                }
                LEPLANNER.Draw.tooltip(LEPLANNER.temp_ctx, point.x+d_extra_space, point.y-d_extra_space, d_measure, d_size, m.display_name);
                LEPLANNER.has_tooltip_drawn = true;
                //console.log('hoveirng display');
              }

              // if hovering conveyor
              if (LEPLANNER.enlarged_activity === null &&
                 (
                (point.x>=m.x+m.width-m.display_r)&(point.x<=m.x+m.width)&(point.y>=m.display_y-m.display_r)&(point.y<=m.display_y) ||
                (point.x>=m.x+m.width-m.display_r)&(point.x<=m.x+m.width)&(point.y>=m.y+m.height)&(point.y<=m.y+m.height+m.display_r) )
              ){

                var name = '';
                if(m.data.conveyor_name === null || m.data.conveyor_name === ''){
                  name = m.data.conveyor_url;
                }else{
                  name = m.data.conveyor_name;
                }

                hovering_conveyor = true;
                hovering = true;
                LEPLANNER.Draw.clear(LEPLANNER.temp_ctx);
                var c_size = 25;
                var c_extra_space = 10;
                LEPLANNER.temp_ctx.font = c_size+'px Helvetica';
                var c_measure = LEPLANNER.temp_ctx.measureText(name).width;
                //console.log(point.x+extra_space+measure+' '+(LEPLANNER.WIDTH-extra_space));
                if(point.x+c_extra_space+c_measure > LEPLANNER.WIDTH-c_extra_space){
                  point.x = parseInt(LEPLANNER.WIDTH - c_extra_space*2 - c_measure);
                  //console.log('extra');
                }
                LEPLANNER.Draw.tooltip(LEPLANNER.temp_ctx, point.x+c_extra_space, point.y-c_extra_space, c_measure, c_size, name);
                LEPLANNER.has_tooltip_drawn = true;
                //console.log('hoveirng conveyor');
              }


            }

            if(LEPLANNER.has_tooltip_drawn === true && hovering === false && LEPLANNER.enlarged_activity === null){
              LEPLANNER.Draw.clear(LEPLANNER.temp_ctx);
              LEPLANNER.has_tooltip_drawn = null;
              if(LEPLANNER.temp_canvas_cursor_pointer === true){
                LEPLANNER.temp_canvas_cursor_pointer = false;
                LEPLANNER.cursorPointer(temp_canvas, false);
              }
            }else{
              if((hovering || hovering_without_tooltip) && !hovering_display){
                if(LEPLANNER.temp_canvas_cursor_pointer === false){
                  LEPLANNER.temp_canvas_cursor_pointer = true;
                  LEPLANNER.cursorPointer(temp_canvas, true);
                }
              }
            }

            //console.log(hovering);

          };

          LEPLANNER.checkIfclickedMaterialButton = function(){

            for(var i = 0; i < LEPLANNER.activities.length; i++){
              var a = LEPLANNER.activities[i];

              if(LEPLANNER.enlarged_activity == a._id){
                //check if clicked add material buttons
                var x1 = point.x;
                var x0 = a.enlarged_x+a.enlarged_width/2;
                var y1 = point.y;
                var y0 = a.enlarged_y;
                var y2 = a.enlarged_y+a.enlarged_height;
                var r = LEPLANNER.add_material_button_radius;
                if((Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) < r && y1 <= y0)){
                  // clicked top button
                  //console.log('clicked top button if id: '+a._id);
                  //$scope.activity = a;
                  if(typeof a.has_top_material == "number"){
                    //edit
                    $scope.openEditMaterialModal(a, true, LEPLANNER.materials[a.has_top_material].data);

                  }else{
                    //create new
                    $scope.openAddMaterialModal(a, true);

                  }
                }
                if(Math.sqrt((x1-x0)*(x1-x0) + (y1-y2)*(y1-y2)) < r && y1 >= y2){
                  // clicked bottom button
                  //console.log('clicked bottom button of id: '+a._id);
                  //$scope.activity = a;
                  if(typeof a.has_bottom_material == "number"){
                    //edit
                    $scope.openEditMaterialModal(a, false, LEPLANNER.materials[a.has_bottom_material].data);
                  }else{
                    //create new
                    $scope.openAddMaterialModal(a, false);

                  }
                }

              }

            }

          };

          LEPLANNER.checkIfclickedMaterialLink = function(){
            for(var i = 0; i < LEPLANNER.materials.length; i++){
              var m = LEPLANNER.materials[i];

              if (LEPLANNER.enlarged_activity === null && (point.x>=m.x)&(point.x<=m.x+m.width)&(point.y>=m.y)&(point.y<=m.y+m.height)){
                //console.log('or here');
                if(typeof m.data.material_url != 'undefined' && m.data.material_url !== null && m.data.material_url !== ''){
                  var url = m.data.material_url;
                  if(url.substring(0, 4) != "http") {
                    url = 'http://'+url;
                  }
                  console.log('opening '+url);
                  window.open(url,'_blank');
                }
              }

              // if hovering conveyor
              if (LEPLANNER.enlarged_activity === null &&
                 (
                (point.x>=m.x+m.width-m.display_r)&(point.x<=m.x+m.width)&(point.y>=m.display_y-m.display_r)&(point.y<=m.display_y) ||
                (point.x>=m.x+m.width-m.display_r)&(point.x<=m.x+m.width)&(point.y>=m.y+m.height)&(point.y<=m.y+m.height+m.display_r) )
              ){
                //console.log('here');
                if(typeof m.data.conveyor_url != 'undefined' && m.data.conveyor_url !== null && m.data.conveyor_url !== ''){

                  var c_url = m.data.conveyor_url;
                  if(c_url.substring(0, 4) != "http") {
                    c_url = 'http://'+c_url;
                  }
                  console.log('opening '+c_url);
                  window.open(c_url,'_blank');
                }
              }


            }

          };

          var escapeRegExp = function(str) {
            return str.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
          };

          LEPLANNER.Draw = {

            clear: function(ctx) {
                ctx.clearRect(0, 0, LEPLANNER.WIDTH, LEPLANNER.HEIGHT);
            },

            line: function(ctx, x, y, end_x, end_y, lw, col){
              ctx.fillStyle = col;
              ctx.lineWidth=lw;
              ctx.moveTo(x, y);
              ctx.lineTo(end_x, end_y);
              ctx.stroke();
            },

            fillRect: function(ctx, x, y, w, h, col) {
                ctx.fillStyle = col;
                ctx.lineJoin = "miter";
                ctx.fillRect(x, y, w, h);
            },

            fillRectRound: function(ctx, x, y, w, h, lw, col) {
                ctx.fillStyle = col;
                ctx.strokeStyle = col;
                ctx.lineJoin = "round";
                ctx.lineWidth=lw;
                ctx.strokeRect(x+(lw/2), y+(lw/2), w-lw, h-lw);
                ctx.fillRect(x+(lw/2), y+(lw/2), w-lw, h-lw);
            },

            strokeRect: function(ctx, x, y, w, h, lw, col) {
                ctx.strokeStyle = col;
                ctx.lineJoin = "miter";
                ctx.lineWidth=lw;
                ctx.strokeRect(x, y, w, h);
            },

            circle: function(ctx, x, y, r, col) {
                ctx.fillStyle = col;
                ctx.beginPath();
                ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
            },

            addMaterialButton: function(ctx, x, y, r, fill_col, rotate) {

                //ctx.fillStyle = fill_col;
                var greenPart = ctx.createLinearGradient(x,y-30,x,y+30);

                //bottom
                if(rotate){
                  greenPart = ctx.createLinearGradient(x,y+30,x,y-30);
                }

                greenPart.addColorStop(0, 'rgb(92,184,92)');
                greenPart.addColorStop(1, 'rgb(65,150,65)');

                var width = 50;
                ctx.lineWidth = width;

                // First we make a clipping region for the left half
                ctx.save();
                ctx.beginPath();
                ctx.rect(x-width, y-width, 100+width, 100 + width*2);
                ctx.clip();

                // Then we draw the left half
                ctx.strokeStyle = greenPart;
                ctx.beginPath();
                ctx.arc(x,y,25,Math.PI, 0, rotate);
                ctx.stroke();

                ctx.restore(); // restore clipping region to default


                ctx.fillStyle = fill_col;
                var font_size = 50;
                ctx.font = font_size+'px Helvetica';
                if(rotate){
                  ctx.fillText('+', x-15, y+33);
                }else{
                  ctx.fillText('+', x-15, y-7);
                }

            },

            display: function(ctx, x, y, r, fill_col, rotate) {

                ctx.fillStyle = '#E0E0E0';
                ctx.beginPath();
                //console.log(rotate);
                if(rotate){
                  ctx.rect(x-r, y+1, r*2, r/2+1);
                }else{
                  ctx.rect(x-r, y-r/2-1, r*2, r/2+1);
                }
                ctx.fill();
                ctx.strokeStyle = '#B3B3B3';
                ctx.stroke();

                //ctx.fillStyle = fill_col;
                var greenPart = ctx.createLinearGradient(x,y-30,x,y+30);

                //bottom
                if(rotate){
                  greenPart = ctx.createLinearGradient(x,y+30,x,y-30);
                }

                greenPart.addColorStop(0, 'rgb(92,184,92)');
                greenPart.addColorStop(1, 'rgb(65,150,65)');

                var width = r;
                ctx.lineWidth = width;

                // First we make a clipping region for the left half
                ctx.save();
                ctx.beginPath();
                ctx.rect(x-width, y-width-r/2, width*3, width*3);
                ctx.clip();

                // Then we draw the left half
                ctx.strokeStyle = '#E0E0E0';
                ctx.beginPath();
                if(rotate){
                  ctx.arc(x,y+r/2,width/2,Math.PI, 0, rotate);
                }else{
                  ctx.arc(x,y-r/2,width/2,Math.PI, 0, rotate);
                }
                ctx.stroke();

                ctx.restore(); // restore clipping region to default

                ctx.strokeStyle = '#B3B3B3';
                ctx.lineWidth= 1;
                ctx.beginPath();
                if(rotate){
                  ctx.arc(x,y+r/2,width,Math.PI, 0, rotate);
                }else{
                  ctx.arc(x,y-r/2,width,Math.PI, 0, rotate);
                }
                ctx.stroke();

            },

            editMaterialButton: function(ctx, x, y, r, fill_col, rotate) {
                //ctx.fillStyle = fill_col;
                var graypart = ctx.createLinearGradient(x,y-30,x,y+30);

                //bottom
                if(rotate){
                  graypart = ctx.createLinearGradient(x,y+30,x,y-30);
                }

                graypart.addColorStop(0, 'rgb(51,122,183)');
                graypart.addColorStop(1, 'rgb(38,90,136)');

                var width = 50;
                ctx.lineWidth = width;

                // First we make a clipping region for the left half
                ctx.save();
                ctx.beginPath();
                ctx.rect(x-width, y-width, 100+width, 100 + width*2);
                ctx.clip();

                // Then we draw the left half
                ctx.strokeStyle = graypart;
                ctx.beginPath();
                ctx.arc(x,y,25,Math.PI, 0, rotate);
                ctx.stroke();

                ctx.restore(); // restore clipping region to default


                ctx.fillStyle = fill_col;
                var font_size = 40;
                ctx.font = font_size+'px Helvetica';
                if(rotate){
                  ctx.fillText('e', x-12, y+33);
                }else{
                  ctx.fillText('e', x-12, y-12);
                }

            },

            text: function(ctx, string, x, y, size, col) {
                ctx.font = size+'px Helvetica';
                ctx.fillStyle = col;
                ctx.fillText(string, x, y);
            },

            activityName: function(ctx, string, box_width, x, y, size, col) {
              ctx.font = size+'px Helvetica';
              var text_width = ctx.measureText(string).width;
              if(text_width > box_width){
                var new_length = Math.floor((text_width-(text_width-box_width)) * (string.length) / text_width);
                if((new_length-1) <= 0){
                  return;
                }
                string = string.slice(0, new_length);
              }
              ctx.fillStyle = col;
              ctx.fillText(string, x, y);
            },

            tooltip: function(ctx, x, y, width, size, string) {

              ctx.fillStyle = '#fff';
              ctx.lineJoin = "miter";
              ctx.fillRect(x-5, y-size-2, width+10, size+10);

              ctx.fillStyle = '#000';
              ctx.strokeRect(x-5, y-size-2, width+10, size+10);


              ctx.font = size+'px Helvetica';
              ctx.fillStyle = '#000';
              ctx.fillText(string, x, y);
            },

            imageIcon: function(ctx, image, x, y, size) {
              ctx.drawImage(image,x,y,size,size);
            }
          };

          LEPLANNER.cursorPointer = function(canvas, pointer){
            if(pointer === true){
              angular.element(canvas).css({
                cursor: 'pointer',
              });
            }else{
              angular.element(canvas).css({
                cursor: 'auto',
              });
            }
          };

          angular.element($window).ready(function() {
            if(typeof $scope.allow_edit != 'undefined' && $scope.allow_edit === true){
              LEPLANNER.edit =true;
            }
            //one_icon_img.onload = function() {
              //pair_icon_img.onload = function() {
                //group_icon_img.onload = function() {

                  LEPLANNER.init();
                //};
              //};
            //};

          });

          angular.element($window).bind('resize', function () {
            LEPLANNER.resizeCanvas();
          });

          temp_canvas.addEventListener(P_MOVE, function(e) {

            //https://github.com/pwambach/angular-canvas-painter/blob/master/js/pwCanvas.js
            setPointFromEvent(point, e);

            //fix canvas density
            point.x = point.x*LEPLANNER.scale;
            point.y = point.y*LEPLANNER.scale;

            LEPLANNER.checkIfHoveringActivity();
            LEPLANNER.checkIfHoveringMaterial();
          });

          temp_canvas.addEventListener(P_END, function(e) {

            setPointFromEvent(point, e);

            //fix 1920px canvas width
            point.x = point.x*LEPLANNER.scale;
            point.y = point.y*LEPLANNER.scale;

            LEPLANNER.checkIfclickedMaterialButton();
            LEPLANNER.checkIfclickedMaterialLink();
          });


          // !IMPORTANT enable redraw fn in controller
          if(LEPLANNER.edit === true){
            $scope.setReDrawFunction({theDirFn: LEPLANNER.reDraw});
          }

          var getOffset = function( elem ) {
            var offsetTop = 0;
            var offsetLeft = 0;
            do {
              if(!isNaN(elem.offsetLeft)) {
                offsetTop += elem.offsetTop;
                offsetLeft += elem.offsetLeft;
              }
              elem = elem.offsetParent;
            } while( elem );
              return {
                left:offsetLeft,
                top: offsetTop
              };
          };

          var setPointFromEvent = function(point, e) {
  					if(isTouch){
  						point.x = e.changedTouches[0].pageX - getOffset(e.target).left;
  						point.y = e.changedTouches[0].pageY - getOffset(e.target).top;
  					} else {
  						point.x = e.offsetX !== undefined ? e.offsetX : e.layerX;
  						point.y = e.offsetY !== undefined ? e.offsetY : e.layerY;
  					}
  				};

  			}
  		};

    }

}());
