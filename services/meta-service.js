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

exports.getInvolvementOptions = function(next) {
  return next(null, [
    { _id: 0, name: "0 - vaatamine (kuulamine, lugemine)" },
    { _id: 1, name: "1 - märgendamine (annoteerimine, meeldimine)" },
    { _id: 2, name: "2 - interaktsioon (enesekontrolli test)" },
    { _id: 3, name: "3 - esitamine (ülesande esitamine)" },
    { _id: 4, name: "4 - laiendamine (materjali lisamine olemasolevale)" },
    { _id: 5, name: "5 - remiksimine (materjalile uue tähenduse andmine)" },
    { _id: 6, name: "6 - loomine (uue materjali loomine)" }
  ]);
};

exports.getDisplays = function(next) {
  return next(null, [
    { _id: 0, name: "Arvuti", icon: "pc.png" },
    { _id: 1, name: "Nutitelefon", icon: "smartphone.png" },
    { _id: 2, name: "Tahvelarvuti", icon: "tablet.png" },
    { _id: 3, name: "Muu", icon: "other_display.png" }
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
