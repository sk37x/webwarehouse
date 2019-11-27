var mongoose = require('mongoose');

var bookFrom = mongoose.Schema({
    bookfrom_category: {type: String}
});

var bookfromClient = mongoose.model('bookfroms', bookFrom);

module.exports = bookfromClient;