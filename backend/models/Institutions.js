const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Year Schema that holds sections for each year
const YearSchema = new Schema({
  year: { type: Number, required: true }, // Year number (e.g., 1st Year, 2nd Year, etc.)
  sections: { type: String, required: true }, // Sections as a comma-separated string (e.g., "A,B")
});

// Department Schema that holds years
const DepartmentSchema = new Schema({
  departmentName: { type: String, required: true }, // Name of the department (e.g., CSE, ECE)
  years: { type: [YearSchema], required: true }, // Array of years, each containing sections as strings
});

// Institute Schema that holds departments
const InstituteSchema = new Schema({
  instituteCode: { type: String, required: true }, // Unique code for each institute
  instituteName: { type: String, required: true }, // Name of the institute
  state: { type: String, required: true }, // State where the institute is located
  address: { type: String, required: true }, // Address of the institute
  principalName: { type: String, required: true }, // Principal's name
  principalEmail: { type: String, required: true }, // Principal's email address
  principalContactNumber: { type: String, required: true }, // Principal's contact number
  departments: { type: [DepartmentSchema], required: true }, // Array of departments
});

// Admin Details Schema
const AdminSchema = new Schema({
  adminName: { type: String, required: true }, // Admin's name
  email: { type: String, required: true }, // Admin's email address
  contactNumber: { type: String, required: true }, // Admin's contact number
  password: { type: String, required: true }, // Admin's password (Note: In a production environment, ensure password is hashed)
});

// Main Institutions Schema that holds all institutes
const InstitutionsSchema = new Schema({
  institutionId: { type: String, required: true }, // Unique ID for the institution
  institutionName: { type: String, required: true }, // Name of the parent institution
  state: { type: String, required: true }, // State where the institution is located
  founderName: { type: String, required: true }, // Founder's name
  founderEmail: { type: String, required: true }, // Founder's email address
  founderContactNumber: { type: String, required: true }, // Founder's contact number
  address: { type: String, required: true }, // Institution's address
  contact1: { type: String, required: true }, // Primary contact number
  contact2: { type: String }, // Secondary contact number (optional)
  emailDomain: { type: String, required: true }, // Institution's email domain (e.g., jkkn.ac.in)
  institutes: { type: [InstituteSchema], required: true }, // Array of institutes
  adminDetails: { type: AdminSchema, required: true }, // New field for admin details
  createdAt: { type: Date, default: Date.now }, // Date when the institution entry was created
});

module.exports = mongoose.model("Institutions", InstitutionsSchema);
