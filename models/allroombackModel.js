var mongoose = require('mongoose');

var allroomsSchema = mongoose.Schema({
    No : {type : Number},
    room_num: {type: String},
    room_category: {type: String},
    room_type: {type: String},
    room_description: {type: String},
    size_des : {
        minSize: { type: Number},
        maxSize: { type: Number} 
    },
    size: {type: Number},
    price: {type: Number},
    price_discount: {type: Number},
    status: {type: String , default : 'Available',enum: ["Available", "Busy"]},
    dateCreate: {type: Date, default: Date.now},
    pub_util : {
        type: String
    }
});

allroomsSchema.pre('save', function(){
    console.log(this);
})

var allRoom = mongoose.model('allrooms', allroomsSchema);




module.exports = allRoom;