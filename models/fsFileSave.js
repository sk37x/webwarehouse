const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var fsFileSaveSchema = new Schema({
    "fieldname": { type : String },
    "originalname": { type : String },
    "encoding": { type : String },
    "mimetype": { type : String },
    "destination": { type : String },
    "filename": { type : String },
    "path": { type : String },
    "size": { type : Number },
})

var fsfilesaves = mongoose.model('fsfilesaves', fsFileSaveSchema);


module.exports = fsfilesaves;


