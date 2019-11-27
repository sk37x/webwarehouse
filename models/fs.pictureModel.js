var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/cruhotelx');
// mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var fsFilename = new Schema({
    "filename": { type: String },
    "contentType": { type: String },
    "length": { type: Number },
    "chunkSize": { type: Number },
    "uploadDate": { type: Date },
    // "aliases" : null,
    // "metadata" : null,
    "md5": { type: String }
})

var fschucks = new Schema({
    _id: { type: Schema.Types.ObjectId },
    files_id: {
        type: Schema.Types.ObjectId,
        ref: 'fs.files'
    },
    n: { type: Number },
    data: { data: Buffer }

})

// fschucks.pre('save', (err, data) => {
//     if (err) console.log(err);
//     console.log(data._id);
//     console.log(data);
// })
var fsfiles = mongoose.model('fs.files', fsFilename);
var fschunks = mongoose.model('fs.chunks', fschucks);



module.exports = [fsfiles, fschunks];

// fsfiles.find({}).exec((err, data) => {
//     if(err) console.log(err);
//     console.log(data);
// });
// fschunks.find({}).populate('files_id').exec((err, datach) => {
//     if(err) console.log(err);
//     console.log(datach);
// })

