const User = require("../models/userModel");

const test = async (req, res) => {
    console.log("Hello")
    res.send("done")
}

const createUser = async (req, res) => {
    // console.log(req.body);
    const { userId, name, email, contact, imgUrl } = req.body;
    // console.log(userId, name, email, contact, imgUrl)
    if (!userId || !name || !email) {
        res.status(400);
        throw new Error("Please enter all the Fields");
    }
    try {
        const userExists = await User.findOne({ email, userId });
        if (userExists) {
            res.status(400).send({ message:"user already exists"});
            // throw new Error("user already exists");
        }
        const user = await User.create({
            userId,
            name,
            email,
            contact,
            imgUrl,
        });
        if (user) {
            res.status(201).json({
                name: user.name,
                email: user.email,
            })
        }
    } catch (error) {
        // res.status(error);
        res.status(500).json({message: "Internal Server Error"})
        // throw new Error(error);
    }
}


module.exports = { test, createUser }