var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowerSchema = new Schema({
    follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    following: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    added: { type: Date, default: Date.now },
    removed: { type: Date }
});

var Follower = mongoose.model('Follower', FollowerSchema);

module.exports = {
  Follower: Follower
};
