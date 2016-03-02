var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scenarioSchema = new Schema({
    name: { type: String },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}],
    grade: { type: Number },
    duration: { type: Number },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    created: { type: Date, default: Date.now },
    students: { type: Number, default: 0 },
    description: { type: String },
    outcomes: [{
      _id: String,
      name: String,
    }],
    activities: [{
      _id: String,
      name: { type: String},
      duration: { type: Number},
      in_class: { type: Boolean},
      activity_organization: {
        _id: Number
      },
      outcomes: [{
        _id: String,
        name: String
      }]
    }],
    activities_duration: { type: Number, default: 0 },
    favorites_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
    view_count: { type: Number, default: 0 },
    deleted: {type: Boolean, required: true, default: false },
    draft: {type: Boolean, required: true },
    last_modified: { type: Date }
});

var Scenario = mongoose.model('Scenario', scenarioSchema);

module.exports = {
  Scenario: Scenario
};
