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
var product = require("../../models/productsModel");
const fsfilesaves = require('../../models/fsFileSave.js')
const bcrypt = require('bcrypt');
const orderMain = require("../../models/orderMainModel");
var itemCategory = require("../../models/itemCategorysModel");
const orderDetail = require("../../models/orderDetailModel");

const autogencode = require('../../models/autogencodeModel');
const { update } = require("../../models/userModel");

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

// var multer = require('multer');
// const fs = require('fs')
// var fileName = '';
// // SET STORAGE
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         let fName = file.originalname.split('.')
//         fileName = file.fieldname + '-' + Date.now() + '.' + fName[fName.length - 1]
//       cb(null, fileName)
//     }
//   })
   
// var upload = multer({ storage: storage })

// console.log(storage)


// router.get("/itemwithdraw/modal(/:_id)?", async(req, res, next) => {
//     let userN = await userDetail.findOne({'userlogin': req.session.userId});
//     let showName = userN.firstname + ' ' + userN.lastname;
//     let userId = userN._id
//     let dataTable = undefined;
//     var titleText = "", btnText = "", eventText = "", classBtnText = "";
//     let dataDetail = undefined;
//     var orderTotalMoney = '';
//     if(req.params._id) {
//         dataTable = await orderMain.findById(req.params._id).populate('order_by');
//         let d = dataTable.order_date
//         let monthArr = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
//         let order_date_show = d.getDate() + ' ' + monthArr[d.getMonth()] + ' ' + d.getFullYear();
//         dataTable.order_date_show = order_date_show;
//         orderTotalMoney = addComma(dataTable.order_totalmoney)
//         dataDetail = await orderDetail.find({'order_id': req.params._id}).populate('product_id').sort({'item_sort' : 1});
//         titleText = 'แก้ไข'
//         btnText = 'แก้ไข'
//         classBtnText = 'btn-add'
//         eventText = 'edit'
//     } else {
//         titleText = 'เพิ่ม'
//         btnText = 'บันทึก'
//         classBtnText = 'btn-add'
//         eventText = 'add'
//     }
//     let pathComplie = path.join(__dirname, '../../views/modalAll.pug');
//     var html = pug.renderFile(pathComplie, {
//         data: dataTable, 
//         dataItem: dataDetail,
//         btnText : btnText, 
//         title: titleText,
//         modalType: 'itemwithdraw',
//         orderTotalMoney : orderTotalMoney,
//         classBtn : classBtnText,
//         eventText : eventText,
//         userShowName: showName,
//         userId: userId
//     });
//     res.status(200).send(html)
// });



router.get("/itemwithdraw/table_data", async (req, res, next) => {

    let searchStatus = req.query.category_id;
    let filterSearch = {};
    searchStatus ? (filterSearch.order_status = searchStatus) : '';
    req.session.userlevel.toLowerCase() === 'user' ? (filterSearch.order_by = req.session.userDetailId) : '' ;
    var order = await orderMain.find(filterSearch).populate('order_by');
    res.status(200).json({data:order})
});


router.get('/product/table_data', async(req, res, next) => {
    let filter = req.query.category_id !== undefined ? {'product_category' : req.query.category_id } : {};
    let listProduct = await product.find(filter).populate('product_category', itemCategory ).populate('product_image');
    // for(let i = 0;i< listProduct.length; i++) {
    //     if(listProduct[i].product_image !== null) {
    //         let image = await fs.readFileSync(listProduct[i].product_image.path, 'base64')
    //         let dataImage = 'data:' + listProduct[i].product_image.mimetype + ';base64,' + image
    //         listProduct[i].image = dataImage;
    //     }
    // }
    res.status(200).json({data:listProduct});
})

module.exports = router;



const removeComma = (str) => {
    str = String(str);
    while(str.indexOf(',') > 0){
        str = str.replace(',','');
    }
    return str;
}
const addComma = (str) => {
    str = String(str);
    let newVal = '';
    let t = str.split('.')
    newVal += t[0].length > 0 ? t[0] : '0';
    let regxr = /^(\d+)(\d{3})/g;
    while(regxr.test(newVal)){
        newVal = newVal.replace(regxr, '$1,$2');
    }
    newVal += t.length > 1 ? '.' + t[1] : '.00';
    return newVal;
}