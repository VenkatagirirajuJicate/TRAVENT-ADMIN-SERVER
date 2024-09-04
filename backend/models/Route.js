  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const StopsSchema = new Schema({
    institutionId: { type: String, required: true }, // institutionId at the top level
    stopID: { type: String, required: true },
    stopName: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    districtName: { type: String, required: true },
    cityName: { type: String, required: true },
    boardingCountMorning: { type: Number, default: 0 },
    boardingCountEvening: { type: Number, default: 0 },
    boardTime: { type: String, required: true },
    dropTime: { type: String, required: true },
    stateName: { type: String, required: true },
  });

  const RouteSchema = new Schema({
    routeNumber: { type: String, required: true },
    routeName: { type: String, required: true },
    eta: { type: String, required: true },
    sittingCapacity: { type: Number, required: true },
    standingCapacity: { type: Number, required: true },
    vehicleRegistrationNumber: { type: String, required: true },
    mainDriver: { type: String, required: true },
    departureFromHalt: { type: String, required: true },
    collegeArrivalTime: { type: String, required: true },
    departureFromCollege: { type: String, required: true },
    dropTimeFromCollege: { type: String, required: true },
    stops: { type: [StopsSchema], default: null }, // Array of stops, initially null
    boardingCount: { type: Number, default: 0 },
    stoppingCount: { type: Number, default: 0 }
  });

  const RoutesSchema = new Schema({
    institutionId: { type: String, required: true }, // institutionId at the top level
    routes: [RouteSchema]
  });

  module.exports = mongoose.model('Routes', RoutesSchema);
