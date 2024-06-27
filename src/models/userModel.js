const { mongoose, Schema } = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    photoUrl: {
        type: String,
    },
    creatAt: {
        type: Date,
        default: Date.now()
    },
    uploadAt: {
        type: Date,
        default: Date.now()
    },
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;