var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scenarioSchema = new Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created: { type: Date, default: Date.now},
    students: { type: Number, default: 0},
    language: { type: String},
    license: { type: String},
    techRes: { type: String},
    materialType: { type: String},
    method: { type: String},
    stage: { type: String}, // kooliaste
    description: { type: String, required: false},
    favorites_count: { type: Number, default: 0},
    comments_count: { type: Number, default: 0},
    view_count: { type: Number, default: 0},
    deleted: {type: Boolean, required: true, default: false},
    draft: {type: Boolean, required: true, default: false}
});

var Scenario = mongoose.model('Scenario', scenarioSchema);

module.exports = {
  Scenario: Scenario
};
