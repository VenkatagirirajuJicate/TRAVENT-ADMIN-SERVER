// models/Vehicle.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    busId: { type: String, required: true, unique: true },
    registerNumber: { type: String, required: true, unique: true },
    totalSeats: { type: Number, required: true },
    routeNumber: { type: String, required: true }, // Foreign key reference to Route
    busModel: { type: String, required: true },
    maintenanceSchedule: { type: Date },
    lastServicedDate: { type: Date }
});

module.exports = mongoose.model('Vehicle',vehicleSchema);