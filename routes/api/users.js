var express = require("express");
var router = express.Router();
var users = require("../../models/userDetailModel")


var authentication = function(username, password){
    


}


// router.post("/", function (req, res, next) {
//     users.find().exec((err, usersData) => {
//         if (err) {
//             console.log(err); return next;
//         }
//         // console.log(usersData);
//         res.json({users: usersData})

//     })

// })

module.exports = router;