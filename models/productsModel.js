const mongoose = require("mongoose");
const Float = require('mongoose-float').loadType(mongoose)
const Schema = mongoose.Schema;
const itemCategory = require("./itemCategorysModel");
var fsfilesaves = require('./fsFileSave.js')

var productSchema = mongoose.Schema({
    product_name : { type: String, require: true},
    product_code : { type: String },
    product_model : { type: String },
    product_category : { type: Schema.Types.ObjectId, ref: 'itemCategorys' },
    product_status : { type: Boolean, require: true },
    product_price : { type: Float }, 
    product_fines : { type: Number }, 
    product_quantity : { type: Number }, 
    product_unitCount : { type: String },
    product_onStock : { type: Number },
    product_status : { type: Boolean },
    product_code : { type: String, require: true },
    product_startDate : { type: Date },
    product_detail : { type: String },
    product_image : { 
        type: Schema.Types.ObjectId, 
        ref: 'fsfilesaves',
        default: null
    },
    createdDate : {type: Date, default: Date.now },
    creator: { type : Number, default: null },
    revisedDate : { type: Date, default: null  },
    revisor : { type: Number, default: null },
    image : {
        type : String
    },
    "role" : { type : String },
    "used" : { type : Boolean}

})



var product = mongoose.model('products', productSchema)

module.exports = product;
