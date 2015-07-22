var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scenarioViewSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    scenario: { type: mongoose.Schema.Types.ObjectId, ref: 'Scenario'},
    date: { type: Date, default: Date.now},
});

var ScenarioView = mongoose.model('ScenarioView', scenarioViewSchema);

module.exports = {
  ScenarioView: ScenarioView
};
