const mongoose = require('mongoose')

const connectDB = async () => {
    try {

        const connect = await mongoose.connect("mongodb+srv://DJ0212:devansh%400212@cluster0.djsnamb.mongodb.net/Assignment", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected : ${connect.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = connectDB;