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
const orderDetail = require("../../models/orderDetailModel");
const autogencode = require('../../models/autogencodeModel');


router.post('/changestatus/:_id', (req, res, next) => {
    orderMain.findByIdAndUpdate(req.params._id, {'order_status':req.body.changeStatus, order_confirm_by:req.body.userId}, (err, doc) => {
        console.log(doc)
    })
    // orderMain.findById(req.params._id, (err, doc) => {
    //     if(err) console.log(err);
    //     console.log(doc);
    // })
    res.send('test')
})


router.post('/add', async(req, res, next) => {
    req.body.order_totalmoney = removeComma(req.body.order_totalmoney);
    var codeText = '';
    if(req.body.order_no.length == 0) {
        autogencode.findOne({}, (err, data) => {
            if(err) console.log(err);
            res.status(200).json({data:'success', action:'add'});
            if(data.codeArray[0].type == 'product_code'){
                req.body.order_no = data.codeArray[0].genCodeText + data.codeArray[0].genSpacialChar + data.codeArray[0].genCode
                let increseData =  parseInt(data.codeArray[0].genCode) + 1;
                let codeText = data.codeArray[0].genCode;
                let updateCode = codeText.slice(0, codeText.length - increseData.toString().length) + increseData.toString();
                data.codeArray[0].genCode = updateCode
                data.update({codeArray : data.codeArray}, (err, dataC) => {
                    if(err) {
                        console.log(err);
                        return false;
                    }
                    let doc2 = new orderMain({...req.body, order_status:'Pending'})
                    doc2.save((err, data) => {
                        if(err) {
                            console.log(err);
                            return false;
                        }
                        if(typeof req.body.item_id == 'object'){
                            for(let i = 0; i < req.body.item_id.length; i++){
                                let price = removeComma(req.body.item_price[i])
                                // console.log(req.body)
                                let dataSave = {
                                    "order_id" : data._id,
                                    "product_id" : req.body.item_id[i],
                                    "item_quantity" : req.body.item_quantity[i],
                                    "item_price" : price,
                                    "item_sort" : i
                                }
                                orderDetail.create(dataSave, async(err, dataDetail) => {
                                    if(err) throw err;
                                    let productQuantity = await product.findById(dataDetail.product_id, 'product_onStock');
                                    let onStock = parseInt(productQuantity.product_onStock) - parseInt(dataDetail.item_quantity);
                                    product.findByIdAndUpdate(dataDetail.product_id, {"product_onStock" : onStock}, (err, data) => {
                                        if(err) throw err;
                                    })
                                })   
                            }
                        } else {
                            let price = removeComma(req.body.item_price)
                            let dataSave = {
                                "order_id" : data._id,
                                "product_id" : req.body.item_id,
                                "item_quantity" : req.body.item_quantity,
                                "item_price" : price,
                                "item_sort" : 0
                            }
                            orderDetail.create(dataSave, async(err, dataDetail) => {
                                if(err) throw err;
                                let productQuantity = await product.findById(dataDetail.product_id, 'product_onStock');
                                let onStock = parseInt(productQuantity.product_onStock) - parseInt(dataDetail.item_quantity);
                                productQuantity.update({'product_onStock': onStock}, (err, dataC) => {
                                    if(err) {
                                        console.log(err);
                                        return false;
                                    }
                                })
                            })   
                        }
                    })
                })
                

            }
        });
    } else {
        orderMain.findOne({"order_no" : req.body.order_no}, (err, doc) => {
            if(err) {
                let e = new Error(err);
                res.send(e);
            } else {
                // console.log(doc)
                if(doc) {
                    res.status(200).json({data:'dataexists', action:'error'});
                } else {
                    res.status(200).json({data:'success', action:'add'});
                    let doc2 = new orderMain({...req.body, order_status:'Pending'})
                    doc2.save((err, data) => {
                        if(err) {
                            console.log(err);
                            return false;
                        }
                        if(typeof req.body.item_id == 'object'){
                            for(let i = 0; i < req.body.item_id.length; i++){
                                let price = removeComma(req.body.item_price[i])
                                // console.log(req.body)
                                let dataSave = {
                                    "order_id" : data._id,
                                    "product_id" : req.body.item_id[i],
                                    "item_quantity" : req.body.item_quantity[i],
                                    "item_price" : price,
                                    "item_sort" : i
                                }
                                orderDetail.create(dataSave, async(err, dataDetail) => {
                                    if(err) throw err;
                                    let productQuantity = await product.findById(dataDetail.product_id, 'product_onStock');
                                    let onStock = parseInt(productQuantity.product_onStock) - parseInt(dataDetail.item_quantity);
                                    product.findByIdAndUpdate(dataDetail.product_id, {"product_onStock" : onStock}, (err, data) => {
                                        if(err) throw err;
                                    })
                                })   
                            }
                        } else {
                            let price = removeComma(req.body.item_price)
                            let dataSave = {
                                "order_id" : data._id,
                                "product_id" : req.body.item_id,
                                "item_quantity" : req.body.item_quantity,
                                "item_price" : price,
                                "item_sort" : 0
                            }
                            orderDetail.create(dataSave, async(err, dataDetail) => {
                                if(err) throw err;
                                let productQuantity = await product.findById(dataDetail.product_id, 'product_onStock');
                                let onStock = parseInt(productQuantity.product_onStock) - parseInt(dataDetail.item_quantity);
                                product.findByIdAndUpdate(dataDetail.product_id, {"product_onStock" : onStock}, (err, data) => {
                                    if(err) throw err;
                                })
                            })   
                        }
                    })
                }
            }
        })
    }
    // console.log(req.body.order_no);
    /*
    let doc = new orderMain({...req.body, order_status:'Pending'})
        doc.save((err, data) => {
            if(err) {
                console.log(err);
                return false;
            }
            if(typeof req.body.item_id == 'object'){
                for(let i = 0; i < req.body.item_id.length; i++){
                    let price = removeComma(req.body.item_price[i])
                    // console.log(req.body)
                    let dataSave = {
                        "order_id" : data._id,
                        "product_id" : req.body.item_id[i],
                        "item_quantity" : req.body.item_quantity[i],
                        "item_price" : price,
                        "item_sort" : i
                    }
                    orderDetail.create(dataSave, async(err, dataDetail) => {
                        if(err) throw err;
                        let productQuantity = await product.findById(dataDetail.product_id, 'product_onStock');
                        let onStock = parseInt(productQuantity.product_onStock) - parseInt(dataDetail.item_quantity);
                        product.findByIdAndUpdate(dataDetail.product_id, {"product_onStock" : onStock}, (err, data) => {
                            if(err) throw err;
                        })
                    })   
                }
            } else {
                let price = removeComma(req.body.item_price)
                let dataSave = {
                    "order_id" : data._id,
                    "product_id" : req.body.item_id,
                    "item_quantity" : req.body.item_quantity,
                    "item_price" : price,
                    "item_sort" : 0
                }
                orderDetail.create(dataSave, async(err, dataDetail) => {
                    if(err) throw err;
                    let productQuantity = await product.findById(dataDetail.product_id, 'product_onStock');
                    let onStock = parseInt(productQuantity.product_onStock) - parseInt(dataDetail.item_quantity);
                    product.findByIdAndUpdate(dataDetail.product_id, {"product_onStock" : onStock}, (err, data) => {
                        if(err) throw err;
                    })
                })   
            }
        })
    */
})

