var express = require('express');
var router = express.Router();
var path = require('path')
var pug = require('pug')
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var allRoom = require("../models/allroombackModel");
var roomCategory = require('../models/roomcateModel');
var Booking = require('../models/bookModel');
var pubUtil = require('../models/pubUtilModel');
var allUser = require('../models/userModel');
var roomDes = require('../models/roomModel');
var bookFrom = require('../models/bookfromModel');
var userLevel = require('../models/userlevelModel');
var userPosition = require('../models/userPositionModel');
var userDetail = require('../models/userDetailModel');
var itemCategorys = require('../models/itemCategorysModel')
const fsfilesaves = require('../models/fsFileSave.js')
var product = require('../models/productsModel')
const orderMain = require('../models/orderMainModel')
const orderDetail = require('../models/orderDetailModel')
var jwt = require('jsonwebtoken');
var GridFsStorage = require('multer-gridfs-storage');
var multer = require('multer');
var fschunks = require('../models/fs.pictureModel')[1];
var fs = require('fs');
var _ = require('lodash');
const autogencode = require('../models/autogencodeModel');


// GridFsStorage
let storage = new GridFsStorage({
    url: 'mongodb://localhost/cruhotelx',
    file: (req, file) => {
        return {
            // bucketName: 'test',       //Setting collection name, default name is fs
            filename: file.originalname     //Setting file name to original name of file
        }

    }
});



var upload = multer({
    storage: storage
}).single('file1');



//   storage.on('connection', (db) => {
//     //Setting up upload for a single file
//     upload = multer({
//       storage: storage
//     }).single('file1');

//   });

// var upload = multer({
//     storage: storage
// }).single('file1');


// var myTimeLogger = function(req, res, next){
//     req.myTimeLogger = Date.now();
//     next();
// };
// var logcategory = function (request, res, next) {
//     roomCategory.find({ room_category: request }, (err, data) => {
//     }), next(request);
// }





// function howArgsLength(...args) {
//     console.log(args.length);
// }



// function allx(paramx, listroom = allRoom.find({ room_category: paramx }).exec((err, listroom) => {
//     // let test = listroom;
//     // console.log(listroom);
//     let clone = [{ ...listroom }];
//     // console.log(clone);

//     // console.log(clone);
//     if (paramx !== null) {
//         // console.log(listroom);
//         console.log(clone);
//         // console.log(listroom.length); 
//         return clone;
//     } else {
//         console.log('Notting Parameter');
//     }


// })) {
//     // console.log(clone);
//     return paramx;

// };

// function allx2(paramx2, listroomx) {
//     listroomx = allRoom.find({ room_category: paramx2 }, (err, query) => {
//         listroomx = [...query];
//         console.log(listroomx.length);
//        return
//     });


//     console.log(listroomx.length);
//     // console.log(clone);

// };
// allx2('Rooms',);


// function sumDefault(x, z = 5) {
//     console.log(x + z);
//     return x + z;
// }

// sumDefault(5);
// function monthcal(month) {
//     var month;
//     var day;
//     if (month === 2) {
//         if (month % 4 === 0) {
//             day = 29;
//         } else {
//             day = 28;
//         }
//     } else if (month === 4 || month === 6 || month === 9 || month === 11) {
//         day = 30;
//     } else {
//         day = 31;
//     }
//     return day;

// }

// router.use(myTimeLogger);



function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        // split space
        const bearer = bearerHeader.split(' ');
        // GET token from array
        const bearerToken = bearer[1];
        // Set the Token
        req.token = bearerToken;
        // next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}


router.post('/api/user/nowUser', (req, res, next) => {
    userDetail.findOne({ userlogin: req.session.userId }, { userlogin: 0 }).populate('image').populate('userlevel').populate('userposition').exec((err, user) => {
        // var clone = {};
        // clone = user;
        if (err || !user) {
            var err = new Error('File Not Found');
            err.status = 404;

            return next(err);
        } else {
            // console.log(user);
            return res.json(user);
        }
    })
});

// เช็คการตรวจสอบตัวตนให้ดี ๆ อาจต้องเปลี่ยนวิธีการ ///////////*********************************** */

