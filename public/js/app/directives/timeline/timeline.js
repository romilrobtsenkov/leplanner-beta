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
                this.activity_images = [];
                this.timeouts = []; //animation timeouts

                //resize delay var
                this.resizeDelay = null;

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
                ColorAddNewButtonInClass: 'rgb(144,220, 255)',
                ColorAddNewButtonOffClass: 'rgb(255,251,170)',
                legendInClass: 'tunnitegevus (in-class)',
                legendOffClass: 'muu (off-class)',
                aboveAxisLegend: 'õpetaja (teacher)',
                belowAxisLegend: 'õpilane (student)',
                defaultFontSize: 12,
                org_language: 'name_eng',
                edit: 'edit',
                add: 'add'
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
                    this.clearTimeline();
                    this.drawBaseLayer();
                    this.initActivities();

                    window.addEventListener("resize", this.timelineResizeDelay.bind(this));

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
                    //console.log('resize w:' + width + ' h:' + height );
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
                    var box_dim = 11;
                    this.Drawlegend(this.config.legendInClass, 0+15, spaceFromBottom, box_dim, box_dim, this.config.ColorInClass, this.timeline);
                    this.Drawlegend(this.config.legendOffClass, 160, spaceFromBottom, box_dim, box_dim, this.config.ColorOffClass, this.timeline);

                    //line
                    this.DrawLine(this.WIDTH, this.HEIGHT, 1, 'rgb(0,0,0)', this.timeline);

                },
                initActivities: function(){
                    console.log('loading activities');

                    var ScopeList = getScopeList();

                    if(ScopeList.length === 0 ||
                      (ScopeList.length === 1 && ScopeList[0].duration === 0)){
                      alert('please add more acitivty');
                      //TODO write to timeline
                      return;
                    }

                    var start_time = 0;
                    console.log('drawing');
                    this.activities = [];
                    for(var i = 0; i < ScopeList.length; i++){
                      //alert(getScopeList().length);
                      var Activity = new Planner.Activity(i, start_time, ScopeList[i]);
                      this.activities.push(Activity);

                      start_time += ScopeList[i].duration;

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
                        backgroundColor: color
                    };

                    var el = createElementWithStyle('div','.legend', style);
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
                DrawLine: function(width, height, thickness, color, timeline){
                    var style = {
                        //top: height/2 + 'px',
                        top: '50%',
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
                        Planner.instance_.activities[i].materials = getScopeList()[i].materials;

                        if(todo === "delete" || todo === "update"){
                            for(var k = 0; k < Planner.instance_.activities[i].materialElements.length; k++){
                                //update materials from scope for each activity
                                if(Planner.instance_.activities[i].materialElements[k].material._id == material_id){


                                    if(Planner.instance_.activities[i].materialElements[k].material.position === 'top'){
                                        Planner.instance_.activities[i].has_top_material = false;
                                    }else{
                                        Planner.instance_.activities[i].has_top_material = false;
                                    }

                                    Planner.instance_.activities[i].materialElements.splice(k, 1);
                                    //console.log('deleted material from timeline');

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

                }
            };

            Planner.Activity = function(index, start_time, data){

                //INCOMING
                this.index = index;
                this.start = start_time;

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
                if(typeof data.in_class == 'undefined'){
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
                this.organization = data.activity_organization._id;
                this.org_title = '';
                for(var i = 0; i < $scope.activity_organization.length; i++){
                  if($scope.activity_organization[i]._id == this.organization){
                    this.org_title = $scope.activity_organization[i][Planner.instance_.config.org_language];
                  }
                }
                this.org_image = Planner.instance_.activity_images[this.organization].cloneNode(); //img element
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

                    this.minute_constant = ((Planner.instance_.WIDTH-((getScopeList().length+1)*padding))/Planner.instance_.activities_duration); // min in px
                    this.x = parseInt((this.minute_constant * this.start) + ((this.index+1)* padding));
                    this.height = 20;
                    this.y = parseInt(Planner.instance_.HEIGHT/2-this.height/2);
                    this.width = parseInt(this.minute_constant * this.duration);

                    this.material_height = Math.round(Planner.instance_.WIDTH / 30); //30 is just some constant, used in level * this

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
                    this.org_image.className = 'activity-org-icon';
                    this.org_image.alt = this.org_title;
                    setElementStyle(this.org_image, org_icon_style);
                    el.appendChild(this.org_image);

                    //ORG ICON TEXT
                    var org_title = document.createTextNode(this.org_title);
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
                        height: this.height + 'px',
                        backgroundColor: this.class_color
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
                                var m_el = createElementWithStyle('div','.material-container '+material.position, {backgroundColor: this.material_class_color});
                                m_el.title = material.material_name; // title for tooltip

                                // MATERIAL MAIN TEXT
                                var text_el = null;
                                var text = document.createTextNode(material.material_name);

                                // IF DIGITAL MATERIAL ADD LINK
                                if(material.material_url){
                                    text_el = document.createElement('a');
                                    text_el.href = material.material_url;
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
                                var conveyor = null;
                                if(material.conveyor_url){

                                    // ICON IMAGE
                                    var conveyor_icon = new Image();
                                    conveyor_icon.className = 'conveyor-icon';
                                    conveyor_icon.src = '/images/favs/icon_'+escapeRegExp(material.conveyor_url)+'.png';
                                    conveyor_icon.style.width = this.conveyor_icon_size + 'px';

                                    var conveyor_style = this.getConveyorStyle(material, wrapper_style);

                                    // LINK TO CONVEYOR
                                    conveyor = createElementWithStyle('a','.conveyor-container '+material.position, conveyor_style);
                                    conveyor.href = material.conveyor_url;
                                    conveyor.target = '_blank';
                                    conveyor.title = material.conveyor_name;
                                    conveyor.appendChild(conveyor_icon);

                                    //APPEND CONVEYOR
                                    material_wrapper.appendChild(conveyor);
                                }

                                // DISPLAY
                                var display = null;
                                if(material.display_id !== null && typeof material.display_id !== 'undefined'){
                                    // DISPLAY IMAGE
                                    var display_icon = new Image();
                                    display_icon.className = 'display-icon';
                                    display_icon.src = 'images/'+$scope.displays_list[material.display_id].icon;
                                    display_icon.style.width = this.display_icon_size + 'px';

                                    var display_style = this.getDisplayStyle(material, wrapper_style);

                                    // DISPLAY CONTAINER DIV
                                    display = createElementWithStyle('div','.display-container '+material.position, display_style);
                                    if(material.display_id == $scope.displays_list.length-1){
                                        //other display, user wrote name
                                        display.title = material.other_display;
                                    }else{
                                        display.title = $scope.displays_list[material.display_id].name;
                                    }
                                    display.appendChild(display_icon);

                                    //APPEND DISPLAY
                                    material_wrapper.appendChild(display);
                                }

                                //EDIT LINK IF IN EDIT MODE
                                if(Planner.instance_.config.allow_edit){
                                    var edit_overflow = createElementWithStyle('a','.material-edit '+material.position, {backgroundColor: 'rgba(0,0,0,0.2)'});
                                    edit_overflow.title = 'Edit'; // title for tooltip
                                    var edit_text = document.createTextNode('Edit');
                                    var edit_text_span = document.createElement('span');
                                    edit_text_span.appendChild(edit_text);
                                    edit_overflow.appendChild(edit_text_span);
                                    material_wrapper.appendChild(edit_overflow);

                                    this.bindOpenModal(edit_overflow, material.position, i);
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
                                    conveyor: conveyor,
                                    display: display
                                });

                            } // exists end

                        } //for end
                    } // if there are any end

                    this.updateAddNewButtons();

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
                        if(!this.has_top_material && !this.addNewButtonExists('top', activity._id)){
                            //console.log('created new top');
                            var top_style = this.getAddNewButtonStyle('top');
                            var top_overflow = this.createAddButtonOverflow(top_style, 'top', activity._id);
                            this.activities_wrapper.appendChild(top_overflow);
                            top_overflow.addEventListener('click', function(){
                                //console.log('click top');
                                $scope.openAddMaterialModal(activity, 'top');

                            });

                        }else if(this.has_top_material && this.addNewButtonExists('top', activity._id)){
                            // remove, is unneccesery
                            this.activities_wrapper.removeChild(this.addNewButtonExists('top', activity._id));
                            //console.log('should remove');
                        }

                        if(!this.has_bottom_material && !this.addNewButtonExists('bottom', activity._id)){
                            //console.log('created new bottom');
                            var bottom_style = this.getAddNewButtonStyle('bottom');
                            var bottom_overflow = this.createAddButtonOverflow(bottom_style, 'bottom', activity._id);
                            this.activities_wrapper.appendChild(bottom_overflow);
                            bottom_overflow.addEventListener('click', function(){
                                //console.log('click bottom');
                                $scope.openAddMaterialModal(activity, 'bottom');

                            });

                        }else if(this.has_bottom_material && this.addNewButtonExists('bottom', activity._id)){
                            // remove, is unneccesery
                            this.activities_wrapper.removeChild(this.addNewButtonExists('bottom', activity._id));
                            //console.log('should remove bottom');
                        }
                    }
                },
                bindOpenModal: function(element, pos, i){
                    var activity = this;
                    element.addEventListener('click', function(){
                        //console.log('edit click' + i);
                        $scope.openEditMaterialModal(activity, pos, activity.materials[i]);
                    });
                },
                createAddButtonOverflow: function(style, pos, activity_id){
                    //console.log(activity_id);
                    var button_wrapper = createElementWithStyle('div','.new-material-button '+pos, style, null, {attribute: 'data-id', value: activity_id});
                    var button_overflow = createElementWithStyle('a','.new-add '+pos, {backgroundColor: 'rgba(0,0,0,0.2)'});
                    button_overflow.title = 'Add'; // title for tooltip
                    var add_text = document.createTextNode('Add');
                    var add_text_span = document.createElement('span');
                    add_text_span.appendChild(add_text);
                    button_overflow.appendChild(add_text_span);
                    button_wrapper.appendChild(button_overflow);

                    return button_wrapper;
                },
                getMateriaMainStyle: function(material){
                    var m_height = 30 + (this.material_height * material.involvement_level);
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
                getConveyorStyle: function(material, material_style){
                    var conveyor_top = null;
                    if(material.position === 'top'){
                        conveyor_top = -this.conveyor_icon_size -8;
                    }else{
                        conveyor_top = material_style.height.replace('px','');
                    }

                    /* TODO IF there is no room, hide */

                    return {
                        left: this.width - this.conveyor_icon_size - 8  + 'px',
                        top: conveyor_top + 'px'
                    };
                },
                getDisplayStyle: function(material, material_style){
                    var display_top = null;
                    if(material.position === 'top'){
                        display_top = -this.conveyor_icon_size -8;
                    }else{
                        display_top = material_style.height.replace('px','');
                    }

                    return {
                        left: 0 + 'px',
                        top: display_top + 'px'
                    };
                },
                getAddNewButtonStyle: function(position){

                    var height = 25;
                    var top = this.y + this.height;
                    if(position === 'top'){
                        top -=  this.height + height;
                    }
                    return {
                        top: top + 'px',
                        left: this.x + 'px', //parent left
                        width: this.width + 'px', //parent width
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
                            var conveyor = this.materialElements[i].conveyor;
                            var display = this.materialElements[i].display;

                            //MATERIAL
                            var material_style = this.getMateriaMainStyle(material);
                            setElementStyle(material_element, material_style);

                            //CONVEYOR
                            if(conveyor){
                                var conveyor_style = this.getConveyorStyle(material, material_style);
                                setElementStyle(conveyor, conveyor_style);
                            }

                            //CONVEYOR
                            if(display){
                                var display_style = this.getDisplayStyle(material, material_style);
                                setElementStyle(display, display_style);
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
                return $scope.activity_list;
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
