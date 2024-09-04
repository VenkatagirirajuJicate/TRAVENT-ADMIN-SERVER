// config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://venkatagirirajuearth:oM9jGMM8yA0QN9HM@travent-1.use8ocf.mongodb.net/Travent?retryWrites=true&w=majority");
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
