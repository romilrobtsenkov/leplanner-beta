var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scenarioSchema = new Schema({
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created: { type: Date, default: Date.now},
    deleted: {type: Boolean, required: true, default: false}
});

var Comment = mongoose.model('Comment', scenarioSchema);

module.exports = {
  Comment: Comment
};
