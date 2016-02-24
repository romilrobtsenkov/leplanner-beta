(function() {
  'use strict';

  angular
    .module('app')
    .directive('timeline', ['$routeParams','$timeout','$window','$filter',
    function($routeParams,$timeout,$window,$filter) {
      return {
        restrict: 'E',
        templateUrl: 'js/app/directives/timeline/timeline.html',
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
                this.timeline = this.WIDTH = this.HEIGHT = null;
                this.ctx = this.temp_ctx = null;
                this.activity_images = [];

                this.init();

            };

            Planner.config = {
                activityImageNames: ['./images/one.png','./images/pair.png','./images/group.png'],
                scenarioWrapperId: '#scenario-wrapper',
                timelineWrapperId: '#scenario-timeline-wrapper',
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
                    this.timeline = document.querySelector(this.config.timelineWrapperId);

                    //assigning group organization images
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

                    this.reDraw();

                },
                resize: function(){

                    // wrapper
                    var timeline_wrapper = document.querySelector(this.config.scenarioWrapperId);
                    var width = timeline_wrapper.offsetWidth;
                    var height = Math.round(timeline_wrapper.offsetWidth * (9/16));

                    //do the defaults
                    this.timeline.style.width = width + 'px';
                    this.timeline.style.height  = height + 'px';

                    //update constants
                    this.WIDTH = width;
                    this.HEIGHT = height;

                    console.log('resize w:' + width + ' h:' + height );

                    //reDraw?
                    this.reDraw();
                },
                reDraw: function(){
                    //In fututer should just reposition elements instead of drawing again
                    this.Draw.clear(this.timeline);
                    this.drawBaseLayer();
                },
                drawBaseLayer: function(){

                    // legend
                    var spaceFromBottom = 30;
                    var box_dim = 15;
                    this.Draw.legend(this.config.legendInClass, 0, this.HEIGHT-spaceFromBottom, box_dim, box_dim, this.config.ColorInClass, this.timeline);
                    this.Draw.legend(this.config.legendOffClass, 200, this.HEIGHT-spaceFromBottom, box_dim, box_dim, this.config.ColorOffClass, this.timeline);

                    //line
                    this.Draw.line(this.WIDTH, this.HEIGHT, 1, 'rgb(0,0,0)', this.timeline);

                }
            };

            Planner.Draw = {
                clear: function(timeline){
                    timeline.innerHTML = '';
                },
                legend: function(text, x, y, box_w, box_h, color, timeline){

                    var style = {
                        top: y + 'px',
                        left: x + 'px',
                        width: box_w + 'px',
                        height: box_h + 'px',
                        backgroundColor: color
                    };

                    var el = this.createElementWithStyle('div','.legend', style);
                    timeline.appendChild(el);

                    var textPadding = 22;
                    var textStyle = {
                        top: y + 'px',
                        left: x + textPadding + 'px'
                    };
                    style.left = x + textPadding + 'px';
                    var textEl = this.createElementWithStyle('div','.legend-text', textStyle, text);
                    timeline.appendChild(textEl);
                },
                line: function(width, height, thickness, color, timeline){
                    var style = {
                        top: height/2 + 'px',
                        left: 0 + 'px',
                        width: width + 'px',
                        height: thickness + 'px',
                        backgroundColor: color
                    };
                    console.log('siin');
                    var el = this.createElementWithStyle('div','.timeline-line', style);
                    timeline.appendChild(el);
                },
                createElementWithStyle: function(type, selector, style, text){
                    var el = document.createElement(type);
                    if(selector.charAt(0) === '.'){
                        el.className = selector.slice(1);
                    }else{
                        el.id = selector.slice(1);
                    }
                    if(style){
                        for (var property in style){
                            el.style[property] = style[property];
                        }
                    }
                    if(text){
                        el.appendChild(document.createTextNode(text));
                    }

                    return el;
                }
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
