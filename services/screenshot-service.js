const Pageres = require('pageres');

exports.create = function(id){

    // TODO collect with timeout and then du bulk ?
    const pageres = new Pageres({delay: 2})
        .src('http://leplanner.romil.local/#/scenario/' + id, ['800x600'], {crop: true, format: 'png', filename: id, selector: '#scenario-timeline-wrapper', scale: 0.5 })
        .dest('./public/images/scenario_thumbs/')
        .run()
        .then(() => console.log('done'));
};
