var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subjectSchema = new Schema({
  name: {type: String, required: true, unique: true },
  page_views: { type: Number, default: 0 },
  following_count: { type: Number, default: 0 },
});

var Subject = mongoose.model('Subject', subjectSchema);

module.exports = {
  Subject: Subject
};