router.post('/edit(/:_id)', async(req, res, next) => {
    req.body.order_totalmoney = removeComma(req.body.order_totalmoney);
    orderMain.findByIdAndUpdate(req.params._id, req.body, async(err, data) => {
        if(err) {
            console.log(err) 
            return false;
        }
        console.log(req.body);
        console.log(data);
        res.status(200).json({data:'success', action:'edit'});
        let item_id = [];
        let item_price = [];
        let item_quantity = [];
        let itemLength = req.body.item_id.length;
        console.log(typeof req.body.item_id);
        if(typeof req.body.item_id !== 'object') {
            itemLength = 1
            item_id[0] = req.body.item_id;
            item_price[0] = req.body.item_price;
            item_quantity[0] = req.body.item_quantity;
        } else {
            item_id = [...req.body.item_id];
            item_price = [...req.body.item_price];
            item_quantity = [...req.body.item_quantity];
        }
            for(let i = 0; i < itemLength; i++) {
                let Update = await orderDetail.findOne({"order_id": data._id, "product_id":item_id[i]})
                console.log(Update, "update");
                let itemPrice = removeComma(item_price[i])
                if(Update !== null) {
                    orderDetail.findByIdAndUpdate(Update._id, {
                        "item_quantity" : item_quantity[i],
                        "item_price" : itemPrice,
                        "item_sort" : i,
                    }, async(err, dataUpdate) => {
                        if(err) {
                            console.log(err);
                            return false;
                        }
                        let productQuantity = await product.findById(dataUpdate.product_id, 'product_quantity product_onStock');
                        let onStock = parseInt(productQuantity.product_quantity) - parseInt(dataUpdate.item_quantity);
                        console.log(onStock);
                        product.findByIdAndUpdate(dataUpdate.product_id, {"product_onStock" : onStock}, (err, data) => {
                            if(err) throw err;
                        })
                    })
                } else {
                    let dataSave = {
                        "order_id" : data._id,
                        "product_id" : item_id[i],
                        "item_quantity" : item_quantity[i],
                        "item_price" : itemPrice,
                        "item_sort" : i,
                    }
                    orderDetail.create(dataSave, async(err, dataDetail) => {
                        if(err) throw err;
                        let productQuantity = await product.findById(dataDetail.product_id, 'product_onStock');
                        let onStock = parseInt(productQuantity.product_onStock) - parseInt(dataDetail.item_quantity);
                        product.findByIdAndUpdate(dataDetail.product_id, {"product_onStock" : onStock}, (err, data) => {
                            if(err) throw err;
                        })
                    })   
                }
            }

    });

})


