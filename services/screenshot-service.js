const Pageres = require('pageres');
const config = require('../config/config');

var arrayOfIds = [];
var timer;
var pageResCapturing;

exports.create = function(id){

    //console.log(arrayOfIds);

    // check if already exists
    var exist = false;
    for(var i = 0; i < arrayOfIds.length; i++){
        if(arrayOfIds[i].toString() === id.toString()){
            exist = true;
            console.log('already in quene');
            break;
        }
    }
    if(!exist) {
        arrayOfIds.push(id);
    }

    if(timer) {
        console.log('timer counting ');
        return;
    }

    startTimer(10000);

};

var startTimer = function (ms) {
    timer = setTimeout(function() {

        if(pageResCapturing) {
            console.log('wait for capturing to end ...');
            startTimer(500);
            return;
        }

        var toSend = [];

        //max 1 at a time
        if(arrayOfIds.length > 1) {
            toSend = arrayOfIds.slice(0, 1);
            arrayOfIds.splice(0, 1);
        }else {
            toSend = arrayOfIds;
            arrayOfIds = [];
        }

        //console.log('arrayOfIds');
        console.log(arrayOfIds.length);
        //console.log('toSend');
        //console.log(toSend);

        console.log('sent ' + toSend.length + ' for screenshots');
        takeScreenshots(toSend);
        timer = null;

        //if not timer and there is que, start timer again
        if(arrayOfIds.length !== 0){
            console.log('timer start again');
            startTimer(1000);
        }else{
            console.log('timer already counting');
        }

    }, ms);
};

var takeScreenshots = function(ids) {

    pageResCapturing = true;

    var pageres = new Pageres({delay: 5});

        //multiple screenshots
        for(var i = 0; i < ids.length; i++){
            pageres.src(config.site_url + '/#/scenario/' + ids[i], ['800x600'], {format: 'png', filename: ids[i], selector: '#scenario-timeline-wrapper' });
        }

        pageres.dest('./public/images/scenario_thumbs/');
        pageres.run().then(function () {
            console.log(ids.length + ' screenshot saved');
            pageResCapturing = false;
        }).catch(function (error) {
            //probably too slow loading
            console.log('unable to save screenshot');
            pageResCapturing = false;
            console.log(error);
        });
};
