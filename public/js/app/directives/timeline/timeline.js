(function() {
  'use strict';

  angular
    .module('app')
    .directive('timeline', ['$routeParams','$timeout','$window','$filter','$translate',
    function($routeParams,$timeout,$window,$filter,$translate) {
      return {
        restrict: 'E',
        templateUrl: 'js/app/directives/timeline/timeline.html',
        link: function postLink($scope, element, attrs) {

            var Planner = function(options){

                //singleton
                if (Planner.instance_) {
                    return Planner.instance_;
                }
                Planner.instance_ = this;

                this.config = Planner.config;
                if(options && options.edit){ this.config.allow_edit = true; }

                //vars
                this.timeline = this.WIDTH = this.HEIGHT = null;
                this.activities = [];
                this.activities_duration = null;
                this.timeouts = []; //animation timeouts

                this.zoom = false;
                this.activity_min_px_for_zoom = 50;

                // center height
                this.top_percent = 30;

                //resize delay var
                this.resizeDelay = null;

                //translate and then init, TODO better solution in future
                $translate(['BUTTON.EDIT',
                            'CONTENT.TEACHER_RESOURCE',
                            'CONTENT.STUDENT_RESOURCE',
                            'CONTENT.INCLASS_ACTIVITY',
                            'CONTENT.OFFCLASS_ACTIVITY',
                            'CONTENT.TEACHER_RESOURCE',
                            'CONTENT.STUDENT_RESOURCE'
                            ]).then(function (translations) {
                    Planner.instance_.config.edit = translations['BUTTON.EDIT'];
                    Planner.instance_.config.AddaboveAxisLegend = translations['CONTENT.TEACHER_RESOURCE'];
                    Planner.instance_.config.AddbelowAxisLegend = translations['CONTENT.STUDENT_RESOURCE'];
                    Planner.instance_.config.legendInClass = translations['CONTENT.INCLASS_ACTIVITY'];
                    Planner.instance_.config.legendOffClass = translations['CONTENT.OFFCLASS_ACTIVITY'];
                    Planner.instance_.config.aboveAxisLegend = translations['CONTENT.TEACHER_RESOURCE'];
                    Planner.instance_.config.belowAxisLegend = translations['CONTENT.STUDENT_RESOURCE'];

                    Planner.instance_.init();
                });
            };

            Planner.config = {
                activityImageNames: ['./images/one.png','./images/pair.png','./images/group.png','./images/group.png'],
                scenarioWrapperId: '#scenario-wrapper',
                timelineWrapperId: '#scenario-timeline-wrapper',
                ColorInClass: 'rgb(100,126,228)',
                ColorOffClass: 'rgb(92,184,92)',
                ColorMaterialInClass: 'rgb(159,192,255)',
                ColorMaterialOffClass: 'rgb(202,255,190)',
                ColorAddNewButtonInClass: 'rgb(159,192,255)',
                ColorAddNewButtonOffClass: 'rgb(202,255,190)',
                legendInClass: 'tunnitegevus (in-class)',
                legendOffClass: 'muu (off-class)',
                aboveAxisLegend: 'õpetaja (teacher)',
                belowAxisLegend: 'õpilane (student)',
                AddaboveAxisLegend: 'materjal õpetajale (for teacher)',
                AddbelowAxisLegend: 'materjal õpilasele (for student)',
                defaultFontSize: 12,
                org_language: 'name',
                edit: 'Edit',
                add: '+'
            };

            Planner.prototype = {
                init: function(){

                    //assigning canvas
                    this.timeline = document.querySelector(this.config.timelineWrapperId);

                    this.activities_duration = $scope.scenario.activities_duration;

                    this.resize();
                    this.clearTimeline();
                    this.drawBaseLayer();
                    this.initActivities();

                    // Resize
                    var resizer = this.timelineResizeDelay.bind(this);
                    window.addEventListener("resize", resizer);
                    // remove resize listener when navigating away
                    $scope.$on('$destroy', function () {
                        window.removeEventListener("resize", resizer);
                    });

                    //ZOOM
                    window.addEventListener("keypress", this.keyPressed.bind(this));
                    this.timeline.addEventListener("dblclick", this.dblClickEvent.bind(this));

                },
                resize: function(){
                    var border_fix = 24; // for extra padding in the begginning and end for small activities

                    // wrapper
                    var timeline_wrapper = document.querySelector(this.config.scenarioWrapperId);
                    var width = timeline_wrapper.offsetWidth - border_fix;
                    var height = Math.round(timeline_wrapper.offsetWidth * (8/16));
                    this.zoom_start_width = width;

                    if(this.zoom){
                        //box minimum width when zoomed in
                        var min_width = 100;
                        width = (min_width / this.activity_min_px_for_zoom) * width;
                    }

                    //do the defaults
                    this.timeline.style.width = width + 'px';
                    this.timeline.style.height  = height + 'px';

                    //update constants
                    this.WIDTH = width-border_fix;
                    this.HEIGHT = height;
                    //console.log('resize w:' + width + ' h:' + height );
                },
                keyPressed: function(evt){
                    var charCode = evt.which || evt.keyCode;
                    var charStr = String.fromCharCode(charCode);
                    //console.log(charStr.toLowerCase());
                    if(charStr.toLowerCase() === 'z'){
                        this.zoomEvent();
                    }
                },
                dblClickEvent: function(evt){
                    this.zoomEvent();
                    var el = document.querySelector(this.config.scenarioWrapperId);
                    var constant = this.WIDTH / (this.zoom_start_width);
                    //console.log(this.WIDTH + ' ' + constant * evt.offsetX);
                    el.scrollLeft = constant * evt.offsetX;
                },
                zoomEvent: function(){
                    if(this.zoom){
                        this.zoom = false;
                        //fix dblclick scrollleft after zoomout
                        var el = document.querySelector(this.config.scenarioWrapperId);
                        el.scrollLeft = 0;
                    }else{
                        this.zoom = true;
                    }

                    this.timelineResize();
                },
                timelineResizeDelay: function(){
                    clearTimeout(this.resizeDelay);
                    this.resizeDelay = setTimeout(this.timelineResize.bind(this), 200);
                },
                timelineResize: function(){
                    //clear animation timeouts ?
                    for (var i=0; i<this.timeouts.length; i++) {
                      clearTimeout(this.timeouts[i]);
                    }

                    //clear popovers & tooltips
                    jQuery('.has-popover').popover('hide');
                    jQuery('.has-tooltip').tooltip('hide');

                    this.resize();

                    //TODO check if width cahnged in the future

                    this.rePositionTimeline();
                },
                rePositionTimeline: function(){
                    for(var i = 0; i < this.activities.length; i++){
                        //UPDATE STYLE
                        this.activities[i].updateActivitystyle();
                    }
                },
                drawBaseLayer: function(){

                    // legend
                    var spaceFromBottom = 15;
                    var spaceFromTop= 15;
                    var box_dim = 11;
                    this.Drawlegend(this.config.legendInClass, 0+15, spaceFromBottom, box_dim, box_dim, this.config.ColorInClass, this.timeline);
                    this.Drawlegend(this.config.legendOffClass, 160, spaceFromBottom, box_dim, box_dim, this.config.ColorOffClass, this.timeline);

                    //text legend for teacher and student side
                    this.DrawTextlegend(this.config.aboveAxisLegend, spaceFromTop, this.timeline, true); //true for top
                    this.DrawTextlegend(this.config.belowAxisLegend, spaceFromBottom, this.timeline);

                    //line
                    this.DrawLine(this.WIDTH, this.HEIGHT, 1, 'lightgray', this.timeline);

                },
                initActivities: function(){
                    console.log('loading activities');

                    var ScopeList = getScopeList();

                    if(ScopeList.length === 0 ||
                      (ScopeList.length === 1 && ScopeList[0].duration === 0)){

                      if(this.config.allow_edit){
                          $translate('NOTICE.PLEASE_ADD_ACTIVITY').then(function (t) {
                              window.alert(t);
                          });
                      }

                      //TODO write to timeline
                      return;
                    }

                    var start_time = 0;
                    console.log('drawing');
                    this.activities = [];
                    var temp_index = 0;
                    var array_total_length = 0;
                    for(var t = 0; t < ScopeList.length; t++){
                      //alert(getScopeList().length);
                      if(ScopeList[t].duration){
                          //added temp_index and original index for materials update
                          array_total_length++;
                      }
                    }
                    for(var i = 0; i < ScopeList.length; i++){
                      //alert(getScopeList().length);
                      if(ScopeList[i].duration){
                          //added temp_index and original index for materials update
                          var Activity = new Planner.Activity(temp_index, i, start_time, ScopeList[i], array_total_length);
                          this.activities.push(Activity);
                          start_time += ScopeList[i].duration;
                          temp_index++;
                      }
                    }

                },
                clearTimeline: function(){
                    this.timeline.innerHTML = '';
                },
                Drawlegend: function(text, x, y, box_w, box_h, color, timeline){

                    var style = {
                        bottom: y + 'px',
                        left: x + 'px',
                        width: box_w + 'px',
                        height: box_h + 'px',
                    };

                    var el = createElementWithStyle('div','.legend', style);
                    el.setAttribute('style', el.getAttribute('style') +' background-color:'+ color +' !important;');

                    timeline.appendChild(el);

                    var textPadding = 17;
                    var textStyle = {
                        bottom: y + 'px',
                        left: x + textPadding + 'px'
                    };
                    style.left = x + textPadding + 'px';
                    var textEl = createElementWithStyle('div','.legend-text', textStyle, text);
                    timeline.appendChild(textEl);
                },
                DrawTextlegend: function(text, x, timeline, top){

                    var textPadding = 17;
                    var textStyle = {
                        bottom: x + 'px',
                        right: textPadding + 'px'
                    };
                    if(top){
                        textStyle.bottom = 'none';
                        textStyle.top = x + 'px';
                    }

                    var textEl = createElementWithStyle('div','.legend-text', textStyle, text);
                    timeline.appendChild(textEl);
                },
                DrawLine: function(width, height, thickness, color, timeline){
                    var style = {
                        //top: height/2 + 'px',
                        top: this.top_percent + '%',
                        left: 0 + 'px',
                        //width: width + 'px',
                        width: '100%',
                        height: thickness + 'px',
                        backgroundColor: color
                    };
                    var el = createElementWithStyle('div','.timeline-line', style);
                    timeline.appendChild(el);
                },
                reDrawMaterial: function(todo, material_id){

                    for(var i = 0; i < Planner.instance_.activities.length; i++){
                        //update materials from scope for each activity
                        //use correct not fixed index
                        Planner.instance_.activities[i].materials = getScopeList()[Planner.instance_.activities[i].original_index].materials;

                        if(todo === "delete" || todo === "update"){
                            for(var k = 0; k < Planner.instance_.activities[i].materialElements.length; k++){
                                //update materials from scope for each activity
                                if(Planner.instance_.activities[i].materialElements[k].material._id === material_id){


                                    if(Planner.instance_.activities[i].materialElements[k].material.position === 'top'){
                                        Planner.instance_.activities[i].has_top_material = false;
                                    }else{
                                        Planner.instance_.activities[i].has_bottom_material = false;
                                    }

                                    Planner.instance_.activities[i].materialElements.splice(k, 1);
                                    console.log('deleted material from timeline');

                                    //delete from DOM
                                    document.querySelector('#activities-wrapper').removeChild(document.querySelector('div.material-wrapper[data-id="'+material_id+'"]'));
                                }
                            }
                        }

                        if(todo === "new" || todo === "update"){
                            //draw new materials, skip if exists
                            Planner.instance_.activities[i].drawMaterials();
                        }else if (todo === "delete") {
                            //Add add-new button
                            Planner.instance_.activities[i].updateAddNewButtons();
                        }

                    }//for end

                },
                findMaterial: function(id){
                    for(var i = 0; i < Planner.instance_.activities.length; i++){
                        for(var k = 0; k < Planner.instance_.activities[i].materialElements.length; k++){
                            if(Planner.instance_.activities[i].materialElements[k].material._id === id){
                                return Planner.instance_.activities[i].materialElements[k].material;
                            }
                        }
                    }

                }
            };

            Planner.Activity = function(index, original_index, start_time, data, array_total_length){

                //INCOMING
                this.index = index;
                this.original_index = original_index;
                this.start = start_time;
                this.array_total_length = array_total_length;

                //ELEMENTS
                this.timeline = Planner.instance_.timeline;
                this.activites_wrapper = null;
                this.activity_wrapper = null;
                this.element = null;
                this.text_span = null;

                //MAIN DATA
                this._id = data._id;
              	this.name = data.name;
              	this.duration = data.duration;
                this.materials = data.materials;
                this.has_top_material = false;
                this.has_bottom_material = false;
                if(typeof data.in_class === 'undefined'){
                  this.in_class = false;
                }else{
                  this.in_class = true;
                }
                if(this.in_class){
                  this.class_color = Planner.instance_.config.ColorInClass;
                  this.material_class_color = Planner.instance_.config.ColorMaterialInClass;
                  this.add_new_button_color =  Planner.instance_.config.ColorAddNewButtonInClass;
                }else{
                  this.class_color = Planner.instance_.config.ColorOffClass;
                  this.material_class_color = Planner.instance_.config.ColorMaterialOffClass;
                  this.add_new_button_color =  Planner.instance_.config.ColorAddNewButtonOffClass;
                }
                this.materialElements = [];

                // ADDING ORG
                this.organization = data.activity_organization;
                this.org_image = new Image();
                this.conveyor_icon_size = this.display_icon_size = 12;
                this.duration_mark = 'min'; //can be changed if needed

                // EXTRA
                this.x = this.height = this.y = this.width = this.minute_constant = this.material_height = null;

                //CALCULAT NECCESERT VARIABLES
                this.calculateVariables();

                var timeout_delay = 40; //ms
                Planner.instance_.timeouts.push(setTimeout(this.createActivity.bind(this), timeout_delay*index));
            };

            Planner.Activity.prototype = {
                calculateVariables: function(){

                    var padding = 5; //between activities
                    var start_padding = 19;

                    this.minute_constant = ((Planner.instance_.WIDTH-((this.array_total_length+1)*padding))/Planner.instance_.activities_duration); // min in px

                    // fix for extra short activities in beginning or end
                    if (this.start === 0) {
                        this.x = start_padding + ((this.index+1)* padding);
                    }else{
                        this.x = (this.minute_constant * this.start) + ((this.index+1)* padding) + start_padding;
                    }

                    this.height = 20;
                    this.y = parseInt((Planner.instance_.HEIGHT*Planner.instance_.top_percent/100)-this.height/2);
                    this.width = parseInt(this.minute_constant * this.duration);

                    // fix for extra short activities
                    if (this.width === 0) { this.width = 2; }

                    if(this.width < Planner.instance_.activity_min_px_for_zoom){
                        Planner.instance_.activity_min_px_for_zoom = this.width;
                    }
                    //var height_dim = Planner.instance_.HEIGHT * Planner.instance_.top_percent / 100;
                    this.material_height = Math.round(Planner.instance_.HEIGHT * Planner.instance_.HEIGHT  / 6000); // 6000 is just some constant, used in level * this

                },
                createActivity: function(){

                    //STRUCTURE
                    // #activities-wrapper
                    //      .single-activity-wrapper
                    //          .activity-container
                    //              span.activity-text-container
                    //              img.activity-org-icon

                    // ALL ACTIVITIES WRAPPER
                    this.activities_wrapper = document.querySelector('#activities-wrapper');
                    if(!this.activities_wrapper){
                        this.activities_wrapper = createElementWithStyle('div','#activities-wrapper');
                        this.timeline.appendChild(this.activities_wrapper);
                    }

                    // ELEMENT
                    var style = this.getActivityStyle();
                    var el = createElementWithStyle('div','.activity-container', style, null, {attribute: 'data-id', value: this._id});
                    //for printing
                    el.setAttribute('style', el.getAttribute('style') +' background-color:'+ this.class_color +' !important;');

                    // TEXT & DURATION
                    var span_style = this.getSpanStyle();
                    this.text_span = createElementWithStyle('span','.activity-text-container', span_style);
                    var text = document.createTextNode(this.name);
                    this.duration_span = createElementWithStyle('span','.activity-duration-container');
                    this.duration_min_span = createElementWithStyle('span','.activity-duration-min-container');
                    var duration = document.createTextNode(this.duration);
                    this.duration_span.appendChild(duration);
                    this.duration_min_span.appendChild(document.createTextNode(this.duration_mark));
                    this.duration_span.appendChild(this.duration_min_span);
                    this.text_span.appendChild(this.duration_span);
                    this.text_span.appendChild(text);
                    el.appendChild(this.text_span);

                    // ORG ICON
                    var org_icon_style = this.getOrgIconStyle();
                    this.org_image.src = Planner.instance_.config.activityImageNames[this.organization._id];
                    this.org_image.className = 'activity-org-icon';
                    this.org_image.alt = this.organization.name;
                    setElementStyle(this.org_image, org_icon_style);
                    el.appendChild(this.org_image);

                    //ORG ICON TEXT
                    var org_title = document.createTextNode(this.organization.name);
                    this.org_title_span = createElementWithStyle('span','.activity-org-title');
                    this.org_title_span.appendChild(org_title);
                    el.appendChild(this.org_title_span);

                    // APPEND ELEMENT
                    this.activities_wrapper.appendChild(el);
                    this.element = el;

                    // CREATE MATERIALS
                    Planner.instance_.timeouts.push(setTimeout(this.drawMaterials.bind(this), 300));
                    this.bindEvents();
                },
                getActivityStyle: function(){
                    return {
                        top: this.y + 'px',
                        left: this.x + 'px',
                        width: this.width + 'px',
                        height: this.height + 'px'
                    };
                },
                getSpanStyle: function(){
                    var style = {};
                    // hide text if width less than
                    if(this.width < 30){
                        style.display = 'none';
                    }else{
                        style.display = 'block';
                    }
                    return style;
                },
                getOrgIconStyle: function(){
                    var style = {};
                    // hide text if width less than
                    if(this.width < 20){
                        style.display = 'none';
                    }else{
                        style.display = 'block';
                    }
                    return style;
                },
                updateActivitystyle: function(){
                    //UPDATE vars
                    this.calculateVariables();

                    // ELEMENT
                    var style = this.getActivityStyle();
                    setElementStyle(this.element, style);

                    // TEXT
                    var span_style = this.getSpanStyle();
                    setElementStyle(this.text_span, span_style);

                    // ORG ICON
                    var org_icon_style = this.getOrgIconStyle();
                    setElementStyle(this.org_image, org_icon_style);

                    this.updateMaterials();
                },
                bindEvents: function(el){
                    this.element.addEventListener('mouseover', this.hover.bind(this), true);
                    this.element.addEventListener('mouseout', this.unHover.bind(this), true);
                },
                hover: function(e){
                    this.element.className += ' activity-container-hover';
                    var expanded_width = 200;
                    //check which way to expand, and is expandable
                    if(this.width < expanded_width){
                        this.element.style.width = expanded_width + 'px';
                        if(this.x < expanded_width/2){
                            //expand righy
                            //DO NOTHING WITH ADJUSTMENT
                        }else if(this.x + expanded_width > Planner.instance_.WIDTH) {
                            //expand left
                            this.element.style.left = this.x - (expanded_width - this.width) + 'px';
                        }else{
                            // expand middle
                            this.element.style.left = this.x - ((expanded_width - this.width)/2) + 'px';
                        }
                    }
                },
                unHover: function(e){
                    this.element.className = this.element.className.replace(' activity-container-hover', '');
                    this.element.style.left = this.x  + 'px';
                    this.element.style.width = this.width  + 'px';
                },
                drawMaterials: function(){

                    // IF there ARE ANY
                    if(this.materials && this.materials.length > 0){

                        //FOR every material
                        for(var i = 0; i < this.materials.length; i++){

                            // .material-wrapper top/bottom
                            //      .material-container bottom
                            //          a > text
                            //      a.conveyor-container top/bottom
                            //          img.conveyor-icon
                            //      .display-container bottom
                            //          img.display-icon

                            var material = this.materials[i];

                            if(!this.materialExists(material)){
                                //console.log('new');
                                // WRAPPER ELEMENT
                                var wrapper_style = this.getMateriaMainStyle(material);
                                var material_wrapper = createElementWithStyle('div','.material-wrapper '+material.position, wrapper_style, null, {attribute: 'data-id', value: material._id});

                                // MATERIAL ITSELF
                                var m_el = createElementWithStyle('div','.material-container '+material.position);
                                m_el.title = material.material_name; // title for tooltip
                                //for print, there needs to be !important
                                m_el.setAttribute('style', 'background-color:'+ this.material_class_color +' !important;');

                                // MATERIAL MAIN TEXT
                                var text_el = null;
                                var text = document.createTextNode(material.material_name);

                                // IF DIGITAL MATERIAL ADD LINK
                                if(material.material_url){
                                    text_el = document.createElement('a');
                                    text_el.href = $filter('prefixHttp')(material.material_url);
                                    text_el.target = '_blank';
                                    text_el.appendChild(text);
                                }else{
                                    // no link
                                    text_el = text;
                                }
                                m_el.appendChild(text_el);

                                // APPEND MATERIAL
                                material_wrapper.appendChild(m_el);
                                this.activities_wrapper.appendChild(material_wrapper);

                                //CONVEYOR
                                var conveyors = [];
                                //console.log(material.conveyors);
                                if(material.conveyors && material.conveyors.length > 0){

                                    for(var k = material.conveyors.length-1; k >= 0 ; k--){

                                        var current_conveyor = material.conveyors[k];

                                        if(current_conveyor.name){

                                            var conveyor_style = this.getConveyorStyle(material, wrapper_style, k, material.conveyors.length);

                                            // LINK TO CONVEYOR
                                            var conveyor = createElementWithStyle('a','.conveyor-container '+material.position, conveyor_style);
                                            if(current_conveyor.url){
                                                // ICON IMAGE
                                                var conveyor_icon = new Image();
                                                conveyor_icon.className = 'conveyor-icon';
                                                conveyor_icon.src = 'http://www.google.com/s2/favicons?domain='+current_conveyor.url;
                                                conveyor_icon.style.width = this.conveyor_icon_size + 'px';
                                                conveyor_icon.style.height = this.conveyor_icon_size + 'px';
                                                conveyor.appendChild(conveyor_icon);

                                                conveyor.href = $filter('prefixHttp')(current_conveyor.url);
                                                conveyor.target = '_blank';
                                            }
                                            //conveyor.title = current_conveyor.name; hide for popover_content
                                            conveyor.setAttribute('data-popdata', current_conveyor.name);

                                            //APPEND CONVEYOR
                                            material_wrapper.appendChild(conveyor);

                                            conveyors.push({index: k, conveyor: conveyor});
                                        }
                                    }

                                    //if not empty conveyor names
                                    if(conveyors.length !== 0){
                                        var last_conveyor = conveyors[conveyors.length-1].conveyor;
                                        last_conveyor.className += " has-popover";
                                        last_conveyor.setAttribute('data-toggle', 'popover');

                                        //create HTML
                                        var popover_content = document.createElement('div');
                                        for(var d = 0; d < conveyors.length; d++){

                                            var conveyor_clone = conveyors[d].conveyor.cloneNode(true);
                                            var textdata = document.createTextNode(conveyor_clone.dataset.popdata);
                                            conveyor_clone.appendChild(textdata);
                                            conveyor_clone.className = "inner-conveyor-icon";
                                            popover_content.appendChild(conveyor_clone);

                                            // remove hrefs for clicks
                                            conveyors[d].conveyor.removeAttribute('href');
                                        }
                                        this.createPopover(last_conveyor, popover_content);
                                    }
                                }

                                // DISPLAY
                                var displays = [];
                                //adpat to displays
                                //console.log(material.displays);
                                if(material.displays && material.displays.length > 0){

                                    for(var j = 0; j < material.displays.length; j++){

                                        var current_display = material.displays[j];
                                        // DISPLAY IMAGE
                                        var display_icon = new Image();
                                        display_icon.className = 'display-icon';
                                        display_icon.src = 'images/'+current_display.icon;
                                        display_icon.style.width = this.display_icon_size + 'px';
                                        display_icon.style.height = this.display_icon_size + 'px';

                                        var display_style = this.getDisplayStyle(material, wrapper_style, j, material.displays.length);

                                        // DISPLAY CONTAINER DIV
                                        var display = createElementWithStyle('div','.display-container '+material.position, display_style);
                                        //display.title = $scope.displays_list[current_display].name; hide for popover

                                        //name for popover
                                        if(current_display._id === 5){
                                            //OTHER
                                            display.setAttribute("data-popdata", material.other_display);
                                        }else{
                                            display.setAttribute("data-popdata", current_display.name);
                                        }

                                        display.appendChild(display_icon);

                                        //APPEND DISPLAY
                                        material_wrapper.appendChild(display);
                                        displays.push({index: j, display: display});
                                    }

                                    // BOOTSTRAP POPOVER for first display even if has multiple
                                    var last_display = displays[displays.length-1].display;
                                    last_display.className += " has-popover";
                                    last_display.setAttribute('data-toggle', 'popover');
                                    //create HTML
                                    var pop_content = document.createElement('div');
                                    for(var e = 0; e < displays.length; e++){

                                        var display_clone = displays[e].display.cloneNode(true);
                                        var display_textdata = document.createTextNode(display_clone.dataset.popdata);
                                        display_clone.appendChild(display_textdata);
                                        display_clone.className = "inner-display-icon";
                                        pop_content.appendChild(display_clone);
                                    }
                                    this.createPopover(last_display, pop_content);

                                }

                                //EDIT LINK IF IN EDIT MODE
                                if(Planner.instance_.config.allow_edit){
                                    var edit_overflow = createElementWithStyle('a','.material-edit '+material.position, {backgroundColor: 'rgba(0,0,0,0.2)'});
                                    edit_overflow.title = Planner.instance_.config.edit; // title for tooltip
                                    var edit_text = document.createTextNode(Planner.instance_.config.edit);
                                    var edit_text_span = document.createElement('span');
                                    edit_text_span.appendChild(edit_text);
                                    edit_overflow.appendChild(edit_text_span);
                                    material_wrapper.appendChild(edit_overflow);
                                    //calculate word widht depending on language
                                    if(edit_text_span.offsetWidth){
                                        edit_text_span.style.marginLeft = -edit_text_span.offsetWidth/2 + 'px';
                                    }

                                    this.bindOpenModal(edit_overflow, material.position, material._id);
                                }

                                if(material.position === 'top'){
                                    this.has_top_material = true;
                                }else if (material.position === 'bottom') {
                                    this.has_bottom_material = true;
                                }

                                // FOR UPDATING STYlES LATER
                                this.materialElements.push({
                                    material: material,
                                    element: material_wrapper,
                                    conveyors: conveyors,
                                    displays: displays
                                });

                            } // exists end

                        } //for end
                    } // if there are any end

                    this.updateAddNewButtons();

                },
                createPopover: function(el, content){
                    // BOOTSTRAP - http://stackoverflow.com/questions/15989591/how-can-i-keep-bootstrap-popover-alive-while-the-popover-is-being-hovered
                    jQuery(el).popover({
                        animation: false,
                        content: content,
                        trigger: 'manual',
                        container: "#scenario-timeline-wrapper",
                        viewport: "#scenario-timeline-wrapper",
                        placement: 'right auto',
                        html: true
                    }).on("mouseenter", function () {
                        var _this = this;

                        //clear popovers
                        jQuery('.has-popover').popover('hide');

                        jQuery(this).popover("show");
                        jQuery(".popover").on("mouseleave", function () {
                            jQuery(_this).popover('hide');
                        });
                    }).on("mouseleave", function () {
                        var _this = this;
                        setTimeout(function () {
                        if (!jQuery(".popover:hover").length) {
                            jQuery(_this).popover("hide");
                        }
                        }, 300);
                    });
                },
                materialExists: function(material){
                    for(var i = 0; i < this.materialElements.length; i++){
                        if(this.materialElements[i].material._id === material._id){
                            //console.log('exists');
                            return true;
                        }
                    }

                    return false;
                },
                addNewButtonExists: function(class_name, activity_id){
                    return document.querySelector('div.new-material-button.'+class_name+'[data-id="'+activity_id+'"]');
                },

                updateAddNewButtons: function(){
                    //ADD NEW LINKS IF IN EDIT MODE
                    if(Planner.instance_.config.allow_edit){
                        //for every empty space
                        var activity = this;
                        var top_button = this.addNewButtonExists('top', activity._id);
                        var bottom_button = this.addNewButtonExists('bottom', activity._id);

                        if(!this.has_top_material && !top_button){
                            //console.log('created new top');
                            var top_style = this.getAddNewButtonStyle('top');
                            var top_overflow = this.createAddButtonOverflow(top_style, 'top', activity._id);
                            this.activities_wrapper.appendChild(top_overflow);
                            top_overflow.addEventListener('click', function(){
                                //console.log('click top');
                                $scope.openAddMaterialModal(activity, 'top');

                            });

                        }else if(this.has_top_material && top_button){
                            // remove, is unneccesery
                            this.activities_wrapper.removeChild(top_button);
                            //console.log('should remove');
                        }

                        if(!this.has_bottom_material && !bottom_button){
                            //console.log('created new bottom');
                            var bottom_style = this.getAddNewButtonStyle('bottom');
                            var bottom_overflow = this.createAddButtonOverflow(bottom_style, 'bottom', activity._id);
                            this.activities_wrapper.appendChild(bottom_overflow);
                            bottom_overflow.addEventListener('click', function(){
                                //console.log('click bottom');
                                $scope.openAddMaterialModal(activity, 'bottom');

                            });

                        }else if(this.has_bottom_material && bottom_button){
                            // remove, is unneccesery
                            this.activities_wrapper.removeChild(bottom_button);
                            //console.log('should remove bottom');
                        }
                    }
                },
                bindOpenModal: function(element, pos, id){
                    var activity = this;
                    element.addEventListener('click', function(){
                        //console.log('edit click' + i);
                        $scope.openEditMaterialModal(activity, pos, Planner.instance_.findMaterial(id));
                    });
                },
                createAddButtonOverflow: function(style, pos, activity_id){
                    //console.log(activity_id);
                    var button_wrapper = createElementWithStyle('div','.new-material-button '+pos, style, null, {attribute: 'data-id', value: activity_id});
                    button_wrapper.setAttribute('style', button_wrapper.getAttribute('style') +' background-color:'+ style.backgroundColor +' !important;');

                    var button_overflow = createElementWithStyle('a','.new-add has-tooltip '+pos, {backgroundColor: 'rgba(0,0,0,0.2)'});
                    var add_text = document.createTextNode(Planner.instance_.config.add);
                    var add_text_span = document.createElement('span');
                    add_text_span.appendChild(add_text);
                    button_overflow.appendChild(add_text_span);
                    button_wrapper.appendChild(button_overflow);

                    //add tooltip
                    if(pos === "top"){
                        button_overflow.title = Planner.instance_.config.AddaboveAxisLegend;
                        jQuery(button_overflow).tooltip({container: '#scenario-timeline-wrapper', animation: false, placement: "auto "+pos, html: true});
                    }else if(pos === "bottom"){
                        button_overflow.title = Planner.instance_.config.AddbelowAxisLegend;
                        jQuery(button_overflow).tooltip({container: '#scenario-timeline-wrapper', animation: false, placement: "auto "+pos, html: true});
                    }

                    return button_wrapper;
                },
                getMateriaMainStyle: function(material){

                    var m_height = 29 + (this.material_height * material.involvement_level);

                    // DISABLE teacher involvement_level
                    if(material.position === 'top'){
                        m_height = 10 + this.material_height;
                    }

                    var m_top = this.y + this.height;
                    if(material.position === 'top'){
                        m_top -=  this.height + m_height;
                    }

                    return {
                        top: m_top + 'px',
                        left: this.x + 'px', //parent left
                        width: this.width + 'px', //parent width
                        height: m_height + 'px',
                        backgroundColor: 'transparent',
                    };
                },
                getConveyorStyle: function(material, material_style, index, count){
                    var padding_top = 4;

                    var conveyor_top = null;
                    if(material.position === 'top'){
                        conveyor_top = -this.conveyor_icon_size -8 - padding_top;
                    }else{
                        conveyor_top = parseInt(material_style.height.replace('px',''));
                        conveyor_top += padding_top;
                    }

                    /* TODO IF there is no room, hide */
                    var padding = 3;

                    return {
                        left: this.width - this.conveyor_icon_size - 8 - count*padding + index * padding + padding  + 'px',
                        top: conveyor_top + 'px'
                    };
                },
                getDisplayStyle: function(material, material_style, index, count){

                    var padding_top = 4;

                    var display_top = null;
                    if(material.position === 'top'){
                        display_top = -this.conveyor_icon_size -8 - padding_top;
                    }else{
                        display_top = parseInt(material_style.height.replace('px',''));
                        display_top += padding_top;
                    }

                    var padding = 3;

                    return {
                        left: count*padding - index * padding - padding+ 'px',
                        top: display_top + 'px'
                    };
                },
                getAddNewButtonStyle: function(position){

                    var height = 30;
                    var width = 30;
                    var margin = 10;

                    var top = this.y + this.height + margin;
                    if(position === 'top'){
                        top -=  this.height + height + margin*2;
                    }
                    return {
                        top: top + 'px',
                        left: (this.x + this.width/2 - width/2)+ 'px', //parent left
                        width: width + 'px', //parent width
                        height: height + 'px',
                        backgroundColor: this.add_new_button_color,
                    };
                },
                updateMaterials: function(){
                    //if there are any
                    if(this.materialElements.length > 0){

                        for(var i = 0; i < this.materialElements.length; i++){

                            var material = this.materialElements[i].material;
                            var material_element = this.materialElements[i].element;
                            var conveyors = this.materialElements[i].conveyors;
                            var displays = this.materialElements[i].displays;

                            //MATERIAL
                            var material_style = this.getMateriaMainStyle(material);
                            setElementStyle(material_element, material_style);

                            //CONVEYORS
                            if(conveyors.length > 0){
                                for(var k = 0; k < conveyors.length; k++){
                                    var conveyor_style = this.getConveyorStyle(material, material_style, k, conveyors.length);
                                    setElementStyle(conveyors[k].conveyor, conveyor_style);
                                }
                            }

                            //DISPLAYS
                            if(displays.length > 0){
                                for(var j = 0; j < displays.length; j++){
                                    var display_style = this.getDisplayStyle(material, material_style, j, displays.length);
                                    setElementStyle(displays[j].display, display_style);
                                }
                            }

                        }

                    }

                    //update add new button position
                    if(Planner.instance_.config.allow_edit){
                        //for every empty space
                        var activity = this;
                        var button_top = this.addNewButtonExists('top', activity._id);
                        var button_bottom = this.addNewButtonExists('bottom', activity._id);

                        if(button_top){
                            //console.log('created new top');
                            var top_style = this.getAddNewButtonStyle('top');
                            setElementStyle(button_top, top_style);
                            //for printig
                            button_top.setAttribute('style', button_top.getAttribute('style') +' background-color:'+ top_style.backgroundColor +' !important;');
                        }

                        if(button_bottom){
                            //console.log('created new bottom');
                            var bottom_style = this.getAddNewButtonStyle('bottom');
                            setElementStyle(button_bottom, bottom_style);
                            button_bottom.setAttribute('style', button_bottom.getAttribute('style') +' background-color:'+ bottom_style.backgroundColor +' !important;');
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
                    setElementStyle(el, style);
                }
                if(text){
                    el.appendChild(document.createTextNode(text));
                }

                if(data){
                    el.setAttribute(data.attribute, data.value);
                }

                return el;
            };
            var setElementStyle = function(el, style){
                if(style){
                    for (var property in style){
                        el.style[property] = style[property];
                    }
                }
            };
            var escapeRegExp = function(str) {
                return str.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            };

            var getScopeList = function(){
                //return $scope.activity_list;
                return $scope.scenario.activities;
            };

            angular.element($window).ready(function() {
                console.log('ready');
                var edit = false;
                if($scope.allow_edit){ edit = true;}
                var newPlanner = new Planner({edit: edit});

                // !IMPORTANT enable redraw fn in controller
                if(edit === true){
                  $scope.setreDrawMaterialFunction({theDirFn: Planner.instance_.reDrawMaterial});
                }
            });

        }//link end
      };

    }]);

}());
