// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['student', 'staff', 'admin'],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['passenger', 'admin', 'super admin'],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'rejected'],
    default: 'pending',
  },
  educationalDetails: {
    student: {
      rollNo: String,
      registerNo: String,
      instituteName: String,
      department: String,
      year: Number,
      section: String,
    },
    staff: {
      staffId: String,
      instituteName: String,
      department: String,
      designation: String,
    },
  },
  routeDetails: {
    district: String,
    city: String,
    stoppingName: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


// Check if the model is already defined to prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
