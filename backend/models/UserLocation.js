// models/BusRoute.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const UserLocationSchema = new Schema({
//   district: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   stoppingName: {
//     type: String,
//     required: true,
//   },
//   routeNumber: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// Define the schema for Cities
const CitySchema = new Schema({
  cityName: { type: String, required: true },
  stoppings: [StoppingSchema],
  routes: [RouteSchema],
});

// Define the schema for Districts
const DistrictSchema = new Schema({
  districtName: { type: String, required: true },
  cities: [CitySchema],
});

// Define the schema for States
const StateSchema = new Schema({
  stateName: { type: String, required: true },
  districts: [DistrictSchema],
});

module.exports = mongoose.model("UserLocation", UserLocationSchema);
