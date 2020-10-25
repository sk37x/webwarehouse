var mongoose = require('mongoose');
var Schema = mongoose.Schema
var userlvSchema = Schema({
    // _id: { type: Schema.Types.ObjectId },
    userlevel: { type: String, refPath: 'Users' },
    userLevelStatus: { type: Boolean },
    dateCreate: { type: Date, default: Date.now() }
})

var userslevels = mongoose.model('userslevels', userlvSchema);


module.exports = userslevels;