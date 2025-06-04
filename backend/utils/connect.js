import mongoose from "mongoose";

const ConnectToDB = (callback) => {
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@nextbuycluster.egepnnu.mongodb.net/nextbuy?retryWrites=true&w=majority&appName=nextbuycluster`);

    const connection = mongoose.connection;

    connection.once("connected", () => {
        console.log('Connected to Database successfully')
        callback();
    })

    connection.on("error", (err) => {
        console.log("Error occurred while connecting to DB")
    })
};

export default ConnectToDB;