router.use('/', (req, res, next) => {
    // console.log(res.getHeaders());
    // console.log(req.key);
    // console.log(req.session.userId)
    req.session.cookie.secure = true;

    var token = res.getHeader('authorization');
    var bToken;

    // if((req.headers['authorization'] || res.getHeaders()) !== undefined)
    var bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        // split space
        const bearer = bearerHeader.split(' ');
        // GET token from array
        const bearerToken = bearer[1];
        bToken = bearer[1];

    }
    // console.log(bToken);
    if ((token !== undefined)) {
        // console.log(req.tkslicex);
        if (token.startsWith('bearer ')) {
            token = token.slice(7, token.length);
            if (token) {
                // console.log(token);
                jwt.verify(token, req.session.pwdencriptx, (err, decoded) => {
                    if (err) console.log(err);
                    // console.log(req.session.userId);
                    if (err || !decoded) {
                        userDetail.findOneAndUpdate({ 'userlogin': req.session.userId }, { $set: { 'status': 'Offline' } }).exec((err, dataStatus) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            } else {
                                req.session.destroy((err) => {
                                    if (err) {
                                        console.log(err);
                                        return 
                                    } else {
                                        if (req.tkslicex !== undefined) {

                                            fs.unlinkSync('private.Key' + req.tkslicex);
                                            return res.redirect('/wspx');
                                        } else {

                                            return res.redirect('/wspx');
                                        }
                                    }
                                })
                            }
                        })

                    } else {
                        // console.log(req.session.userId);

                        return next();
                    };
                });
            }
        }
        // API Side
    } else if (bToken !== undefined) {
        jwt.verify(bToken, req.key, (err, decoded) => {
            if (err) console.log(err);
            res.json({ decoded: decoded });
        })



    } else {
        var err = new Error('File not Found');
        err.status = 404;
        return next(err);
    }




})


// router.get('/session', (req, res, next) => {
//     var sess = req.session;
//     console.log(sess);
//     res.status(200).send('userId = ' + sess.userId + ' \n expires = ' + sess.cookie.expires);

// })


router.post('/print/:_id', async(req, res, next) => {
    let orderMains = await orderMain.findOne({'_id': req.params._id}).populate('order_by');
    let orderDetails = await orderDetail.find({'order_id': orderMains._id}).populate({path:'product_id', populate: {path:'product_category'}});
    let pathComplie = path.join(__dirname, '../views/ad-print.pug');
    var html = await pug.renderFile(pathComplie, {byOrder: req.params._id, orderMain: orderMains, orderDetail: orderDetails})
    // res.render('ad-print', {byOrder: req.params._id, orderMain: orderMains, orderDetail: orderDetails})
    res.status(200).json({html:html})
    
})




router.get('/', async(req, res, next) => {
    let autogen = (await autogencode.findOne({'_id': '5f71930d3636cf7446ed4179'})).toJSON();
    // console.log(autogen)
    autogen.codeArray.map((e, i) => {
        if(e.type == 'gen_ProductCode') {
            // console.log(e);
        }
    })
    // const history = Array.from(...autogen.codeArray).map(v => v.toJSON())
    // console.log(history)
    let userData = await userDetail.findOne({ 'userlogin': req.session.userId }).populate('image').populate('userlevel').populate('userlogin');
    let orderTotal = await orderMain.find({});
    let orderPendingTotal = await orderMain.find({'order_status' : 'Pending'}).populate('order_by');
    // console.log(orderPendingTotal[0].populate('order_by.userlogin'));
    let userTotal = await userDetail.find({});
    let productTotal = await product.find({});
    let counting = {orderTotal :orderTotal.length, orderPendingTotal:orderPendingTotal.length, userTotal:userTotal.length, productTotal:productTotal.length};
    let userLastLogin = await userDetail.find({'lastLogin' : {$ne : null}}).populate('userlogin').populate('image').sort({lastLogin: -1}).limit(4);
    req.session.userlevel.toLowerCase() === 'admin' ?
    res.render('ad-index', { title: "Home", ...counting, userLast: userLastLogin, orderPending : orderPendingTotal, userlv:req.session.userlevel, userData: userData}) :
    res.redirect('backendx/product');
})

// CATEGORY ###################
router.get('/category/', async(req, res, next) => {
    let userData = await userDetail.findOne({ 'userlogin': req.session.userId }).populate('image').populate('userlevel').populate('userlogin');
    itemCategorys.find({}, async(err, data) => {
        // for(let i = 0; i < data.length; i++) {
        //     let join = await product.find({'product_category': data[i]._id});
        //     if(join.length > 0) {
        //         data[i].used = 1
        //     } else {
        //         data[i].used = 0
        //     }
        // }
        res.render('ad-category', {title:'category', cateType: 'test', itemList: data, userlv:req.session.userlevel, userData: userData})
    })
})

