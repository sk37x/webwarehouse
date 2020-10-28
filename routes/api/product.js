var express = require("express");
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;
var router = express.Router();
var product = require("../../models/productsModel");
var itemCategory = require("../../models/itemCategorysModel");
var path = require('path');
var pug = require('pug');
var multer = require('multer');
const fsfilesaves = require('../../models/fsFileSave')
const fs = require('fs');
var fileName = '';
const autogencode = require('../../models/autogencodeModel');
const orderDetail = require("../../models/orderDetailModel");
const { forEach } = require("../../models/fs.pictureModel");
const { resolve } = require("path");
const { reject } = require("lodash");
var timeout = require('connect-timeout');



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

const allItem = async() => {
    let list = await itemCategory.find({"item_status": 1});
    return list;
}

const allProduct = async() => {
    let list = await product.find({});
    return list;
}

router.get('/showallitem', (req, res) => {
    product.find({'product_status': true}, (err, doc) => {
        res.json(doc)
    });
})

// const tout = function(req, res, next){
//   res.timeout(5000);
//   next();
// }
router.get('/showallitem/:_id', async(req, res) => {
        let total = 0;
        let b = await orderDetail.find({'product_id': req.body._id})
        for(let i=0;i<b.length;i++){
            total += b[i].item_quantity
        }
        if(total > 0) {
            return {"id": elem._id, total: total}
        } 
        res.json({data: 'test', id: req.body._id});
    // let a = await product.find({}).exec();
    // let t = [];
    // let arr2 = [];
    // let arr = a.map(async(elem, index) => {
    //     // let b = await orderDetail.find({'product_id': elem._id});
    //     let total = 0;
    //     let b = await orderDetail.find({'product_id': elem._id})
    //     for(let i=0;i<b.length;i++){
    //         total += b[i].item_quantity
    //     }
    //     if(total > 0) {
    //         return {"id": elem._id, total: total}
    //     } 
    // })
    // let c = 0;
    // arr.map((e,i) => {
    //     e.then((val, reject) => {
    //         arr2.push(val)
    //         c++
    //     });
    // })
    // setTimeout(() => {
    //     console.log(c);
    //     console.log(arr2);
    //     res.json({data: 'test', test: arr2});
    // }, 6000)

})


router.get('/table_product', async(req, res, next) => {
    let role = req.session.userlevel
    let filter = req.query.category_id !== undefined ? {'product_category' : req.query.category_id } : {};
    let listProduct = await product.find(filter).populate('product_category', itemCategory ).populate('product_image');
    let checkOrder = await orderDetail.find({})
    listProduct.role = role
    let newListProduct = listProduct.map((value, index) => {
        let check = checkOrder.find(({product_id}) => value._id.toString() == product_id.toString())
        if(check) {
            value.used = true
        } else {
            value.used = false
        }
        return value;
    })
    res.status(200).json({data:newListProduct});
})

router.get("/(:_id)?(/:role)?(/:used)?", async(req, res, next) => {
    var pathComplie = path.join(__dirname, '../../views/modal.pug');
    var title, btn, action, edtiById;
    var pCategory = await allItem();
    var findProduct = await product.findById(req.params._id).populate('product_image');
    var role = "";
    if(req.params._id) {
        title = 'แก้ไขวัสดุ/ครุภัณฑ์' ;
        btn = 'แก้ไข' ;
        action = 'edit' ;
        edtiById = req.params._id ;
        if(findProduct.product_image !== null) {
            // let readFile = await fs.readFileSync(findProduct.product_image.path, {encoding: 'base64'});
            findProduct.imageEncode = findProduct.product_image.path.replace('public\\', "../")
        }
        role = req.params.role;
    } else {
        title = 'เพิ่มวัสดุ/ครุภัณฑ์';
        btn = 'บันทึก';
        action = 'add';
        edtiById = '';
        role = req.session.userlevel
    }
    
    // Compile a function
    var html = pug.renderFile(pathComplie, {title:title, btnText:btn, 'editById': edtiById, 'productCategory': pCategory, 'classBtn': 'btn-add-product', 'action': action, 'typed': "product", productDetail: findProduct, userRole: role, used: req.params.used });
    res.status(200).send(html);
});


router.post("/(:action)?(/:_id)?", upload.single('fileUpload'), async(req, res, next) => {
    if(req.params.action === 'add') {
        req.body.product_onStock = req.body.product_quantity;
        if(req.body.product_code.length == 0){
            let autogen = (await autogencode.findOne({'_id': '5f71930d3636cf7446ed4179'})).toJSON();
            autogen.codeArray.map((e, i) => {
                if(e.type == 'gen_ProductCode') {
                    genCodeTxt = e.genCodeText + e.genSpacialChar + e.genCode
                }
            })
        }
        if(genCodeTxt.length > 0) {
            req.body.product_code = genCodeTxt;
        } 
        if(req.file) {
            let objFileSave = {_id: new ObjectId,...req.file};
            req.body.product_image = objFileSave._id;
            // objData.product_image = objFileSave._id
            var fSave = new fsfilesaves(objFileSave);
            fSave.save((err, data) => {
                if(err) throw err;
                console.log(data);
            })
        }
        var docCreate = new product(req.body);
        docCreate.save((err, data) => {
          if (err) console.log(err);
          res.status(200).json({data: data, action:'add'});
        });

        autogencode.findOne({}, (err, doc) => {
            if(err) {
                console.log(err);
                return false
            }
            let increseData =  parseInt(doc.codeArray[1].genCode) + 1;
            console.log(increseData)
            let codeText = doc.codeArray[1].genCode;
            let updateCode = codeText.slice(0, codeText.length - increseData.toString().length) + increseData.toString();
            doc.codeArray[1].genCode = updateCode
            doc.save((err, data) => {
                if(err) {
                    console.log(err);
                }
                // console.log(data);
            })
        })


    } else if(req.params.action === 'edit') {
        let objData = {...req.body}
        if(req.file) {
            let chkHaveImage = await product.findById(req.params._id).populate('fsfilesaves');
            if(chkHaveImage.product_image !== null) {
                let f = await fsfilesaves.findByIdAndRemove(chkHaveImage.product_image._id);
                try {
                    await fs.unlinkSync(f.path.toString());
                } catch (err) {
                    console.log(err);
                }
            }
            let objFileSave = {_id: new ObjectId,...req.file};
            objData.product_image = objFileSave._id
            var fSave = new fsfilesaves(objFileSave);
            fSave.save((err, data) => {
                if(err) throw err;
                console.log(data);
            })
        }
        // console.log(objData);
        product.findByIdAndUpdate(req.params._id, objData, (err, data) => {
            if(err) throw(err);
            res.status(200).json({data:data, action:'edit'});
        })
    } else if(req.params.action === 'delete') {
        product.findByIdAndRemove(req.params._id, (err, data) => {
            if(err) throw (err);
            res.status(200).send("success")
        });
    } else {
        res.status(200).send("HelloWorld")
    }
})
    



module.exports = router;
