(function() {
  'use strict';

  angular
    .module('app')
    .directive('scenariocanvas', ['$routeParams','$timeout','$window','$filter',
    function($routeParams,$timeout,$window,$filter) {
      return {
        restrict: 'E',
        templateUrl: 'js/app/directives/canvas/canvas.html',
        link: function postLink($scope, element, attrs) {

            console.log('here');
            var Planner = function(options){

                //singleton
                if (Planner.instance_) {
                    return Planner.instance_;
                }
                Planner.instance_ = this;

                this.config = Planner.config;
                if(options && options.edit){ this.config.edit = true; }

                this.Draw = Planner.Draw;

                //vars
                this.canvas = this.temp_canvas = this.canvas_image = null;
                this.ctx = this.temp_ctx = null;
                this.activity_images = [];
                this.ratio = null;

                this.init();

            };

            Planner.config = {
                activityImageNames: ['./images/one.png','./images/pair.png','./images/group.png'],
                canvasTempId: '#scenario-edit-canvas-tmp',
                canvasId: '#scenario-edit-canvas',
                canvasImageId: '#scenario-edit-canvas-tmp',
                ColorInClass: 'rgb(204, 255, 204)',
                ColorOffClass: 'rgb(255, 144, 144)',
                legendInClass: 'tunnitegevus (in-class)',
                legendOffClass: 'muu (off-class)',
                aboveAxisLegend: 'õpetaja (teacher)',
                belowAxisLegend: 'õpilane (student)',
                defaultFontSize: 12,
            };

            Planner.prototype = {
                init: function(){

                    //assigning canvas
                    this.canvas = document.querySelector(this.config.canvasId);
                    this.ctx = this.canvas.getContext('2d');
                    this.temp_canvas = document.querySelector(this.config.canvasTempId);
                    this.temp_ctx = this.temp_canvas.getContext('2d');
                    this.canvas_image = document.querySelector(this.config.canvasImageId);

                    //assigning group organization pics
                    var one_img = new Image();
                    one_img.src = this.config.activityImageNames[0];
                    this.activity_images.push(one_img);
                    var pair_img = new Image();
                    pair_img.src = this.config.activityImageNames[1];
                    this.activity_images.push(pair_img);
                    var group_img = new Image();
                    group_img.src = this.config.activityImageNames[2];
                    this.activity_images.push(group_img);
                    // same icon for whole class
                    this.activity_images.push(group_img);

                    this.resize();
                    window.addEventListener("resize", this.resize.bind(this));

                    this.drawBaseLayer();

                },
                resize: function(){
                    console.log('resize');

                    //canvas wrapper
                    var canvas_wrapper = document.querySelector('#scenario-canvas-wrapper');
                    var width = canvas_wrapper.offsetWidth;
                    var height = Math.round(canvas_wrapper.offsetWidth * (9/16));

                    //do the defaults
                    this.canvas.width = this.temp_canvas.width = width;
                    this.canvas.height = this.temp_canvas.height = height;
                    this.canvas.style.width = this.temp_canvas.style.width = width + 'px';
                    this.canvas.style.height = this.temp_canvas.style.height = height + 'px';

                    //for retina
                    var devicePixelRatio = window.devicePixelRatio || 1;
                    var backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
                        this.ctx.mozBackingStorePixelRatio ||
                        this.ctx.msBackingStorePixelRatio ||
                        this.ctx.oBackingStorePixelRatio ||
                        this.ctx.backingStorePixelRatio || 1;

                    this.ratio = devicePixelRatio / backingStoreRatio;

                    if (devicePixelRatio !== backingStoreRatio) {

                        var oldWidth = this.canvas.width;
                        var oldHeight = this.canvas.height;

                        this.canvas.width = this.temp_canvas.width = Math.round(oldWidth * this.ratio);
                        this.canvas.height = this.temp_canvas.height = Math.round(oldHeight * this.ratio);
                        this.canvas.style.width = this.temp_canvas.style.width = oldWidth + 'px';
                        this.canvas.style.height = this.temp_canvas.style.height = oldHeight + 'px';

                        console.log('retina ' + this.canvas.width);
                    }

                    //reDraw?
                },
                reDraw: function(){
                    //this.Draw.fillRect(this.ctx, this.canvas.width/2, this.canvas.height/2, 200, 200, 'rgb(0,0,0)');
                },
                drawBaseLayer: function(){

                    this.Draw.fillRect(this.ctx, 0, 0, this.canvas.width, this.canvas.height, 'rgba(255,255,255,1)'); //white bg
                    this.Draw.strokeRect(this.ctx, 0, 0, this.canvas.width, this.canvas.height, 1, 'rgba(0,0,0,1)'); //black bg border
                    this.Draw.line(this.ctx, 0, this.canvas.height/2, this.canvas.width, this.canvas.height/2, 1, 'rgba(0,0,0,1)'); //middle divider

                    // legend
                    var legend_x = 20;
                    var legend_y = this.canvas.height-30;
                    var legend_box = 12;

                    this.Draw.fillRect(this.ctx, legend_x, legend_y, legend_box, legend_box, this.config.ColorInClass);
                    this.Draw.text(this.ctx, this.config.legendInClass, legend_x + legend_box*2-5, legend_y+legend_box-2, legend_box, 'rgba(0,0,0,1)');
                    legend_x += 170;

                    this.Draw.fillRect(this.ctx, legend_x, legend_y, legend_box, legend_box, this.config.ColorOffClass);
                    this.Draw.text(this.ctx, this.config.legendOffClass, legend_x + legend_box*2-5, legend_y+legend_box-2, legend_box, 'rgba(0,0,0,1)');

                    // student/teacher
                    //teacher up-top
                    /*this.ctx.save();
                    this.ctx.translate(30, 208);
                    this.ctx.rotate(-Math.PI/2);
                    this.Draw.text(this.ctx, this.config.aboveAxisLegend, 0, 0, 12, 'rgba(0,0,0,1)');
                    this.Draw.text(this.ctx, this.config.belowAxisLegend, -200, 0, 12, 'rgba(0,0,0,1)');
                    this.ctx.restore();*/
                    //this.Draw.text(this.ctx, 'Student / Õpilane', legend_x + legend_box*2, legend_y+legend_box-2, 30, 'rgba(0,0,0,1)');
                }
            };

            Planner.Draw = {
                clear: function(ctx) {
                    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                },
                /*fillRect: function(ctx, x, y, w, h, col, ratio) {
                    console.log(ratio);
                    ctx.fillStyle = col;
                    ctx.lineJoin = "miter";
                    ctx.lineWidth = 1*ratio;
                    var nx = Math.round(x-w*ratio/2);
                    var ny = Math.round(y-h*ratio/2);
                    var nw = Math.round(w*ratio);
                    var nh = Math.round(h*ratio);

                    ctx.strokeRect(nx, ny, nw, nh);
                },+*/
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
                    ctx.font = size+'px Arial';
                    ctx.fillStyle = col;
                    ctx.fillText(string, x, y);
                },
            };

            angular.element($window).ready(function() {

                var edit = false;
                if($scope.allow_edit){ edit = true; }

                var newPlanner = new Planner({options: {edit: edit}});


            });



        }//link end
      };

    }]);

}());
