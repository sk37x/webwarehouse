var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var key = require('./config/key');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var GridFsStorage = require('multer-gridfs-storage')
var multer = require('multer');
var jwt = require('jsonwebtoken');
var app = express();
var JSalert = require('js-alert');

// Connect DB
var mongoose = require('mongoose');
mongoose.connect(key.mongoURI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;


// Session

app.use(session({
  secret: "Hello Friend, this is a session",
  resave: true,
  saveUninitialized: false,

  store: new MongoStore({
    mongooseConnection: db
  })
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// WEB Router
var index = require('./routes/indexRoutes');
var contact = require('./routes/contactRoutes');
var room = require('./routes/roomRoutes');
var managex = require('./routes/backendRoutes');
var loginx = require('./routes/loginRouters');
var testPop = require('./routes/testPopRoutes');
app.use('/', index);
app.use('/room', room);
app.use('/contact', contact);
app.use('/wspx', loginx);
app.use('/backendx', loginx.reqHeader, managex);
app.use('/testpop', testPop);

var api = require("./routes/api/users");
app.use("/api", api);

// verifyFunction
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    // split space
    const bearer = bearerHeader.split(' ');
    // GET token from array
    const bearerToken = bearer[1];
    // Set the Token
    req.session.token = bearerToken;
    // next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


////// Function From backendx
//  function(req, res, next) {
//   if(tokenNow === undefined){
//     var err = new Error('Authorization Fall');
//     err.status = 400
//     return next(err);
//   } else { 
//     jwt.verify(tokenNow, tokenEncript, (err, authData) => {
//       if(err) {
//         JSalert.alert('Token Expires.').then(function(){
//           return res.redirect('/wspx')
//         });
        
//       } else {
//         req.authdata = authData;
//         return next();
//       }
//     } )
//   }
// }

////// function From login
//  function(req, res, next){
//   tokenNow = req.token;
//   tokenEncript = req.tokenPass;
//   res.redirect('/backendx');
// }