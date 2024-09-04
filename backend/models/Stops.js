const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StopSchema = new Schema({
    institutionId: { type: String, required: true }, // institutionId at the top level
    stopID: { type: String, required: true },
    stopName: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    districtName: { type: String, required: true },
    cityName: { type: String, required: true },
    stateName: { type: String, required: true },
})

module.exports = mongoose.model("Stops", StopSchema);
