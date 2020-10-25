var express = require("express");
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var router = express.Router();
var path = require('path')
var pug = require('pug')
var userLevel = require("../../models/userlevelModel");
var userPosition = require("../../models/userPositionModel");
var userDetail = require("../../models/userDetailModel");
var user = require("../../models/userModel");
const fsfilesaves = require('../../models/fsFileSave.js')
const bcrypt = require('bcrypt');

// var findUserId = await userDetail.findById(req.params._id)
// if(req.body.oldPassword.length > 0) {
//     let userloginEnc = await user.findById(findUserId.userlogin)
//     bcrypt.compare(req.body.oldPassword, userloginEnc.password, (err, result) => {
//         if(err) throw err;
//         if(result === false) {
//             res.status(500).json({data:'passWordNotCompare', action:'edit'});
//         } else {
//             const salt = bcrypt.genSaltSync(saltRounds);
//             const hash = bcrypt.hashSync(req.body.password, salt);
//             objSave.password = hash;
//             // user.findByIdAndUpdate(userloginEnc, )
//         }
//     })
// } else {

var multer = require('multer');
const fs = require('fs')
var fileName = '';
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        let fName = file.originalname.split('.')
        fileName = file.fieldname + '-' + Date.now() + '.' + fName[fName.length - 1]
      cb(null, fileName)
    }
  })
   
var upload = multer({ storage: storage })

// console.log(storage)
router.post('/showpass/:_id', async(req, res, next) => {
    let userlogin = await user.findById(req.params._id);
    res.status(200).json({passwordEnc: userlogin.password, passwordDecode: userlogin.passwordConf})
})


router.post("/(:action)?(/:_id)?", upload.single('fileUpload'), async(req, res, next) => {
    if(req.params.action === 'add') {
        const checkUserExist = await user.find({'username': req.body.username})
        console.log(checkUserExist);
        if(checkUserExist.length === 0) {
            var userSave = {
                _id: new ObjectId(),
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                passwordConf: req.body.passwordConf
            }
            user.create(userSave, (err, user) => {
                if (err) {
                    console.log(err)
                    // return next(err)
                } else {
                    console.log(user)
                    var userDetailx = {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        phoneTel: req.body.phoneTel,
                        userlevel: req.body.userlevel,
                        userposition: req.body.userposition,
                        userlogin: userSave._id,
                    }
                    if(req.file) {
                        let FileSave = {_id: new ObjectId(), ...req.file};
                        userDetailx.image = FileSave._id;
                        fsfilesaves.create(FileSave, (err, data) => {
                            if(err) console.log(err);
                            console.log(data);
                        })
                        
                    }
                    userDetail.create(userDetailx, (err, userDetaill) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(userDetaill);
                        }
                    })
                }
            });
            res.status(200).json({data: 'success', action:req.params.action});
        } else {
            res.status(200).json({data: 'alertExist', action:req.params.action});
        }

        // var doc = new userLevel(req.body);
        // doc.save((err, data) => {
        //     if (err) console.log(err);
        //     res.status(200).json({ data: data, msg: 'success', action:req.params.action });
        // });
    } else if(req.params.action === 'edit') {
        var objSave = {...req.body};
        if(req.file) {
            let chkHaveImage = await userDetail.findById(req.params._id).populate('fsfilesaves');
            if(chkHaveImage.image) {
                let f = await fsfilesaves.findByIdAndRemove(chkHaveImage.image._id);
                await fs.unlinkSync(f.path.toString());
            }
            
            let FileSave = {_id: new ObjectId(), ...req.file};
            objSave.image = FileSave._id;
            fsfilesaves.create(FileSave, (err, data) => {
                if(err) throw err;
                // console.log(data);
            })
        }
        res.status(200).json({data:'success', action:'edit'});
        userDetail.findByIdAndUpdate(req.params._id, objSave, (err, doc) => {
            if(err) throw err;
            // console.log(doc);
        })

    } else if(req.params.action === 'picture') {

        res.status(200).json({data:'success', action:'picture'});
    } else if(req.params.action === 'delete') {
        // let userDelete = await userDetail.findById(req.params._id);
        userDetail.findByIdAndRemove(req.params._id, (err, doc) => {
            if(err) return err;
            user.findByIdAndRemove(doc.userlogin, (err, userLogin) => {
                if(err) return err;
            })
        });
        // let loginDelete = await user.findById(userDelete.userlogin);

        // console.log(userDelete);
        // console.log(loginDelete);
        res.status(200).send('success');

    } else {
        // validate form
        var checkBack = [], userExist;
        if(req.body.username.trim().length > 0) {
            let checkExist = await user.find({'username': req.body.username});
            checkExist.length > 0 ? (userExist = true) : (userExist = false);
        }
        for (const [key, value] of Object.entries(req.body)) {
           if(value.trim().length === 0) checkBack.push(key);
        } 
        res.status(200).json({objNull:checkBack, userExist: userExist})
    }
});


router.get("/modal(/:_id)?(/:editpfile)?", async (req, res, next) => {
    let dataTable = null;
    var titleText = "", btnText = "", eventText = "", classBtnText = "";
    var userLv = await userLevel.find({'userlevel' : {$in:['Admin', 'User'] }})
    var imageFile = null;
    // console.log(imageFile);
    let nowSession = '';
    if(req.params._id !== undefined) {
        let checkSession = await userDetail.findOne({'userlogin': req.session.userId}).populate('userlevel');
        nowSession = checkSession.userlevel.userlevel.toLowerCase();
        dataTable = await userDetail.findById(req.params._id).populate('userlogin').populate('image');
        titleText = "แก้ไขข้อมูล : " + dataTable.userlogin.username;
        btnText = 'แก้ไข';
        eventText = 'edit';
        classBtnText = 'btn-add';
        if(dataTable.image) imageFile = fs.readFileSync(dataTable.image.path, {encoding: 'base64'});
    } else {
        titleText = "เพิ่มผู้ใช้ใหม่";
        btnText = 'บันทึก';
        eventText = 'add';
        classBtnText = 'btn-add'
    }
    if(req.params.editpfile) classBtnText = 'btn-add-profile';
    let pathComplie = path.join(__dirname, '../../views/modalAll.pug');
    var html = pug.renderFile(pathComplie, {nowSession: nowSession, editById: req.params._id,picture: imageFile, title:titleText, btnText:btnText, eventText:eventText, classBtn:classBtnText, data: dataTable, userLv: userLv, modalType:'users'});
    res.status(200).send(html)
});



router.get("/table_data", async (req, res, next) => {
    let sysAdmin = await userLevel.findOne({'userlevel': 'system-admin'})
    let dataTable = await userDetail.find({'userlevel': {$ne : sysAdmin._id.toString()} }).populate('userlogin').populate({path:'userlevel', match:{'userlevel': {$ne : 'system-admin'}}, select: 'userlevel -_id'}).populate('userposition').exec();
    // let dataTable = await userDetail.find({ }).populate('userlogin').populate({path:'userlevel', select: 'userlevel -_id'}).populate('userposition').exec();
    res.status(200).json({data:dataTable})
});


module.exports = router;
