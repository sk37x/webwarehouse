const mongoose = require("mongoose");

var itemCategorySchema = mongoose.Schema({
    item_id : {type: Number},
    item_description : {type : String},
    item_status : {type : Number},
    createdDate : {type: Date, default: Date.now },
    creator: { type : Number, default: null },
    revisedDate : { type: Date, default: null  },
    revisor : { type: Number, default: null },
    used : { type : Number },
})
// itemStatus - (0 = ยกเลิก, 1 = ใช้งาน)
var itemCategory = mongoose.model('itemCategorys', itemCategorySchema)

module.exports = itemCategory;
