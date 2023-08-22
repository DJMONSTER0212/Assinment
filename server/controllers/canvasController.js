const Canvas = require("../models/canvasModel");

const createCanvas = async (req, res) => {
    const { creatorId, title, link, teamMember } = req.body;
    // console.log(creatorId, title, link, teamMember)
    if (!creatorId || !title || !link) {
        res.status(400);
        throw new Error("Please enter all the Fields");
    }
    try {
        const canvas = await Canvas.create({
            creatorId,
            title,
            link,
            teamMember
        });
        if (canvas) {
            res.send(canvas._id)
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "SomeThing went wrong!" })
    }
    // res.json({ creatorId, title, link, teamMember });
}

const getCanvas = async (req, res) => {

    try {
        const canvas = await Canvas.findById(req.params.canvasId);
        // canvas.json();
        res.send(canvas);
    } catch (error) {
        console.log(error);
    }

}

const getAllCanvas = async (req, res) => {
    console.log("hello")
    try {
        // console.log(req.params.userId)
        const canvases = await Canvas.find({ creatorId: req.params.userId })
        // console.log(canvases)
        res.send(canvases);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createCanvas, getCanvas, getAllCanvas };