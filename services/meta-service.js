var config = require('../config/config');
var Subject = require('../models/subject').Subject;

exports.getSubjects = function(next) {
    var query = Subject.find();
    query.sort({name: 1});
    query.select('name');
    query.exec(function(err, subjects) {
      return next(null, subjects);
    });

};

exports.getActivityOrganization = function(next) {
  return next(null, [
    { _id: 0, name: 'individuaalne', name_eng: 'individual task' },
    { _id: 1, name: 'paaris', name_eng: 'peer task' },
    { _id: 2, name: 'väikerühmas', name_eng: 'small group task' },
    { _id: 3, name: 'terve klassiga', name_eng: 'whole class task' },
  ]);
};



/* exports.insertSubjects = function(next) {

  var subjects = [{ name: "Eesti keel " },
  { name: "Vene keel emakeelena" },
  { name: "Kirjandus" },
  { name: "Eesti keel võõrkeelena" },
  { name: "Inglise keel" },
  { name: "Prantsuse keel" },
  { name: "Saksa keel" },
  { name: "Vene keel" },
  { name: "Rootsi keel" },
  { name: "Soome keel" },
  { name: "Matemaatika" },
  { name: "Loodusõpetus" },
  { name: "Bioloogia" },
  { name: "Geograafia" },
  { name: "Füüsika" },
  { name: "Keemia" },
  { name: "Inimeseõpetus" },
  { name: "Ajalugu" },
  { name: "Ühiskonnaõpetus" },
  { name: "Kunst" },
  { name: "Muusika" },
  { name: "Töö- ja tehnoloogiaõpetus" },
  { name: "Käsitöö" },
  { name: "Kodundus" },
  { name: "Haridustehnoloogia" },
  { name: "Kehaline kasvatus" },
  { name: "Informaatika" },
  { name: "Majandus ja ettevõtlus" },
  { name: "Meediaõpetus" },
  { name: "Rigiikaitse" },
  { name: "Uurimistöö" },
  { name: "Filosoofia" }];

  Subject.create(subjects, function (err, subjectss) {
    if(err){return err;}

    return next(null, { subjects: subjectss });

  });

};*/
