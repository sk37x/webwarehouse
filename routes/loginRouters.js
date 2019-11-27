var express = require('express');
var router = express.Router();
var User = require('../models/userModel')
var userDetail = require('../models/userDetailModel');
var jwt = require('jsonwebtoken');
var fs = require('fs');
// Middleware Login
// function requresLogin(req, res, next) {
//     if (req.session && req.session.userId) {
//         return next();
//     } else {
//         var err = new Error('You must be logged in to view this page.');
//         err.status = 401;
//         return next(err);
//     }
// }


// router.get('/wspx', (req, res, next) => {
//   res.redirect('/user/login');
// })

router.get('/', (req, res, next) => {

    // console.log(req.session);
    // var nDate = new Date();
    // var calDate = new Date(nDate.getTime() + 300000);

    // console.log(nDate.getDate() + ':' + nDate.getMonth() + ':' + nDate.getFullYear() );
    // console.log(nDate.getHours() + ':' + nDate.getMinutes() + ':' + nDate.getSeconds() );
    res.render('login', { title: "Login Page" });

});
router.get('/:username', (req, res, next) => {
    User.findOne({ username: req.params.username }).exec((err, user) => {
        if (err) {
            return next(err);
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back');
                err.status = 400;
                return next(err);
            } else {


                
                return res.redirect('/backendx');
                // return res.send('<h1> Name : </h1>' + user.username + '<h2> E-Mail : </h2>' + user.email + '<br><br><a type="button" href="/wspx/' + user.username + '/logout">Log Out</a><br><a type="button" href="/backendx">Backedn</a>' + req.token);
            }
        }
    })
})


function decodeToken(token, secretkey = 'secretKey') {
    var decoded = jwt.verify(token, secretkey);
    return decoded;
}
function getToken(userx, secretkey = 'secretKey', expTime = '1h') {
    var token = jwt.sign({ user: userx }, secretkey, { expiresIn: expTime });
    return token;
}


router.post('/', (req, res, next) => {
    // if (req.body.password !== req.body.passwordConf) {
    //     var err = new Error('พาสเวิร์ดไม่ตรงกัน');
    //     err.status = 400;
    //     res.send(err);
    //     return next(err);
    // }

    // if (req.body.email &&
    //     req.body.username &&
    //     req.body.firstname &&
    //     req.body.lastname &&
    //     req.body.password &&
    //     req.body.passwordConf) {

    //     var userData = {
    //         email: req.body.email,
    //         username: req.body.username,
    //         firstname: req.body.firstname,
    //         lastname: req.body.lastname,
    //         password: req.body.password,
    //         passwordConf: req.body.passwordConf
    //     }

    //     User.create(userData, (err, user) => {
    //         if (err) {
    //             console.log(err)
    //             return next(err)
    //         } else {
    //             req.session.userId = user._id;
    //             return res.redirect('/profile');
    //         }
    //     });

    if (req.body.logusername && req.body.logpassword) {
        User.authenticate(req.body.logusername, req.body.logpassword, (err, user) => {
            // if (err) console.log(err);
            // console.log(user);
            if (err || !user) {
                var err = new Error('Username หรือ Password ไม่ถูกต้อง');
                err.status = 401;
                return next(err);
            } else {
                var nDate = new Date();
                var hr2 = 3600000 * 24;
                // GET TOKEN
                var token = getToken(user, user.password, '1h');
                // Slice Token For save file Session
                var tkslice = token.slice(19, 27);
                var timeLog = req.body.timeSelected
                // // var calDate = new Date(nDate.getTime() + hr1);
                req.session.userId = user._id;
                req.session.cookie.path = '/backendx';
                // req.session.cookie.secure = true;
                req.session.pwdencriptx = user.password;
                req.session.token = token
                req.session.cookie.expires = new Date(nDate.getTime() + hr2);
                req.session.tkslicex = tkslice;
                fs.writeFile('private.Key' + tkslice, req.session.token + ' ' + req.session.pwdencriptx, (err, data) => {
                    if(err) console.log(err);
                    console.log(data);
                    
                });
                
                userDetail.findOneAndUpdate({ 'userlogin': user._id }, { $set: { 'status': 'Online' } }).exec((err, data) => {
                    if (err) console.log(err);

                    if(req.back){
                        console.log(req.back);
                    }
                    // return next();
                    return res.redirect('/wspx/' + user.username);
                })
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})



router.get('/:username/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        userDetail.findOneAndUpdate({ 'userlogin': req.session.userId }, { $set: { 'status': 'Offline' } }).exec((err, data) => {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                req.session.destroy(function (err) {
                    if (err) {
                        console.log(err);
                        return next(err);
                    } else {
                        return res.redirect('/wspx');
                    }


                })
            }
        });
    }
});

// router.post('/add', (req, res) => {
//     User.findOne({'user_level': 'admin'}, 'username password',(err, data) => {
//         if (err) console.log(err);
//         // if (req.body.userIdx && data.username === req.body.userPasswordx && data.password) {
//         //     console.log("congrate !!");
//         // }else{console.log('what that ?!')};
//         if (req.body.userIdx === data.username){
//             console.log('hello match ID');
//         } else if (req.body.userPasswordx === data.password){
//             console.log('hello match password');
//         } else {
//             console.log('who are you');
//         };

//         console.log('req.body.userIdx && data.username | ', Boolean(req.body.userIdx && data.username));
//         console.log("data.username | ",data.username);
//         console.log('data.password | ',data.password);
//         console.log('req.body.userIdx | ',req.body.userIdx);
//         console.log('req.body.userPasswordx | ',req.body.userPasswordx);
//         console.log('data |',data);
//         res.redirect('/wspx');

//     })

// });


module.exports = router;



module.exports.reqHeader = function (req, res, next) {
    var headerAPI = req.headers['authorization'];

    if (headerAPI !== undefined) {
        var sliceHead = headerAPI.slice(26,34);
        var fileNamex = 'private.Key' + sliceHead;
        var key = fs.readFileSync(fileNamex).toString();
        var splitHead = headerAPI.split(' ');
        var splitKey = key.split(' ');
        // var ksjson = {'token': splitKey[0], 'key': splitKey[1]}
        // console.log(ksjson.token);
        // console.log(ksjson.key);
        if(splitHead[1] === splitKey[0]){
            req.key = splitKey[1];
            next();
        } else {

        }
        // // res.send(res);
        // next();
    } else {
        req.tkslicex = req.session.tkslicex;
        res.header({ 'authorization': 'bearer ' + req.session.token })
        next();
    }
}    


// let r = Math.random().toString(36).substring(2);
// console.log("random | ", r);