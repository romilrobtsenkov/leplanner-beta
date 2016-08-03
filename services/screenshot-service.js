const Pageres = require('pageres');
const config = require('../config/config');

var arrayOfIds = [];
var timer;

exports.create = function(id){

    console.log(arrayOfIds);

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

        var toSend = [];

        //max 5 per 10 seconds
        if(arrayOfIds.length > 5) {
            toSend = arrayOfIds.slice(0, 5);
            arrayOfIds.splice(0, 5);
        }else {
            toSend = arrayOfIds;
            arrayOfIds = [];
        }

        console.log('arrayOfIds');
        console.log(arrayOfIds);
        console.log('toSend');
        console.log(toSend);

        console.log('sent ' + toSend.length + ' for screenshots');
        timer = null;
        takeScreenshots(toSend);

        //if not timer and there is que, start timer again
        if(arrayOfIds.length !== 0 && !timer){
            console.log('timer started again');
            startTimer(20000);
        }else{
            console.log('timer already counting');
        }

    }, ms);
};

var takeScreenshots = function(ids) {

    var pageres = new Pageres({delay: 2});

        //multiple screenshots
        for(var i = 0; i < ids.length; i++){
            pageres.src(config.site_url + '/#/scenario/' + ids[i], ['800x600'], {crop: true, format: 'png', filename: ids[i], selector: '#scenario-timeline-wrapper', scale: 0.5 });
        }

        pageres.dest('./public/images/scenario_thumbs/');
        pageres.run().then(function () {
            console.log(ids.length + ' screenshot saved');
        }).catch(function (error) {
            //probably too slow loading
            console.log('unable to save screenshot');
            console.log(error);
        });
};
