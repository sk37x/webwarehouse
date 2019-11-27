// var localStrategy = require('passport-local').Strategy;


// var User = require('../models/userModel');


// module.exports = function (passport) {

//     passport.serializeUser((user, done) => {
//         done(null, username);
//     });
//     passport.deserializeUser((id, done) => {
//         User.findById(id, (err, user) => {
//             done(err, user);
//         })
//     });

//     passport.use('local-login', new localStrategy({
//         usernameField: 'username',
//         passwordField: 'password',
//         passReqToCallback: true
//     }, function (req, username, password, done) {
//         User.findOne({ 'username': username }, (err, user) => {
//             if (err) return (err);
//             if (!user)
//                 return done(null, false, req.flash('loginMessage', 'No user has found.'));
//             if (!user.validPassword(password))
//                 return done(null, false, req.flash('loginMessage', 'Wrong Password.'));
//             return done(user);

//         })
//     }))


// };
