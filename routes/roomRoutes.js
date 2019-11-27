var express = require('express');
var router = express.Router();
var Room = require('../models/roomModel');
var Booking = require('../models/bookModel')
var roomCate = require('../models/roomcateModel')
var utility = require('../models/pubUtilModel')
var bookpage = router.get("/:room_category/:_id", (req, res, next) => {
    Room.findById(req.params._id, (err, data) => {
        if (err) console.log(err);
        res.render('reservation', { rooms: data })
    })
});



router.get('/', (req, res, next) => {
    roomCate.find().exec((err, data) => {
        if (err) console.log(err);
        // console.log(data);
        res.render('serviceRoom', { room: data, title: 'Room | Chandrakasem Park' })

    })
});

router.get('/:room_category', (req, res) => {
    Room.find({ room_category: req.params.room_category }, (err, data) => {
        if (err) console.log(err);
        utility.find({ utilCate: req.params.room_category }, (err, util) => {
            console.log(util)
            console.log(data);
            res.render('serviceRoom', { roomone: data, utility: util, title: 'ROOM' })
        })
    })
});

router.get("/:room_category/:_id", (req, res) => {
    Room.findById(req.params._id, (err, data) => {
        if (err) console.log(err);
        res.render('reservation', { roomx: data })
    })
})


// router.get('/Meeting%20Rooms', (req, res, next) => {
//     Room.find({ room_category: "Meeting Rooms" }, req.body, (err, data) => {
//         if (err) console.log(err);
//         console.log(data);
//         res.render('serviceRoom', { rooms: data, title: 'Meeting Room' })
//     }), bookpage;
// });

// router.get('/Seminar%20Rooms', (req, res, next) => {
//     Room.find({ room_category: "Seminar Rooms" }, req.body, (err, data) => {
//         if (err) console.log(err);
//         res.render('serviceRoom', { rooms: data, title: 'Seminar Room' })
//     }), bookpage;
// });

router.post('/', (req, res, next) => {
    var doc = new Booking(req.body);
    doc.save((err, data) => {
        if (err) console.log(err);
        console.log(data);
        res.redirect('/room');
    })
});


module.exports = router;
