const config = require('../config/config');
const Subject = require('../models/subject').Subject;

exports.getSubjects = function() {

    var query = Subject.find();
    query.sort({name: 1});
    query.select('_id name_et name_en');

    return query.exec();
};

exports.getActivityOrganization = function() {
    return [
        { _id: 0, name: 'individual' },
        { _id: 1, name: 'pair' },
        { _id: 2, name: 'small group' },
        { _id: 3, name: 'whole class' },
    ];
};

exports.getInvolvementOptions = function() {
    return [
        { _id: 0, name: "0 - consuming (read, view, listen)" },
        { _id: 1, name: "1 - annotating (like, tag, bookmark, comment)" },
        { _id: 2, name: "2 - interacting (select, drag-n-drop, enter the response, take self-test)" },
        { _id: 3, name: "3 - submitting (send response to teacher for feedback or assessment)" },
        { _id: 4, name: "4 - expanding (add videos, pages, files)" },
        { _id: 5, name: "5 - remixing (change the content, replace some parts, add subtitles)" },
        { _id: 6, name: "6 - creating (compose new content from scratch, re-use some pieces)" }
    ];
};

exports.getDisplays = function() {
    return [
        { _id: 0, name: "projector/TV", icon: "other_display.png" },
        { _id: 1, name: "smartboard", icon: "other_display.png" },
        { _id: 2, name: "computer", icon: "pc.png" },
        { _id: 3, name: "tablet", icon: "tablet.png" },
        { _id: 4, name: "smartphone", icon: "smartphone.png" },
        { _id: 5, name: "other", icon: "other_display.png" }
    ];
};
