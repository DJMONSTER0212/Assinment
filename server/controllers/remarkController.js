const Remark = require("../models/remarkModel");

const createRemark = async (req, res) => {
    const { title, creatorId, top, breakpoints, right, canvasId, left } = req.body;
    console.log("hello")
    try {
        const remark = await Remark.create({
            title,
            creatorId,
            breakpoints,
            top,
            right,
            canvasId,
            left
        })
        res.send(remark);
    } catch (error) {
        res.status(500)
        throw new Error("Internal server error")
    }
    // res.json({ title })
}

const getAllRemarks = async (req,res)=>{
    try {
        // console.log(req.params.canvasId)
        const remarks = await Remark.find({ "canvasId" :{
            _id : req.params.canvasId
        }});
        // console.log(remarks); 
        res.send(remarks) 
    } catch (error) {
        
    }
}

module.exports = { createRemark, getAllRemarks }