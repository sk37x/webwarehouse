const { response } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product = require('./productsModel');
const Float = require('mongoose-float').loadType(mongoose)

const orderDetailSchema = mongoose.Schema({
    "order_id" : { type: Schema.Types.ObjectId, ref: 'ordermain' },
    "product_id" : { type: Schema.Types.ObjectId, ref: 'products' },
    "item_quantity" : { type: Number },
    "item_price" : { type: Float },
    "creator" : { type: String},
    'createdDate': {type: Date, default: Date.now()},
    "revisedDate" : { type : Date, default: null },
    "revisor" : { type : String },
    "item_sort" : { type : Number },
})
var orderDetail = mongoose.model('orderDetails', orderDetailSchema);
module.exports = orderDetail;