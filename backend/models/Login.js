// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String },
  institute: { type: String, required: true },
  role: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
