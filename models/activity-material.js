var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var materialSchema = new Schema({
    scenario: { type: mongoose.Schema.Types.ObjectId, ref: 'Scenario', required: true },
    activity_id: { type: String, required: true },
    position: { type: String, required: true },
    material_name: { type: String },
    material_url: { type: String },
    involvement_level: { type: Number },
    conveyor_name: { type: String }, //retired
    conveyor_url: { type: String }, //retired
    conveyors: [{
        name: { type: String },
        url: { type: String }
    }],
    display_id: { type: Number }, //retired
    other_display: { type: String }, //retired
    displays: [{ type: Number }],
    created: { type: Date, default: Date.now },
    deleted: { type: Boolean, required: true, default: false },
    deleted_date: { type: Date },
    last_modified: { type: Date }
});

var Material = mongoose.model('Material', materialSchema);

module.exports = {
  Material: Material
};
