const mongoose = require("mongoose");

const remarkSchema = mongoose.Schema({
    creatorId : {
        type: String,
        required : true
    },
    breakpoints:{
        type:String,
        default : "PC"
    },
    title :{
        type:String,
        required : true
    },
    top:{
        type : String,
    },
    right:{
        type: String,
    },
    left:{
        type : String,
    },
    canvasId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Canvas",
        required : true
    }
}, {
    timestamps: true
});

const Remark = mongoose.model("Remark",remarkSchema);
module.exports = Remark;