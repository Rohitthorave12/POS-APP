const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean
    }
}, { timestamps: true });

const Users = mongoose.model('users', userSchema);
module.exports = Users;
