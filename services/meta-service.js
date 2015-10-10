var config = require('../config/config');
var Subject = require('../models/subject').Subject;

exports.getSubjects = function(next) {
    var query = Subject.find();
    query.sort({name: 1});
    query.select('_id name');
    query.exec(function(err, subjects) {
      return next(null, subjects);
    });
};

exports.getActivityOrganization = function(next) {
  return next(null, [
    { _id: 0, name: 'individuaalne', name_eng: 'individual' },
    { _id: 1, name: 'paaris', name_eng: 'pair' },
    { _id: 2, name: 'väikerühmas', name_eng: 'small group' },
    { _id: 3, name: 'terve klassiga', name_eng: 'whole class' },
  ]);
};

exports.getInvolvementOptions = function(next) {
  return next(null, [
    { _id: 0, name: "0 - vaatamine (kuulamine, lugemine) / consuming (read, view, listen)" },
    { _id: 1, name: "1 - märgendamine (annoteerimine, meeldimine) / annotating (like, tag, bookmark, comment)" },
    { _id: 2, name: "2 - interaktsioon (enesekontrolli test) / interacting (select, drag-n-drop, enter the response, take self-test)" },
    { _id: 3, name: "3 - esitamine (ülesande esitamine) / submitting (send response to teacher for feedback or assessment)" },
    { _id: 4, name: "4 - laiendamine (materjali lisamine olemasolevale) / expanding (add videos, pages, files)" },
    { _id: 5, name: "5 - remiksimine (materjalile uue tähenduse andmine) / remixing (change the content, replace some parts, add subtitles)" },
    { _id: 6, name: "6 - loomine (uue materjali loomine) / creating (compose new content from scratch, re-use some pieces)" }
  ]);
};

exports.getDisplays = function(next) {
  return next(null, [
    { _id: 0, name: "Arvuti (Computer)", icon: "pc.png" },
    { _id: 1, name: "Nutitelefon (Smartphone)", icon: "smartphone.png" },
    { _id: 2, name: "Tahvelarvuti (Tablet)", icon: "tablet.png" },
    { _id: 3, name: "Muu (Other)", icon: "other_display.png" }
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
