// appAdminCreation.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const connectDB = require("./db"); // Adjust the path according to your project structure
const AppAdmin = require("../models/AppAdmin"); // Adjust the path according to your project structure

dotenv.config(); // Load environment variables

const createAdmin = async () => {
  try {
    // Define admin credentials
    const appAdminData = {
      email: "appAdmin",
      password: "appAdmin", // Plaintext password
    };

    // Check if admin already exists
    const existingAdmin = await AppAdmin.findOne({ email: appAdminData.email });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(1);
    }

    // Create and save admin user in the database
    const newAdmin = new AppAdmin(appAdminData);
    await newAdmin.save();

    console.log("Admin user created successfully");
  } catch (err) {
    console.error("Error creating admin user:", err.message);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Connect to the database and create admin user
connectDB()
  .then(createAdmin)
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
