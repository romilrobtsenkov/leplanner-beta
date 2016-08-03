const Pageres = require('pageres');
const config = require('../config/config');

var arrayOfIds = [];
var timer;

exports.create = function(id){

    console.log(arrayOfIds);

    // check if already exists
    var exist = false;
    for(var i = 0; i < arrayOfIds.length; i++){
        console.log(arrayOfIds[i].toString() === id.toString());
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

    timer = setTimeout(function() {
        console.log('sent ' + arrayOfIds.length + ' for screenshots');
        takeScreenshots(arrayOfIds);
        arrayOfIds = [];
        timer = null;
    }, 10000);

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
