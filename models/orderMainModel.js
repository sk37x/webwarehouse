const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersdetails = require('./userDetailModel')
const Users = require('./userModel')
const Float = require('mongoose-float').loadType(mongoose)



const orderMainSchema = mongoose.Schema({
    "order_by" : { type : Schema.Types.ObjectId, ref: 'usersdetails'},
    "order_no": { type : String, required:true},
    "order_date": { type : Date, default: Date.now()},
    "order_totalmoney": { type : Float },
    "order_status": { type : String, enum: ['Approval', 'Disapproval','Pending']},
    "comment" : { type: String },
    "order_p_quantity": { type : Number},
    "creator" : { type: String},
    'createdDate': {type: Date, default: Date.now()},
    "revisedDate" : { type : Date, default: null },
    "revisor" : { type : String }, 
    'order_confirm_by': {type : Schema.Types.ObjectId, ref : 'usersdetails'}
})

var orderMain = mongoose.model('ordermains', orderMainSchema);

module.exports = orderMain;