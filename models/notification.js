var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created: { type: Date, default: Date.now },
    seen: { type: Date },
    type: { type: String },
    data: {
      comment: {type: Schema.Types.ObjectId, ref: 'Comment'},
      scenario: {type: Schema.Types.ObjectId, ref: 'Scenario'},
      user: {type: Schema.Types.ObjectId, ref: 'User'}
  }
});

var Notification = mongoose.model('Notification', notificationSchema);

module.exports = {
  Notification: Notification
};
