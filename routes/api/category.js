var express = require("express");
var router = express.Router();
var itemCategory = require("../../models/itemCategorysModel");
var product = require("../../models/productsModel");

// router.get("/category", (req, res, next) => {
//   res.status(200).json({ test: "none" });
// });


const allItem = async(fields) => {
    let list = await itemCategory.find({}, fields);
    return list;
}

router.get('/table_category', async(req, res, next) => {
      itemCategory.find({}, '_id item_description item_status used', async(err, listCategory) => {
          for(let i = 0; i < listCategory.length; i++) {
              let join = await product.find({'product_category': listCategory[i]._id});
              if(join.length > 0) {
                  listCategory[i].used = 1
              } else {
                  listCategory[i].used = 0
              }
          }
          // res.render('ad-category', {title:'category', cateType: 'test', itemList: listCategory})
          // console.log(listCategory)
          res.status(200).json({data:listCategory});
      })
    // console.log(listCategory)
})

router.post("/category(/:item_id)?", async (req, res, next) => {
  // let countDoc = await itemCategory.count({})
  let checkName = await itemCategory.find({'item_description': req.body.item_description}).exec();
  console.log(checkName);
  if(checkName.length > 0) {
    res.status(200).json({'err':'manyItems', 'errDesc': req.body.item_description});
    return;
  }  else {
    console.log('else')
    // next();
  }
  if (req.params.item_id === undefined) {
    res.status(200).json({ test: req.params.item_id });
  } else if (req.params.item_id === "add") {
    
    var doc = new itemCategory(req.body);
    doc.save((err, data) => {
      if (err) console.log(err);
      // console.log(data);
      // res.redirect('/backendx/user/level');
      res.status(200).json({ data: "success" });
      return;
    });
  } else {
    itemCategory.find({ _id: req.params.item_id }, (err, data) => {
      if (err) console.log(err);
      console.log(data);
      res.status(200).json({ data: data });
    });
  }
});

router.post("/category/edit/:_id", async(req, res, next) => {
  let checkName = await itemCategory.find({'item_description': req.body.item_description, '_id': {$ne: req.params._id}}).exec();
  console.log(checkName);
  if(checkName.length > 0) {
    console.log('inn')
    res.status(200).json({'err':'manyItems', 'errDesc': req.body.item_description});
  }  else {
    console.log('else')
    // next();
    itemCategory.findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          item_description: req.body.item_description,
          item_status: req.body.item_status,
          revisedDate: Date.now()
        },
      },
      (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("fail");
        } else {
          res.status(200).send({data:"success"});
        }
      }
    );
  }

});


router.post("/category/delete/:_id", (req, res, next) => {
    console.log(req.params._id);
    itemCategory.findByIdAndRemove(req.params._id, (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).send('success');
        }
    })
});





module.exports = router;
