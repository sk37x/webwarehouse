var express = require('express');
var router = express.Router();



var Story = require('../models/testPopulate');
var Person = require('../models/testPopulate');
var User = require('../models/userModel');
var userLevel = require('../models/userlevelModel');
var fsfiles = require('../models/fs.pictureModel')[0];
var fschunks = require('../models/fs.pictureModel')[1];
var fs = require("fs");
var path = require('path');
const multer = require('multer');
var jwt = require('jsonwebtoken');

const MongoClient = require('mongodb');
const GridFsStorage = require('multer-gridfs-storage')

//I used an mlab Sandbox DB. Substitute the details with your own
const url = "mongodb://localhost";
const dbName = "cruhotelx";

let storage = new GridFsStorage({
  url: "mongodb://localhost/cruhotelx",
  file: (req, file) => {
    return {
      // bucketName: 'test',       //Setting collection name, default name is fs
      filename: file.originalname     //Setting file name to original name of file
    }

  }
});

var upload = multer({
  storage: storage
}).single('file');




// var upload = null;
// storage.on('connection', (db) => {
//   //Setting up upload for a single file
//   upload = multer({
//     storage: storage
//   }).single('file1');

// });

// console.log(storage);



router.get('/', (req, res, next) => {
  res.render('testpop');

})
router.get('/alltest', (req, res, next) => {
  res.render('alltest');

})

router.get('/testSession', (req, res, next) => {
  res.render('test1', { testSession: 'test' })
})

router.get('/api', (req, res, next) => {
  res.json({ message: 'Testing JSON API' })
})

router.post('/api/login', (req, res, next) => {
  const user = {
    id: 1,
    username: 'sketz',
    email: 'sk8@jsk.com'
  } 

  jwt.sign({ user: user }, 'secretKey', {expiresIn: '1h'},(err, token) => {
    res.header('authorization' ,['bearer '])
    return res.json({token: token})
  });
})

router.get('/api/posts', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ message: 'Posts created.', authData })
    }
  });
})


router.get('/testjwt', (req, res, next) => {
  const user = {
    id: 1,
    username: 'sketz',
    email: 'sk8@jsk.com'
  } 
  
  var token = jwt.sign({ user: user }, 'secretKey')
  var decoded = jwt.verify(token, 'secretKey')
  res.json(decoded.user.username);

})

