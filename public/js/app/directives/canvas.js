(function() {
  'use strict';

  angular
    .module('app')
    .directive('scenarioeditcanvas', scenarioeditcanvas);

    scenarioeditcanvas.$inject = ['$routeParams','$timeout','$window'];

    function scenarioeditcanvas ($routeParams,$timeout,$window) {
      return {
  			restrict: 'E',
        templateUrl: 'js/app/directives/canvas.html',
  			link: function postLink($scope, element, attrs) {

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
            border: '1px solid gray'
          });

          angular.element(image).css({
            display: 'none',
          });



          element.find('div').append(temp_canvas);
          element.find('div').append(canvas);
          element.find('div').append(image);

          var LEPLANNER = {

          	WIDTH: 1920,
          	HEIGHT: 1080,
            scale: null,
          	canvas: null,
            temp_canvas: null,
            image: null,
          	ctx: null,
            temp_ctx: null,
            activities: null,
            activities_duration: null,
            activities_width: null,

          	init: function(){

              this.canvas = canvas;
              this.temp_canvas = temp_canvas;
              this.image = image;
              this.activities = [];
              this.activities_duration = $scope.scenario.activities_duration;

              this.canvas.width =  this.temp_canvas.width  = this.WIDTH;
              this.canvas.height = this.temp_canvas.height = this.HEIGHT;

              this.ctx = canvas.getContext('2d');
      				this.temp_ctx = temp_canvas.getContext('2d');
              this.resizeCanvas();
              this.Draw.clear(this.ctx);
              this.drawBaseLayer();
              this.drawActivities();
              this.updateImageUrl();

          	},

            resizeCanvas: function(){
              var canvas_wrapper = document.getElementById('scenario-edit-canvas-wrapper');
              var style = {
                width: canvas_wrapper.offsetWidth
              };
              angular.element(canvas).css(style);
              angular.element(temp_canvas).css(style);

              //!important scale
              this.scale = this.WIDTH/style.width;
            },

            updateImageUrl: function(){
              image.src = this.canvas.toDataURL("image/png");
            },

            drawBaseLayer: function(){

              //bg
              this.Draw.fillRect(this.ctx, 0, 0, LEPLANNER.WIDTH, LEPLANNER.HEIGHT, 'rgba(255,255,255,1)');

              //middle divider
              this.Draw.line(this.ctx, 0, this.HEIGHT/2, this.WIDTH, this.HEIGHT/2, 1, 'rgba(0,0,0,1)');

              // legend
              var legend_x = 50;
              var legend_y = LEPLANNER.HEIGHT-100;
              var legend_box = 20;

              this.Draw.fillRect(this.ctx, legend_x, legend_y, legend_box, legend_box, 'rgba(201, 218,	184, 1)');
              this.Draw.text(this.ctx, 'tunnis (in-class)', legend_x + legend_box*2, legend_y+legend_box-2, legend_box, 'rgba(0,0,0,1)');
              legend_y += 40;

              this.Draw.fillRect(this.ctx, legend_x, legend_y, legend_box, legend_box, 'rgba(239, 200, 155, 1)');
              this.Draw.text(this.ctx, 'kodutöö (off-class)', legend_x + legend_box*2, legend_y+legend_box-2, legend_box, 'rgba(0,0,0,1)');

              // student/teacher



            },

            drawActivities: function(){

              if($scope.scenario.activities.length === 0 ||
                ($scope.scenario.activities.length === 1 && $scope.scenario.activities[0].duration === 0)){
                this.Draw.text(this.ctx, 'Please add more activity (duration)', 50*this.scale, 50*this.scale, 20*this.scale, 'rgba(0,0,0,1)');
                return;
              }

              var start_time = 0;

              for(var i = 1; i <= $scope.scenario.activities.length; i++){

                var Activity = new LEPLANNER.Activity(i, start_time, $scope.scenario.activities[i-1]);
                this.activities.push(Activity);
                Activity.Draw();
                start_time += $scope.scenario.activities[i-1].duration;
              }

              console.log($scope.scenario.activities);
            }

          };

          LEPLANNER.Activity = function(indent, start_time, data){

            this.indent = indent;
            this.start_time = start_time;
          	this.name = data.name;
          	this.duration = data.duration;
            if(typeof data.in_class == 'undefined'){
              this.in_class = false;
            }else{
              this.in_class = true;
            }
            this.organization = data.activity_organization._id;
            this.outcomes = data.outcomes;

            //for drawing
            this.padding = 20;
            this.height = 40;
            // - 20 is to give padding from left side
            var minute_constant = ((LEPLANNER.WIDTH-20-(($scope.scenario.activities.length+1)*this.padding))/LEPLANNER.activities_duration);
            console.log(this.indent);
            this.x = parseInt(20+(minute_constant * this.start_time) + (this.indent* this.padding));
            this.y = parseInt(LEPLANNER.HEIGHT/2-this.height/2);
            this.width = parseInt(minute_constant * this.duration);

          	this.Draw = function(){

              var class_color;
              if(this.in_class){
                // green
                class_color = 'rgba(201, 218,	184, 1)';
              }else{
                class_color = 'rgba(239, 200, 155, 1)';
              }
              //draw box
              LEPLANNER.Draw.fillRect(LEPLANNER.ctx, this.x, this.y, this.width, this.height, class_color);
              LEPLANNER.Draw.strokeRect(LEPLANNER.ctx, this.x, this.y, this.width, this.height, 1, 'rgba(0,0,0,1)');

              //write duration
              var duration_font = 19;
              LEPLANNER.Draw.text(LEPLANNER.ctx, this.duration, this.x+duration_font/4, this.y+duration_font, duration_font, 'rgba(0,0,0,1)');

              //write name
              var name_font = 25;
              LEPLANNER.Draw.activityName(LEPLANNER.ctx, this.name, this.width-name_font-7, this.x+name_font+7, this.y+name_font, name_font, 'rgba(0,0,0,1)');

          	};

          };

          LEPLANNER.checkIfHoveringActivity = function(){

            //fix 1920px canvas width
            point.x = point.x*LEPLANNER.scale;
            point.y = point.y*LEPLANNER.scale;


            for(var i = 0; i < LEPLANNER.activities.length; i++){
              var a = LEPLANNER.activities[i];
              if ((point.x>=a.x)&(point.x<=a.x+a.width)&(point.y>=a.y)&(point.y<=a.y+a.height)){
                console.log('hovering '+a.name);

                // draw bigger box on temp canvas
              }
            }
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

            text: function(ctx, string, x, y, size, col) {
                ctx.font = size+'px Helvetica';
                ctx.fillStyle = col;
                ctx.fillText(string, x, y);
            },

            activityName: function(ctx, string, box_width, x, y, size, col) {
                ctx.font = size+'px Helvetica';

                var text_width = ctx.measureText(string).width;

                if(text_width > box_width){
                  //delete chars that are too long for the box
                  //console.log(string.length);
                  //console.log(box_width);
                  //console.log(text_width-(text_width-box_width));
                  var new_length = Math.floor((text_width-(text_width-box_width)) * (string.length) / text_width);
                  //console.log(new_length);
                  //console.log(string);
                  if((new_length-1) <= 0){
                    return;
                  }
                  string = string.slice(0, new_length-1);
                  //console.log(string);
                }

                ctx.fillStyle = col;
                ctx.fillText(string, x, y);
            }

          };

          angular.element($window).ready(function() {
            LEPLANNER.init();
          });

          angular.element($window).bind('resize', function () {
            LEPLANNER.resizeCanvas();
          });

          temp_canvas.addEventListener(P_MOVE, function(e) {

            //https://github.com/pwambach/angular-canvas-painter/blob/master/js/pwCanvas.js
            setPointFromEvent(point, e);
            LEPLANNER.checkIfHoveringActivity();
          });

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