const allItem = async(query, fields) => {
    let list = await itemCategorys.find(query, fields);
    return list;
}

const allProducts = async() => {
    let list = await product.find({});
    return list;
}
// Product ###################
router.get('/product/', async(req, res, next) => {
    let userData = await userDetail.findOne({ 'userlogin': req.session.userId }).populate('image').populate('userlevel').populate('userlogin');
    let listCategory = await allItem({"item_status": 1});
    let listProduct = await allProducts();
    res.render('ad-product', {title:'product', cateType: 'test', category: listCategory, allProduct:listProduct, userlv:req.session.userlevel, userData: userData})
})



/*
router.get('/manageroom/', (req, res, next) => {
    next();
}), router.get('/manageroom/manage-rooms', (req, res, next) => {
    roomCategory.find({}).exec((err, data) => {
        if (err) console.log(err)
        res.render('ad-manageroomall', { roomCategory: data })
    }), router.get('/manageroom/manage-rooms/edit/:_id', (req, res, next) => {
        roomCategory.findById(req.params._id, (err, data) => {
            if (err) console.log(err);
            roomCategory.find({}, (err, dataold) => {
                if (err) console.log(err);

                // console.log(data);
                res.render('ad-manageroomall', { editCateRoom: data, editcate: dataold });
            })
        })
    }), router.post('/manageroom/manage-rooms/edit/:_id', (req, res, next) => {
        roomCategory.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
            if (err) console.log(err);
            console.log(data);
            res.redirect('/backendx/manageroom/manage-rooms');
        })
    }), router.post('/manageroom/manage-rooms/del/:_id', (req, res, next) => {
        roomCategory.findByIdAndRemove(req.params._id, (err, data) => {
            if (err) console.log(err);
            console.log(data);
            res.redirect('/backendx/manageroom/manage-rooms');
        })
    }), router.get('/manageroom/manage-rooms/addroomcates', (req, res, next) => {
        roomCategory.find({}, (err, data) => {
            if (err) console.log(err);
            res.render('ad-manageroomall', { addroomcates: 'Add Room Category', roomcate: data })
        })
    }), router.post('/manageroom/manage-rooms/addroomcates/add', (req, res, next) => {
        var doc = new roomCategory(req.body);
        doc.save((err, data) => {
            if (err) console.log(err);
            // console.log(data);
            res.redirect('/backendx/manageroom/manage-rooms');
        })
    });
});

// Manager manageroomsx
router.get('/manageroom/', (req, res, next) => {
    next();
}), router.get('/manageroom/manageroomsx', (req, res, next) => {
    roomCategory.find().exec((err, data) => {
        if (err) console.log(err);

        res.render('ad-manageroomall', { manageroomsx: data });
    }), router.get('/manageroom/manageroomsx/:room_category', (req, res, next) => {
        allRoom.find({ room_category: req.params.room_category }, (err, data) => {
            if (err) console.log(err);
            roomCategory.findOne({ room_category: req.params.room_category }, (err, roomcatesearch) => {
                if (err) console.log(err);

                res.render('ad-manageroomall', { allroomcate: data, roomcateax: req.params.room_category, rcatesearch: roomcatesearch });
            })
        })
    }), router.get('/manageroom/manageroomsx/:room_category/add', (req, res, next) => {
        roomCategory.findOne({ room_category: req.params.room_category }, (err, data) => {
            if (err) console.log(err);
            console.log(data);
            allRoom.find({ room_category: data.room_category }, (err, checkroom) => {
                if (err) console.log(err);
                console.log(checkroom)
                res.render('ad-manageroomall', { addroomx: data, checkroom: checkroom })
            })
        })
    }), router.post('/manageroom/manageroomsx/:room_category/addsuc', (req, res, next) => {
        var doc = new allRoom(req.body);
        allRoom.find({ room_category: doc.room_category }, (err, data) => {
            var lengx = data.length + 1
            lengx.toString();
            doc.room_num = lengx;
            doc.save((err, save) => {
                if (err) console.log(err);
                // console.log(data);
                res.redirect('/backendx/manageroom/manageroomsx')
            })
        })

    }), router.get('/manageroom/manageroomsx/:room_category/edit/:_id', (req, res, next) => {
        allRoom.findById(req.params._id, (err, data) => {
            if (err) console.log(err);
            console.log(data);
            roomCategory.find().exec((err, editRoomCate) => {
                if (err) console.log(err);
                roomCategory.find({}, { room_category: 1 }).exec((err, rType) => {
                    console.log(rType);

                    res.render('ad-manageroomall', { editOneRoom: data, editrCate: editRoomCate, rType: rType });
                })
            })
        })
    }), router.post('/manageroom/manageroomsx/:room_category/edit/:_id', (req, res, next) => {
        allRoom.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
            if (err) console.log(err);
            res.redirect('/backendx/manageroom/manageroomsx');
        })
    }), router.post('/manageroom/manageroomsx/:room_category/del/:_id', (req, res, next) => {
        allRoom.findByIdAndRemove(req.params._id, (err, data) => {
            if (err) console.log(err);
            console.log(data);
            res.redirect('/backendx/manageroom/manageroomsx');
        })
    })
});

router.get('/manageroom', (req, res, next) => {
    next();
}), router.get('/manageroom/manage-public-utility', (req, res, next) => {
    roomCategory.find({}, (err, data) => {
        if (err) console.log(err);
        pubUtil.find({}, (err, utilx) => {
            if (err) console.log(err);
            // console.log(utilx);
            res.render('ad-manageroomall', { utility: data, utilsx: utilx });
        })
    }), router.post('/manageroom/manage-public-utility/del/._id', (req, res, next) => {
        pubUtil.findByIdAndRemove(req.params._id, (err, data) => {
            if (err) { console.log(err); return (err); }
            console.log(data);
            res.redirect('/backendx/manageroom/manage-public-utility');

        })
    }), router.get('/manageroom/manage-public-utility/(:_id)?add-edit', (req, res, next) => {
        pubUtil.findById(req.params._id, (err, data) => {
            roomCategory.find({}).exec((err, rCate) => {
                if (err) console.log(err);
                console.log(data)
                res.render('ad-manageroomall', { addAndEdit: 'add-edit', rCateUtil: rCate, editPub: data })
            })
        })

    }), router.post('/manageroom/manage-public-utility/add', (req, res, next) => {
        var doc = new pubUtil(req.body);
        doc.save((err, dataSave) => {
            if (err) console.log(err);
            console.log(dataSave);
            res.redirect('/backendx/manageroom/manage-public-utility');
        })
    }), router.post('/manageroom/manage-public-utility/edit/:_id', (req, res, next) => {
        pubUtil.findByIdAndUpdate(req.params._id, req.body, (err, updatePub) => {
            if(err) console.log(err);
            console.log(updatePub);
            res.redirect('/backendx/manageroom/manage-public-utility');
        })
    })
})


router.get('/booking', (req, res, next) => {
    next();
}), router.get('/booking/allbook/all-list', (req, res, next) => {
    Booking.find().exec((err, data) => {
        if (err) console.log(err);
        console.log(data)
        res.render('ad-booking', { bookingall: data });
    })
}), router.get('/booking/allbook/:book_req_status', (req, res, next) => {
    Booking.find({ book_req_status: req.params.book_req_status }, (err, data) => {
        if (err) console.log(err);


        res.render('ad-booking', { bookstat: data, bookstatus: req.params.book_req_status })
    })

}), router.get('/booking/allbook/checkin/:_id', (req, res, next) => {
    Booking.findById(req.params._id, (err, data) => {
        if (err) console.log(err);

        allRoom.find({ room_category: data.book_roomtype, status: 'Available', room_type: data.book_roomname }, (err, roomtypee) => {
            if (err) console.log(err);

            res.render('ad-booking', { cin: data, roomtypex: roomtypee });

        })

    })

}), router.post('/booking/allbook/checkin/:_id', (req, res, next) => {
    Booking.findByIdAndUpdate(req.params._id, req.body, { new: true }, (err, data) => {
        if (err) console.log(err);
        console.log(data);
        // data.save()
        // res.redirect('backendx/booking/changestat/' + data._id + '/' + data.book_roomNo);
        next();
    }), router.post('/booking/allbook/checkin/:_id', (req, res, next) => {
        Booking.findOne({ _id: req.params._id }).exec((err, data) => {
            if (err) console.log(err);
            // res.send(data);
            if (data.book_roomtype === 'Rooms') {
                allRoom.findOneAndUpdate({ No: data.book_roomNo }, { $set: { status: 'Busy' } }, (err, upstat) => {
                    console.log(upstat);
                    res.redirect('/backendx/booking/allbook/' + data.book_req_status);
                })
            } else {
                allRoom.findOneAndUpdate({ room_type: data.book_roomname }, { $set: { status: 'Busy' } }, (err, upstat) => {
                    console.log(upstat);
                    res.redirect('/backendx/booking/allbook/' + data.book_req_status);
                })
            }
        })
    });
}), router.get('/booking/allbook/check-out/:_id', (req, res, next) => {
    Booking.find(req.params._id, (err, data) => {

    })
}), router.post('/booking/allbook/check-out/:_id', (req, res, next) => {
    Booking.findByIdAndUpdate(req.params._id, { $set: { book_req_status: 'check-out' } }, { new: true }, (err, data) => {
        console.log(data);
        if (data.book_roomtype === 'Rooms') {
            allRoom.findOneAndUpdate({ No: data.book_roomNo }, { $set: { status: 'Available' } }, (err, upstat) => {
                console.log(upstat);
                res.redirect('/backendx/booking/allbook/' + data.book_req_status);
            })
        } else {
            allRoom.findOneAndUpdate({ room_type: data.book_roomname }, { $set: { status: 'Available' } }, (err, upstat) => {
                console.log(upstat);
                res.redirect('/backendx/booking/allbook/' + data.book_req_status);
            })
        }
    });




    // router.post('/booking/allbook/checkin/:book_roomNo', (req, res, next) => {
    //     let cc = req.params.book_roomNo.book_roomNo;
    //     console.log(cc);
    //     allRoom.findOneAndUpdate({ No: req.params.book_roomNo }, { $set: { status: 'Busy' } }, (err, updatestat) => {
    //         if (err) console.log(err);
    //         console.log(updatestat);
    //         
    //     })





    // res.redirect('/backendx/booking/allbook/' + data.book_req_status);




    // }), allRoom.find({room_category: req.params.book_booktype}, (err, roomallx) => {
    //     if (err) console.log(err);
    //     console.log(roomallx);
}), router.post('/booking/allbook/del/:_id', (req, res, next) => {
    Booking.findByIdAndRemove(req.params._id, (err, data) => {
        if (err) console.log(err);
        res.redirect('/backendx/booking/allbook')
    })

});

// Report Page
var dataP = []
router.get('/report', (req, res, next) => {
    next();
}), router.get('/report/totalprice', (req, res, next) => {
    Booking.find({}).exec((err, data) => {
        if (err) console.log(err);
     

            roomCategory.find({}).exec((err, reportCate) => {
                if (err) console.log(err);
                for(i=0;i<data.length;i++){
                    data[i].totalprice = data[i].totalprice.toFixed(2).replace(/\d(?=\d{3}\.)/g, "$&,");
                }
                res.render('ad-reportx', { totalpricez: data, repCate: reportCate })
            });

    });
}), router.get('/report/reservation', (req, res, next) => {
    Booking.find().exec((err, bData) => {
        if (err) console.log(err);

        roomCategory.find().exec((err2, rCate) => {
            if (err2) {
                console.log(err2);
                return (err2);
            }


            // console.log(data.length);
            res.render('ad-reportx', { reservation: bData, roomCateReport: rCate });
        })
    })
}), router.get('/report/reservation/:room_category', (req, res, next) => {
    roomDes.find({ room_category: req.params.room_category }, (err, roomCateRes) => {
        if (err) console.log(err);
        console.log(roomCateRes);
        roomCategory.find().exec((err, roomCatecp1) => {
            if (err) console.log(err);
            Booking.find({ book_roomtype: req.params.room_category }, (err, resBookR) => {
                if (err) console.log(err);


                res.render('ad-reportx', { roomDesRs: roomCateRes, resBookR: resBookR, roomCateReport: roomCatecp1 });
            })
        })
    })
}), router.get('/report/bookformat', (req, res, next) => {
    bookFrom.find().exec((err, bFrom) => {
        if (err) return next(err);
        // console.log(bFrom)
        roomCategory.find().exec((err, rCate) => {
            if (err) console.log(err);

            Booking.find({}, { book_from: 1, book_roomtype: 1 }).exec((err, bfResult) => {
                if (err) return next(err);
                console.log(bfResult)
                res.render('ad-reportx', { bFrom: bFrom, bfResult: bfResult, rCate: rCate });
            })
        })
    }) // Same /report/bookformat
}), router.get('/report/bookformat/byclient', (req, res, next) => {
    bookFrom.find().exec((err, bFrom) => {
        if (err) return next(err);
        // console.log(bFrom)
        roomCategory.find().exec((err, rCate) => {
            if (err) console.log(err);

            Booking.find({}, { book_from: 1, book_roomtype: 1 }).exec((err, bfResult) => {
                if (err) return next(err);
                // console.log(bfResult)
                res.render('ad-reportx', { bClient: bFrom, bfResult: bfResult, rCate: rCate });
            })
        })
    }) //Same /report/bookformat
}), router.get('/report/bookformat/bystaff', (req, res, next) => {
    bookFrom.find().exec((err, bFrom) => {
        if (err) return next(err);
        // console.log(bFrom)
        roomCategory.find().exec((err, rCate) => {
            if (err) console.log(err);

            Booking.find({}, { book_from: 1, book_roomtype: 1 }).exec((err, bfResult) => {
                if (err) return next(err);
                // console.log(bfResult)
                res.render('ad-reportx', { bStaff: bFrom, bfResult: bfResult, rCate: rCate });
            })
        })
    })
})
*/


