var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    scenario: { type: mongoose.Schema.Types.ObjectId, ref: 'Scenario'},
    added: { type: Date, default: Date.now}
});

var Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = {
  Favorite: Favorite
};
