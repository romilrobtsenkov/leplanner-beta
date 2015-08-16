var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var materialSchema = new Schema({
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    in_class: { type: Boolean, required: true },
    organization: { type: String, required: true },
    scenario: { type: mongoose.Schema.Types.ObjectId, ref: 'Scenario', required: true }
});

var Material = mongoose.model('Material', materialSchema);

module.exports = {
  Material: Material
};