router.get('/users', async(req, res, next) => {
    // let sysAdmin = await userLevel.findOne({'userlevel': 'system-admin'})
    // userDetail.find({'userlevel': {$ne : sysAdmin._id.toString()}}, (err, data) => { console.log(data) }).populate('userlogin').populate({path:'userlevel', match:{'userlevel': {$ne : 'system-admin'}}, select: 'userlevel -_id'}).populate('userposition').exec((err, userManagex) => {
    //     if (err) console.log(err);
        // console.log(userManagex);
    let userData = await userDetail.findOne({ 'userlogin': req.session.userId }).populate('image').populate('userlevel').populate('userlogin');
    res.render('ad-user', { title:'users', userlv:req.session.userlevel, userData: userData });
    // })
})
router.get('/itemwithdraw', async(req, res, next) => {
    // let sysAdmin = await userLevel.findOne({'userlevel': 'system-admin'})
    // userDetail.find({'userlevel': {$ne : sysAdmin._id.toString()}}, (err, data) => { console.log(data) }).populate('userlogin').populate({path:'userlevel', match:{'userlevel': {$ne : 'system-admin'}}, select: 'userlevel -_id'}).populate('userposition').exec((err, userManagex) => {
    //     if (err) console.log(err);
        // console.log(userManagex);
    let userData = await userDetail.findOne({ 'userlogin': req.session.userId }).populate('image').populate('userlevel').populate('userlogin');
    res.render('ad-withdraw', { title:'itemwithdraw', userlv:req.session.userlevel, userData:userData });
    // })
})

