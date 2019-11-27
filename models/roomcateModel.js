var mongoose = require('mongoose');

var roomCateSchema = mongoose.Schema({
    room_category: { type: String },
    dateCreate: { type: Date, default: Date.now },
    room_type: [{
        type: String
    }],
    size_des: { type: String },
    dateEdit: { type: Date, default: Date.now },
    room_description: { type: String }
});


var roomCategory = mongoose.model('roomcategorys', roomCateSchema);

module.exports = roomCategory;