function getToken(userx, secretkey = 'secretKey'){
  var token = jwt.sign({user: userx}, secretkey);
  return token;
}
function decodeToken(token, secretkey = 'secretKey'){
  var decoded = jwt.verify(token, secretkey);
  return decoded;
}
// const user = {
//   id: 1,
//   username: 'sketz',
//   email: 'sk8@jsk.com'
// } 
// console.log(decodeToken(getToken(user)));

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader);
  if (typeof bearerHeader !== 'undefined') {
    // split space
    const bearer = bearerHeader.split(' ');
    // GET token from array
    const bearerToken = bearer[1];
    // Set the Token
    req.token = bearerToken;
    console.log(req.token);
    // next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}


// router.get('/test2', (req, res, next) => {
//     fsfiles.find({}).exec((err, data) => {
//         fschunks.findOne({files_id: '5c6fbe47f7dc320fc4fc651b'}).exec((err, chunks) => {

//             // var tx = new Uint8Array(chunks.data);
//             // var ts = new ArrayBuffer(tx.length);
//             // console.log(ts);

//             // res.render('test1', {data:data, chunks:chunks});
//             res.send(chunks);
//         })
//     })
// })
// router.get('/test1', (req, res, next) => {
//     fschunks.findOne({files_id: '5c6fbe47f7dc320fc4fc651b'}).exec((err, chunks) => {

//         res.render('test1');

//     })
// })
router.post('/testupload/upload', upload, (req, res, next) => {

  fschunks.findOne({ 'files_id': req.file.id }).exec((err, data) => {
    if (err) console.log(err);
    datax = { 'img': data._id };
    console.log(data._id)
    console.log(datax)
  })
  console.log(datax);
  res.send(req.file);
  // console.log(req.originalUrl)
  // res.json(req.body.files_name);
})

router.get('/testupload', (req, res, next) => {
  res.render('test1')
})








// // module.exports.loadHome = (req, res) => {
// //   res.render('index', {title: 'Express App', message: 'Express Boilerplate set up!'});
// // };

// module.exports.uploadFile = (req, res) => {
//   upload(req, res, (err) => {
//     if(err){
//       return res.render('index', {title: 'Uploaded Error', message: 'File could not be uploaded', error: err});
//     }
//     res.render('index', {title: 'Uploaded', message: `File ${req.file.filename} has been uploaded!`});
//   });
// };

// module.exports.getFile = (req, res) => {
//   //Accepting user input directly is very insecure and should 
//   //never be allowed in a production app. Sanitize the input.
//   let fileName = req.body.text1;
//   //Connect to the MongoDB client
//   MongoClient.connect(url, function(err, client){

//     if(err){
//       return res.render('index', {title: 'Uploaded Error', message: 'MongoClient Connection error', error: err.errMsg});
//     }
//     const db = client.db(dbName);

//     const collection = db.collection('test.files');
//     const collectionChunks = db.collection('test.chunks');
//     collection.find({filename: fileName}).toArray(function(err, docs){
//       if(err){
//         return res.render('index', {title: 'File error', message: 'Error finding file', error: err.errMsg});
//       }
//       if(!docs || docs.length === 0){
//         return res.render('index', {title: 'Download Error', message: 'No file found'});
//       }else{
//         //Retrieving the chunks from the db
//         collectionChunks.find({files_id : docs[0]._id}).sort({n: 1}).toArray(function(err, chunks){
//           if(err){
//             return res.render('index', {title: 'Download Error', message: 'Error retrieving chunks', error: err.errmsg});
//           }
//           if(!chunks || chunks.length === 0){
//             //No data found
//             return res.render('index', {title: 'Download Error', message: 'No data found'});
//           }
//           //Append Chunks
//           let fileData = [];
//           for(let i=0; i<chunks.length;i++){
//             //This is in Binary JSON or BSON format, which is stored
//             //in fileData array in base64 endocoded string format
//             fileData.push(chunks[i].data.toString('base64'));
//           }
//           //Display the chunks using the data URI format
//           let finalFile = 'data:' + docs[0].contentType + ';base64,' + fileData.join('');
//           res.render('imageView', {title: 'Image File', message: 'Image loaded from MongoDB GridFS', imgurl: finalFile});
//         });
//       }

//     });
//   });
// };





// router.get('/testupload', (req, res, next) => {
//     mongoose.connect('mongodb://localhost/cruhotelx');
//     // mongoose.Promise = global.Promise;
//     var connection = mongoose.connection; 
//     grid.mongo = mongoose.mongo;
//     var filesrc = path.join(__dirname, '')
//     connection.once('open', () => {

//         var gridfs = grid(connection.db)

//         var writeStream = gridfs.createWriteStream({
//             filename: 'testing.txt'
//         })
//         console.log(filesrc);
//         // console.log(fs.createReadStream(filesrc).pipe(writeStream));
//         // console.log(gridfs);
//         res.render('test1');
//     })
// })


// router.get('/', (req, res, next) => {
//     User.findOne({username: 'adm1nx-'}).exec((err, data) => {
//         console.log(data._id);
// var doc = new userLevel({
//     userlevel : 'adm1nx',
//     nowuse : data._id
// })
// doc.save((err, docsv) => {
//     if(err) console.log(err);
//     console.log(docsv);
// })
// userLevel.find().populate('nowuse').exec((err, userUpdate) => {
//     if (err) console.log(err);
//     console.log(userUpdate);

// User.findOneAndUpdate(data.userlevel, )
//         res.send(userUpdate);
//     })
// })
// Story.find().populate('author').exec((err, data) => {
//     if(err) console.log(err)
//     console.log(data);
//     res.send(data);
// })
// })



module.exports = router;