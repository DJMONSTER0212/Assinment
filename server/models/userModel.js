const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userId : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique: true
    },
    contact:{
        type: String,
    },
    imgUrl: {
        type: String,
    }
},{
    timestamps: true
})

const User = mongoose.model("User",userSchema);
module.exports = User;