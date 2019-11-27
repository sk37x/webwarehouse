var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    _id : {
        type: Schema.Types.ObjectId  
    },
    email: {
        type: String,
        trim: true,
        require: true,
        // unique: true,
        lowercase: true
    },
    username: {
        type: String,
        require: true,
        // unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    passwordConf: {
        type: String,
        require: true
    },

    
});

// userSchema.virtual('level', {
//     ref: 'Userlevel',
//     localField: 'userlevel',
//     foreignField: '_id',

// })


// Authenticate input เป็นฟังก์ชั่นสำหรับการตรวจสอบข้อมู
userSchema.statics.authenticate = function (username, password, callback) {
    Users.findOne({ username: username })
        .exec((err, user) => {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}


// userSchema.statuc.authorization = function(token, secretkey, callback){

// }


// Hash a password before save
userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;

        next();
    })
})

var Users = mongoose.model('Users', userSchema);



// Users.findOne({ username: 'adm1nx-' }).populate('userlevel').populate('userposition').exec((err, users) => {
//     console.log(users);
// })


module.exports = Users;