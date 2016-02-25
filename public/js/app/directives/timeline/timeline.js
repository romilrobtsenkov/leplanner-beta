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
                this.Activity = Planner.Activity;

                //vars
                this.timeline = this.WIDTH = this.HEIGHT = null;
                this.activities = [];
                this.activities_duration = null;
                this.activity_images = [];

                this.timeouts = [];

                this.init();

            };

            Planner.config = {
                activityImageNames: ['./images/one.png','./images/pair.png','./images/group.png'],
                scenarioWrapperId: '#scenario-wrapper',
                timelineWrapperId: '#scenario-timeline-wrapper',
                ColorInClass: 'rgb(112,207,250)',
                ColorOffClass: 'rgb(255,249,115)',
                ColorMaterialInClass: 'rgb(144,220, 255)',
                ColorMaterialOffClass: 'rgb(255,251,170)',
                legendInClass: 'tunnitegevus (in-class)',
                legendOffClass: 'muu (off-class)',
                aboveAxisLegend: 'õpetaja (teacher)',
                belowAxisLegend: 'õpilane (student)',
                defaultFontSize: 12,
                org_language: 'name_eng'
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

                    this.activities_duration = $scope.scenario.activities_duration;

                    this.resize();
                    //listen with delay
                    window.addEventListener("resize", this.resize.bind(this));

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
                    var border_fix = 2;
                    this.WIDTH = width-border_fix;
                    this.HEIGHT = height;

                    console.log('resize w:' + width + ' h:' + height );

                    //reDraw? ONLY IF WIDTH CHANGED
                    this.reDraw();
                },
                reDraw: function(){
                    //In fututer should just reposition elements instead of drawing again

                    //clear animation timeouts
                    for (var i=0; i<this.timeouts.length; i++) {
                      clearTimeout(this.timeouts[i]);
                    }

                    this.Draw.clear(this.timeline);
                    this.drawBaseLayer();
                    this.initMaterials();
                },
                drawBaseLayer: function(){

                    // legend
                    var spaceFromBottom = 25;
                    var box_dim = 11;
                    this.Draw.legend(this.config.legendInClass, 0+15, this.HEIGHT-spaceFromBottom, box_dim, box_dim, this.config.ColorInClass, this.timeline);
                    this.Draw.legend(this.config.legendOffClass, 160, this.HEIGHT-spaceFromBottom, box_dim, box_dim, this.config.ColorOffClass, this.timeline);

                    //line
                    this.Draw.line(this.WIDTH, this.HEIGHT, 1, 'rgb(0,0,0)', this.timeline);

                },
                drawMaterials: function(){

                },
                initMaterials: function(){

                    if($scope.activity_list.length === 0 ||
                      ($scope.activity_list.length === 1 && $scope.activity_list[0].duration === 0)){
                      alert('please add more acitivty');
                      //TODO write to timeline
                      return;
                    }

                    var start_time = 0;
                    console.log('drawing');
                    this.activities = [];
                    for(var i = 0; i < $scope.activity_list.length; i++){
                      //alert($scope.activity_list.length);
                      var Activity = new this.Activity(i, start_time, $scope.activity_list[i], this);
                      this.activities.push(Activity);

                      start_time += $scope.activity_list[i].duration;

                    }

                }
            };

            Planner.Draw = {
                clear: function(timeline){
                    console.error(timeline);
                    timeline.innerHTML = '';
                    while(timeline.firstChild){
                        timeline.removeChild(timeline.firstChild);
                    }
                    console.log(timeline);
                },
                legend: function(text, x, y, box_w, box_h, color, timeline){

                    var style = {
                        top: y + 'px',
                        left: x + 'px',
                        width: box_w + 'px',
                        height: box_h + 'px',
                        backgroundColor: color
                    };

                    var el = createElementWithStyle('div','.legend', style);
                    timeline.appendChild(el);

                    var textPadding = 17;
                    var textStyle = {
                        top: y + 'px',
                        left: x + textPadding + 'px'
                    };
                    style.left = x + textPadding + 'px';
                    var textEl = createElementWithStyle('div','.legend-text', textStyle, text);
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
                    var el = createElementWithStyle('div','.timeline-line', style);
                    timeline.appendChild(el);
                }
            };

            Planner.Activity = function(index, start_time, data, Planner){

                this.el = null;

                this.index = index;
                this.start = start_time;

                this.timeline = Planner.timeline;
                this.activites_wrapper = null;
                this.activity_wrapper = null;

                this._id = data._id;
              	this.name = data.name;
              	this.duration = data.duration;
                this.materials = data.materials;

                if(typeof data.in_class == 'undefined'){
                  this.in_class = false;
                }else{
                  this.in_class = true;
                }

                this.class_color = null;
                this.material_class_color = null;
                if(this.in_class){
                  this.class_color = Planner.config.ColorInClass;
                  this.material_class_color = Planner.config.ColorMaterialInClass;
                }else{
                  this.class_color = Planner.config.ColorOffClass;
                  this.material_class_color = Planner.config.ColorMaterialOffClass;
                }

                this.organization = data.activity_organization._id;
                this.org_title = '';
                for(var i = 0; i < $scope.activity_organization.length; i++){
                  if($scope.activity_organization[i]._id == this.organization){
                    this.org_title = $scope.activity_organization[i][Planner.config.org_language];
                  }
                }
                this.org_image = Planner.activity_images[this.organization]; //img element

                this.planner_width = Planner.WIDTH;
                this.planner_height = Planner.HEIGHT;

                var padding = 5;

                //minut in px
                var minute_constant = ((this.planner_width-(($scope.activity_list.length+1)*padding))/Planner.activities_duration);

                this.x = parseInt((minute_constant * this.start) + ((this.index+1)* padding));
                this.height = 20;
                this.y = parseInt(this.planner_height/2-this.height/2);
                this.width = parseInt(minute_constant * this.duration);

                //var s = this.index * 1000;
                //console.log(s);
                var timeout_delay = 40; //ms
                Planner.timeouts.push(setTimeout(this.draw.bind(this), timeout_delay*index));
                this.Planner = Planner;
            };

            Planner.Activity.prototype = {

                draw: function(){
                    //alert(this.index);
                    // #activities-wrapper
                    //      .single-activity-wrapper
                    //          .activity-container
                    //              span with content title
                    //              img.activity-org-icon


                    this.activities_wrapper = document.querySelector('#activities-wrapper');
                    if(!this.activities_wrapper){
                        this.activities_wrapper = document.createElement('div');
                        this.activities_wrapper.id = 'activities-wrapper';
                        this.timeline.appendChild(this.activities_wrapper);
                    }

                    var wrapper = document.createElement('div');
                    wrapper.className = 'single-activity-wrapper';

                    var style = {
                        top: this.y + 'px',
                        left: this.x + 'px',
                        width: this.width + 'px',
                        height: this.height + 'px',
                        backgroundColor: this.class_color
                    };
                    var el = createElementWithStyle('div','.activity-container', style, null, {attribute: 'data-id', value: this._id});


                    var text = document.createTextNode(this.name);
                    var span = document.createElement('span');
                    span.appendChild(text);
                    el.appendChild(span);
                    //add visible text if width > 20
                    if(this.width < 30){
                        span.style.display = 'none';
                    }

                    //add icon
                    this.org_image.className = 'activity-org-icon';
                    this.org_image.alt = this.org_title;
                    //cloning element
                    var img_clone = this.org_image.cloneNode();
                    el.appendChild(img_clone);
                    //console.log(this.org_image);
                    //add visible icon if width > 10
                    if(this.width < 20){
                        img_clone.style.display = 'none';
                    }

                    wrapper.appendChild(el);
                    this.activities_wrapper.appendChild(wrapper);

                    this.el = el;
                    this.Planner.timeouts.push(setTimeout(this.drawMaterials.bind(this), 300));
                    //this.drawMaterials();
                    this.bindEvents();


                },
                bindEvents: function(el){
                    this.el.addEventListener('click', function(e){
                        console.log(e);
                        alert(e.target.dataset.id);
                    });

                    this.el.addEventListener('mouseover', this.hover.bind(this), true);

                    this.el.addEventListener('mouseout', this.unHover.bind(this), true);

                },
                hover: function(e){
                    this.el.className += ' activity-container-hover';

                    var expanded_width = 200;

                    if(this.width < expanded_width){

                        this.el.style.width = expanded_width + 'px';

                        if(this.x < expanded_width/2){
                            //expand righy
                            //DO NOTHING WITH ADJUSTMENT
                            //console.log('right');

                        }else if(this.x + expanded_width > this.planner_width) {
                            //expand left
                            this.el.style.left = this.x - (expanded_width - this.width) + 'px';
                            //console.log('left');
                        }else{
                            // expand middle
                            this.el.style.left = this.x - ((expanded_width - this.width)/2) + 'px';
                            //console.log('middle');
                        }

                    }

                    //console.log(this.el);

                    //console.log('hovering ' + e.target.dataset.id);

                },
                unHover: function(e){
                    this.el.className = this.el.className.replace(' activity-container-hover', '');
                    this.el.style.left = this.x  + 'px';
                    this.el.style.width = this.width  + 'px';

                    //console.log('hovering end ' + e.target.dataset.id);
                },
                drawMaterials: function(){

                    var material_height = Math.round(this.planner_width / 39); //39 is just some constant
                    //for now maximum two

                    if(this.materials && this.materials.length > 0){
                        for(var i = 0; i < this.materials.length; i++){

                            var material = this.materials[i];
                            //console.log(material);
                            /*involvment_level;
                            material_name;
                            position;*/
                            var m_height = 16 + (material_height * material.involvement_level);
                            var m_top = this.y + this.height;
                            if(material.position === 'top'){
                                m_top -=  this.height + m_height;
                            }

                            var wrapper_style = {
                                top: m_top + 'px',
                                left: this.x + 'px', //parent left
                                width: this.width + 'px', //parent width
                                height: m_height + 'px',
                            };

                            var style = {
                                backgroundColor: this.material_class_color
                            };
                            //var wrapper_style = style;
                            wrapper_style.backgroundColor = 'transparent';
                            var m_wrapper = createElementWithStyle('div','.material-wrapper '+material.position, wrapper_style);
                            var m_el = createElementWithStyle('div','.material-container '+material.position, style, null);
                            m_el.title = material.material_name; // title for tooltip

                            var name_el;
                            var text = document.createTextNode(material.material_name);

                            // add text or if possible link
                            if(material.material_url){
                                name_el = document.createElement('a');
                                name_el.href = material.material_url;
                                name_el.target = '_blank';
                                name_el.appendChild(text);
                            }else{
                                //also color gray backgroundColor
                                name_el = text;
                            }
                            m_el.appendChild(name_el);

                            m_wrapper.appendChild(m_el);
                            this.activities_wrapper.appendChild(m_wrapper);

                            if(material.conveyor_url){

                                var conveyor_top = m_top;
                                // draw conveyor
                                var conveyor_icon_size = 12;
                                var conveyor_icon = new Image();
                                conveyor_icon.className = 'conveyor-icon';
                                conveyor_icon.src = '/images/favs/icon_'+escapeRegExp(material.conveyor_url)+'.png';
                                conveyor_icon.style.width = conveyor_icon_size + 'px';
                                if(material.position === 'bottom'){
                                    conveyor_top = m_height;
                                }else{
                                    conveyor_top = -conveyor_icon_size -8; //a href line height 4px
                                }

                                style = {
                                    left: this.width - conveyor_icon_size - 8  + 'px',
                                    top: conveyor_top + 'px'
                                };
                                var a = createElementWithStyle('a','.conveyor-container '+material.position, style);
                                a.href = material.conveyor_url;
                                a.target = '_blank';
                                a.title = material.conveyor_name;
                                a.appendChild(conveyor_icon);

                                m_wrapper.appendChild(a);

                                /*
                                    if does not fit then some other solution
                                */

                            }

                            //draw organization
                            if(material.display_id){

                                var display_top = m_top;
                                // draw conveyor
                                var display_icon_size = 12;
                                var display_icon = new Image();
                                display_icon.className = 'display-icon';
                                display_icon.src = 'images/'+$scope.displays_list[material.display_id].icon;
                                display_icon.style.width = display_icon_size + 'px';
                                if(material.position === 'bottom'){
                                    display_top = m_height;
                                }else{
                                    display_top = -display_icon_size -8; //a href line height 4px
                                }

                                style = {
                                    left: 0 + 'px',
                                    top: display_top + 'px'
                                };
                                var d = createElementWithStyle('div','.display-container '+material.position, style);
                                if(material.display_id == $scope.displays_list.length-1){
                                  d.title = material.other_display;
                                }else{
                                  d.title = $scope.displays_list[material.display_id].name;
                                }
                                d.appendChild(display_icon);

                                m_wrapper.appendChild(d);

                            }

                        }
                    }

                }
            };

            /*
                HELPERS
            */
            var createElementWithStyle = function(type, selector, style, text, data){
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

                if(data){
                    el.setAttribute(data.attribute, data.value);
                }

                return el;
            };
            var escapeRegExp = function(str) {
              return str.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
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
