var mongoose = require('mongoose');

var utility = mongoose.Schema({
    utilName: { type: String },
    utilCate: { type: String },
    utilSVG: { type: String },
    utilDes: {type: String},
    quantity: {type:Number, default: 1}
})

var util = mongoose.model('pub_utilitys', utility);

module.exports = util;