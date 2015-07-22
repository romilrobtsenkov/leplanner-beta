var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    scenario: { type: mongoose.Schema.Types.ObjectId, ref: 'Scenario'},
    created: { type: Date, default: Date.now},
    deleted: {type: Boolean, required: true, default: false}
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = {
  Comment: Comment
};
