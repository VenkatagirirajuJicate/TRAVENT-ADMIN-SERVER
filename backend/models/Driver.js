// models/Driver.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    driverId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    mobileNo: { type: String, required: true },
    address: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    aadharNumber: { type: String, required: true, unique: true },
    experienceInYears: { type: Number, required: true },
    referredBy: { type: String }, // Optional
    attendance: [{ type: Date }], // Array of attendance dates
    assignedRoute: { type: String }, // Foreign key reference to Route
    joinedDate: { type: Date, default: Date.now },
    relievedDate: { type: Date }, // Optional
    routeHistory: [{ type: String }], // Array of Route IDs
    instituteName: { type: String } // Optional
});

module.exports = mongoose.model('Driver',driverSchema);