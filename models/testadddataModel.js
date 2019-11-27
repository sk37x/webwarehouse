var mongoose = require('mongoose');

var testing = mongoose.Schema({
    No: { type: Number, require: true },
    book_req_status: { type: String, enum: ['wait-check-in', 'check-in', 'check-out'], default: 'wait-check-in' },
    book_ses: { type: Number, require: true },
    book_roomtype: { type: String, require: true },
    book_roomname: { type: String, require: true },
    book_chkin: { type: Date, require: true },
    book_chkout: { type: Date, require: true, default: Date.now },
    book_person: { type: Number, min: 1, max: 150, default: 1 },
    book_adult: { type: Number, min: 0, default: 0 },
    book_child: { type: Number, min: 0, default: 0 },
    book_timer: { type: String, require },
    book_name: { type: String, require: true },
    book_phone: { type: String, require: true },
    book_email: { type: String, require: true, lowercase: true, trim: true },
    book_spacial: { type: String },
    price: { type: Number },
    price_discount: { type: Number },
    totalprice: { type: Number, new: true, require: true },
    totaltimex: { type: Number, new: true, require: true },
    book_roomNo: { type: Number, new: true, require: true },
    book_createDate: { type: Date, default: Date.now },
    logchk: { type : String, new:true},
    book_timer_T1: { type: Boolean , default: false },
    book_timer_T2: { type: Boolean , default: false },
    book_timer_T3: { type: Boolean , default: false }

});

var testx = mongoose.model('ALLTESTX', testing);

module.exports = testx;