router.get('/reportx', async(req, res, next) => {
}), router.get('/reportx/itemwithdraw', async(req, res, next) => {
    let userData = await userDetail.findOne({ 'userlogin': req.session.userId }).populate('image').populate('userlevel').populate('userlogin');
    console.log(req.url)
    res.render('ad-reportwithdraw', {title : 'reportwithdraw', userlv:req.session.userlevel, userData: userData})
}), router.get('/reportx/product', async(req, res, next) => {
    let userData = await userDetail.findOne({ 'userlogin': req.session.userId }).populate('image').populate('userlevel').populate('userlogin');
    let category = await itemCategorys.find({}, '_id item_description');
    res.render('ad-reportproduct', {title : 'reportproduct', userlv:req.session.userlevel, userData: userData, productCategory: category})
})



router.get('/user(/:config)?', async(req, res, next) => {
    // var data = [];
    // var titleText = "";
    // if(req.params.config === 'level') {
    //     data = await userLevel.find({});
    //     titleText = "จัดการระดับสมาชิก"
    // }
    // res.render('ad-user', {title: 'userManage', titleText:titleText, configUser: req.params.config})
    next();
})
, router.get('/user/level', (req, res, next) => {
    userLevel.find().exec((err, userlvl) => {
        if (err) {
            console.log(err);
            return next(err);
        } else {
            // console.log(userlvl);
            res.render('ad-usersx', { userlvl: userlvl })
        }

    }), router.get('/user/level/edit/:userlevel', (req, res, next) => {
        userLevel.findOne({ userlevel: req.params.userlevel }).exec((err, edituser) => {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                // console.log(edituser);
                res.render('ad-usersx', { editlevel: edituser });
            }
        })
    }), router.post('/user/level/edit/:userlevel', (req, res, next) => {
        userLevel.findOneAndUpdate({ userlevel: req.params.userlevel }, req.body, (err, edit) => {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                // console.log(edit);
                res.redirect('/backendx/user/level');
            }
        })
    }), router.post('/user/level/:userlevel/del/:_id', (req, res, next) => {
        userLevel.findByIdAndRemove(req.params._id).exec((err, delData) => {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                // console.log(delData);
                res.redirect('/backendx/user/level');
            }

        })
    }), router.get('/user/level/insert', (req, res, next) => {

        res.render('ad-usersx', { insert: 'insert' });
    }), router.post('/user/level/insert/add', (req, res, next) => {
        var doc = new userLevel(req.body);
        doc.save((err, data) => {
            if (err) console.log(err);
            // console.log(data);
            res.redirect('/backendx/user/level');
        })

    }), router.get('/user/level/refresh', (req, res, next) => {
        res.redirect('/backendx/user/level');
    })

}), router.get('/user/position', (req, res, next) => {
    userPosition.find().exec((err, userPos) => {
        if (err) console.log(err);
        console.log(userPos);
        res.render('ad-usersx', { userPos: userPos });
    }), router.get('/user/position/edit/:position', (req, res, next) => {
        userPosition.findOne({ position: req.params.position }, (err, editPosition) => {
            if (err) console.log(err);
            console.log(editPosition);
            res.render('ad-usersx', { editPos: editPosition });
        })
    }), router.post('/user/position/edit/:position', (req, res, next) => {
        userPosition.findOneAndUpdate({ position: req.params.position }, req.body, (err, editPosSuccess) => {
            if (err) console.log(err);
            console.log(editPosSuccess);
            res.redirect('/backendx/user/position');

        })
    }), router.get('/user/position/insert', (req, res, next) => {
        res.render('ad-usersx', { insertPos: 'insertPos' });
    }), router.post('/user/position/insert/add', (req, res, next) => {
        var doc = new userPosition(req.body);
        doc.save((err, dataPos) => {
            if (err) return err;
            res.redirect('/backendx/user/position');
        })
    }), router.post('/user/position/del/:_id', (req, res, next) => {
        userPosition.findByIdAndRemove(req.params._id, (err, delPos) => {
            if (err) console.log(err);
            console.log(delPos);
            res.redirect('/backendx/user/position');
        })
    }), router.get('/user/position/refresh', (req, res, next) => {
        res.redirect('/backendx/user/posision');
    })

}), router.get('/user/manage', async(req, res, next) => {
    let sysAdmin = await userLevel.findOne({'userlevel': 'system-admin'})
    userDetail.find({'userlevel': {$ne : sysAdmin._id.toString()}}, (err, data) => { console.log(data) }).populate('userlogin').populate({path:'userlevel', match:{'userlevel': {$ne : 'system-admin'}}, select: 'userlevel -_id'}).populate('userposition').exec((err, userManagex) => {
        if (err) console.log(err);
        // console.log(userManagex);
        res.render('ad-usersx', { userManage: userManagex });
    })
}), router.get('/user/manage/insert', (req, res, next) => {
    userLevel.find().skip(1).exec((err, userLvData) => {
        userPosition.find().skip(1).exec((err, userPosData) => {


            res.render('ad-usersx', { insertUser: 'insert', userLvData: userLvData, userPosData: userPosData });
        })
    }) // INSERT DATA
}), router.get('/user/manage/refresh', (req, res, next) => {
    // res.redirect('/backendx/user/manage');
    // REFRESH
}), router.post('/user/manage/insert/success', upload, (req, res, next) => {


    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('พาสเวิร์ดไม่ตรงกัน');
        err.status = 400;
        res.send(err);
        return next(err);
    }

    allUser.findOne().exec((err, userDatax) => {
        console.log(userDatax);
        console.log(req.body.email);


        if (req.body.email === userDatax.email) {
            var err = new Error('อีเมล์นี้ถูกใช้งานแล้ว กรุณาเปลี่ยนอีเมล์')
            err.status = 400;
            return next(err);

        } else if (req.body.username === userDatax.username) {
            var err = new Error('ชื่อผู้ใช้ถูกใช้งานไปแล้ว กรุณาเปลี่ยนชื่อผู้ใช้')
            err.status = 400;
            return next(err);
        } else {
            if (req.body.email &&
                req.body.username &&
                req.body.firstname &&
                req.body.lastname &&
                req.body.password &&
                req.body.passwordConf) {

                var userLog = {
                    _id: new ObjectId(),
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    passwordConf: req.body.passwordConf
                }




                // var userDetailx = {

                //     firstname: req.body.firstname,
                //     lastname: req.body.lastname,
                //     phoneTel: req.body.phoneTel,
                //     // ObjectId()
                //     userlevel: req.body.userlevel,
                //     userposition: req.body.userposition,
                //     userlogin: userLog._id

                // }

                // res.send([userLog, userDetailx]);

                // เพิ่มเติมด้วย ////////////////////////////*******************/////////////////// */
                allUser.create(userLog, (err, user) => {
                    if (err) {
                        console.log(err)
                        return next(err)
                    } else {
                        // fschunks.findOne({ 'files_id': req.file.id }).exec((err, chunksIdx) => {
                            // if (err) console.log(err);
                            var userDetailx = {
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                phoneTel: req.body.phoneTel,
                                // ObjectId()
                                userlevel: req.body.userlevel,
                                userposition: req.body.userposition,
                                userlogin: userLog._id,
                                // image: chunksIdx._id

                            }
                            userDetail.create(userDetailx, (err, userDetaill) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                } else {
                                    console.log(userDetaill);
                                    // req.session.userId = user._id;
                                    return res.redirect('/backendx/user/manage');
                                }
                            })
                        // })
                    }
                });
            }
        }
    });
})












