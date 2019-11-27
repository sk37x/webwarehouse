var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var positionSchema = Schema({
    _id: Schema.Types.ObjectId,
    position: {
        type: String, 
        require: true
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    }
})


var userspositions = mongoose.model('userspositions', positionSchema);

module.exports = userspositions;