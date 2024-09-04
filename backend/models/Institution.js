const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for Stoppings
const StoppingSchema = new Schema({
  stopID: { type: String, required: true },
  stopName: { type: String, required: true },
  departureFromHalt: { type: String, required: true },
  collegeArrivalTime: { type: String, required: true },
  departureFromCollege: { type: String, required: true },
  dropTimeFromCollege: { type: String, required: true },
  routes: [{ 
    routeNumber: { type: String, required: true },
    routeName: { type: String, required: true },
  }]
});

// Define the schema for Routes
const RouteSchema = new Schema({
  routeNumber: { type: String, required: true },
  routeName: { type: String, required: true },
  sittingCapacity: { type: Number, required: true },
  standingCapacity: { type: Number, required: true },
  driverId: { type: String, required: true },
});

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

// Define the schema for Sections
const SectionSchema = new Schema({
  sectionName: { type: String, required: true },
});

// Define the schema for Years
const YearSchema = new Schema({
  yearNumber: { type: Number, required: true },
  sections: [SectionSchema],
});

// Define the schema for Departments
const DepartmentSchema = new Schema({
  departmentName: { type: String, required: true },
  years: [YearSchema],
});

// Define the schema for Institution
const InstitutionSchema = new Schema({
  institutionId: { type: String, required: true, unique: true },
  institutionName: { type: String, required: true },
  institutionType: { type: String, required: true }, // e.g., 'Engineering', 'Arts', 'Science'
  departments: [DepartmentSchema],
  states: [StateSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Institution', InstitutionSchema);
