var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Users = require('./userModel');
var userslevels = require('./userlevelModel');
var userspositions = require('./userPositionModel');
var fschunk = require('./fs.pictureModel')[1];
var fsfilesaves = require('./fsFileSave.js')
var userDetailSchema = new Schema({
    firstname: {type: String, required: true, trim: true},
    lastname : { type: String, required: true, trim:true},
    phoneTel : { type: String, required: true},
    userlogin: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    userlevel: {
        type: Schema.Types.ObjectId,
        ref: 'userslevels'
    },
    userposition: { 
        type: Schema.Types.ObjectId,
        ref: 'userspositions'
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'fsfilesaves'
    },
    dataCreate:{type : Date, default: Date.now()},
    status: {
        type: String,
        enum: ['Online', 'Offline'],
        default: 'Offline'
    }, 
    lastLogin : { type : Date }
})

var usersdetails = mongoose.model('usersdetails', userDetailSchema);

// console.log('hello FRIEND');

// usersdetails.find().populate('userlogin').populate('userlevel').populate('userposition').exec((err, data) => {
//     if(err) console.log(err);
//     console.log(data);
// })
// usersdetails.find().populate('image').exec((err, data) => {
//     if(err) console.log(err);
//     console.log(data);
// })

module.exports = usersdetails;