router.post('/delete/:_id', async(req, res, next) => {
    orderMain.findByIdAndRemove(req.params._id, async(err, data) => {
        if(err) throw err;
        res.status(200).send('success');
        let orderArr = await orderDetail.find({"order_id": data._id}, '_id')
        for(let i=0;i< orderArr.length; i++){
            orderDetail.findByIdAndRemove(orderArr[i]._id, {product_id: 1, item_quantity: 1}, async(err, dataDetail) => {
                if(err) throw(err);
                // console.log(dataDetail);
                let stock = await product.findById(dataDetail.product_id, {product_onStock: 1});
                // console.log(stock);
                let onStock = parseInt(stock.product_onStock) + parseInt(dataDetail.item_quantity)
                stock.update({'product_onStock': onStock}, (err, data) => {
                    if(err) {
                        console.log(err)
                        return false;
                    } else { 
                        console.log(data);
                    };
                    
                })
                // product.findByIdAndUpdate(dataDetail.product_id, {'product_onStock': onStock}, (err, productData) => {
                //     if(err) throw(err);
                // })
            })
        }
    })
})
// router.post("/", async (req, res, next) => {
//     console.log(req.body);
//     next();
// }), router.post('/add', async(req, res, next) => {
//     console.log(req.body);
//     res.status(200).send("helloWorld");
// })




router.get("/modal(/:_id)?", async(req, res, next) => {
    var checkRole = await userDetail.findOne({'userlogin': req.session.userId}).populate('userlevel', 'userlevel');
    let userN = undefined
    let showName = undefined
    let userId = undefined
    let dataTable = undefined;
    var titleText = "", btnText = "", eventText = "", classBtnText = "";
    let dataDetail = undefined;
    let permEdit = true;
    var orderTotalMoney = '';
    if(req.params._id) {
        // dataTable = await orderMain.findById(req.params._id).populate('order_by').populate({ path: 'order_confirm_by', populate: {path:'userlogin'}});
        dataTable = await orderMain.findById(req.params._id).populate('order_by').populate('order_confirm_by');
        showName = dataTable.order_by.firstname + ' ' + dataTable.order_by.lastname
        userId = dataTable.order_by._id
        let d = dataTable.order_date
        let monthArr = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
        let order_date_show = d.getDate() + ' ' + monthArr[d.getMonth()] + ' ' + d.getFullYear();
        dataTable.order_date_show = order_date_show;
        orderTotalMoney = addComma(dataTable.order_totalmoney)
        // console.log(dataTable);
        dataDetail = await orderDetail.find({'order_id': req.params._id}).populate('product_id').sort({'item_sort' : 1});
        titleText = 'แก้ไข'
        btnText = 'แก้ไข'
        classBtnText = 'btn-add'
        eventText = 'edit'
        if(checkRole._id.toString() !== dataTable.order_by._id.toString()) permEdit = false;
    } else {
        userN = await userDetail.findOne({'userlogin': req.session.userId});
        showName = userN.firstname + ' ' + userN.lastname;
        userId = userN._id
        titleText = 'เพิ่ม'
        btnText = 'บันทึก'
        classBtnText = 'btn-add'
        eventText = 'add'
    }
    let rdOnly = ''

    if(checkRole.userlevel.userlevel.toLowerCase() == 'admin') rdOnly = 'readOnly';
    let pathComplie = path.join(__dirname, '../../views/modalAll.pug');
    var html = pug.renderFile(pathComplie, {
        data: dataTable, 
        dataItem: dataDetail,
        btnText : btnText, 
        title: titleText,
        modalType: 'itemwithdraw',
        orderTotalMoney : orderTotalMoney,
        classBtn : classBtnText,
        eventText : eventText,
        userShowName: showName,
        userId: userId,
        role: checkRole.userlevel.userlevel,
        rdOnly : rdOnly,
        perm: permEdit,
    });
    res.status(200).send(html)
});



router.get("/table_data", async (req, res, next) => {
    let userlv = req.session.userlevel.toLowerCase();
    var order = [];
    let filter = {};
    if(userlv === 'user') filter = {'order_by' : req.session.userDetailId};
    order = await orderMain.find(filter).populate({path: 'order_by', populate: {path:'userlevel'}}).sort({order_date: -1})
    console.log(order);
    res.status(200).json({data:order})
});


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