var mongoose = require('mongoose');


// ห้องที่มีทั้งหมดโดยไม่ซ้ำกัน



var roomSchema = mongoose.Schema({
    room_category: { type: String, require: true, trim: true },
    room_type: { type: String },
    room_name: { type: String },
    room_description: { type: String },
    size_des : {type: String},
    size : {type: String},
    price : {type: Number},
    price_discount : {type: Number}

}); // size = Bed

var Room = mongoose.model('rooms', roomSchema);
module.exports = Room;

