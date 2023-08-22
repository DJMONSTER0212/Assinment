const mongoose = require("mongoose");

const canvasSchema = mongoose.Schema({
    creatorId : {
        type: String,
        required : true,
    },
    title:{
        type: String,
        required : true,
    },
    link:{
        type: String,
        required : true,
    },
    teamMember: [{ type: String}],
}, {
    timestamps: true
})

const Canvas = mongoose.model("Canvas",canvasSchema);
module.exports = Canvas;