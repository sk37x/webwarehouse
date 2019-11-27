var express = require('express');
var router = express.Router();
var roomCategorys = require('../models/roomcateModel');



/* GET home page. */
router.get('/', function(req, res, next) {
    roomCategorys.find({}).exec((err, data) => {

        res.render('index', { title: 'Home | Chandrakasem Park', roomCategorys: data });
    })

});

router.get('/about', (req, res, next) => {
    res.render('about', { title: 'About | Chandrakasem Park' })
});


module.exports = router;