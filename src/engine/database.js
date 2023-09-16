const mongoose = require('mongoose');

const connect = async function () {
    try {
        mongoose.set("strictQuery", false);
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected to ${connection.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = connect;