// API

router.post('/api/login', verifyToken, (req, res, next) => {
    console.log('user login')
    userDetail.findOne({ userlogin: req.cookies.userId }).populate('image').populate('userlevel').populate('userposition').exec((err, user) => {
        if (err) {
            console.log(err)
        } else {
            console.log(user);

            // jwt.verify(req.token, 'ss', (err, token) => {
            //     if(err) console.log(err);
            //     res.json({ token: token });
            // })
            // console.log(user);
        }
    })
})

// router.post('/api/user/nowUser', (req, res, next) => {
//     userDetail.findOne({ userlogin: req.cookies.userId }, { userlogin: 0 }).populate('image').populate('userlevel').populate('userposition').exec((err, user) => {
//         // var clone = {};
//         // clone = user;
//         if (err || !user) {
//             var err = new Error('File Not Found');
//             err.status = 404;

//             return next(err);
//         } else {
//             // console.log(user);
//             return res.json(user);
//         }
//     })
// });





// LOGOUT Session
router.get('/logout', (req, res, next) => {
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
                        // delKey = fs.unlinkSync('private.Key');
                        if (req.tkslicex !== undefined) {
                            fs.unlinkSync('private.Key' + req.tkslicex);
                            console.log('logout Success!');
                            return res.redirect('/wspx');
                        } else {
                            console.log('logout Success!');
                            return res.redirect('/wspx');
                        }
                    }


                })
            }
        });
    }
})


function chkVal(e){
    console.log(e.value)
}













module.exports = router;

module.exports.history = (req, res, next) => {
    console.log(req.urlx);
    req.back = req.urlx;

    console.log(req.back);
    return next();
}

// router.get('/booking/allbook/checkin/:_id', (req, res, next) => {
//     Booking.findOne({ _id: req.params._id }, req.body, (err, data) => {
//         if (err) console.log(err);
//         // console.log(((data.book_chkout.getMonth() + 1) - (data.book_chkin.getMonth() + 1)));
//         // console.log("Day chkin | ", data.book_chkin.getDate());
//         // console.log("Day chkout | ", data.book_chkout.getDate());
//         // console.log("month chkin | ", data.book_chkin.getMonth() + 1 );
//         // console.log("month chkout | ", data.book_chkout.getMonth() + 1);
//         // console.log((Math.abs(data.book_chkin - data.book_chkout) / (1000 * 60 * 60 * 24)))
//         // console.log("month chkin | ", monthcal(data.book_chkin.getMonth() + 1));
//         // console.log("month chkout | ", monthcal(data.book_chkout.getMonth() + 1));

//         res.render('ad-booking', { cin: data });

//     })
// })

