const mongoose  = require("mongoose");

const connectdb = async() =>{
    const mongodbUrL = process.env.MONGO_URL;

    if (!mongodbUrL) {
        console.error("MongoDB URI is not defined in the environment variables");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongodbUrL);
        
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }

}

module.exports = connectdb;