const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autoGenSchema = mongoose.Schema({
    codeArray : [{
        type:{type : String},
        genCode: {type : String},
        genCodeText: {type : String},
        genSpacialChar: {type : String},
    }]
    // codeArray : [{
    //     type:{type : String},
    //     genCode: {type : String},
    //     genCodeText: {type : String},
    // }]
})



const autogencode = mongoose.model('generateallcodes', autoGenSchema);
module.exports = autogencode;