var mongoose = require('mongoose');


var CounterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counters', CounterSchema);




var bookingSchema = mongoose.Schema({
    No: { type: Number, require: true },
    book_req_status: { type: String, enum: ['wait-check-in', 'check-in', 'check-out'], default: 'wait-check-in' },
    book_ses: { type: Number, require: true },
    book_roomtype: { type: String, require: true },
    book_roomname: { type: String, require: true },
    book_chkin: { type: Date, require: true },
    book_chkout: { type: Date, default: Date.now },
    book_person: { type: Number, min: 1, max: 150, default: 1 },
    book_adult: { type: Number, min: 0, default: 0 },
    book_child: { type: Number, min: 0, default: 0 },
    book_timer: { type: String },
    book_name: { type: String, require: true },
    book_phone: { type: String, require: true },
    book_email: { type: String, require: true, lowercase: true, trim: true },
    book_spacial: { type: String },
    price: { type: Number },
    price_discount: { type: Number },
    newPrice: { type: Number },
    totalprice: { type: Number, new: true, require: true },
    totaltimex: { type: Number, new: true },
    book_roomNo: { type: Number, new: true, require: true },
    book_createDate: { type: Date, default: Date.now },
    logchk: { type : String, new:true},
    book_timer_T1: { type: Boolean , default: false },
    book_timer_T2: { type: Boolean , default: false },
    book_timer_T3: { type: Boolean , default: false },
    book_from: {type: String, require: true}, 
    logchk: {type: Number , new: true}

});

bookingSchema.pre('save', function (next) {
    var doc = this;
    counter.findByIdAndUpdate({ _id: 'bookingsid' }, { $inc: { seq: 1 } }, function (error, counter) {
        if (error)
            return next(error);
        doc.No = counter.seq;
        next();
    });
});




bookingSchema.pre('remove', function (next) {
    var doc = this;
    counter.findByIdAndUpdate({ _id: 'bookingsid' }, { $inc: { seq: -1 } }, function (error, counter) {
        if (error)
            return next(error);
        doc.No = counter.seq;
        next();
    });
});

var Booking = mongoose.model('Bookings', bookingSchema);

// Booking.count({}, (err, count) => {
//     if (err) console.log(err);
//     console.log(count);
// });



module.exports = Booking;