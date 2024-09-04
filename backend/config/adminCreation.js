// adminCreation.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const connectDB = require('./db'); // Adjust the path according to your project structure
const Admin = require('../models/Admin'); // Adjust the path according to your project structure

dotenv.config(); // Load environment variables

console.log('MONGO_URI:', process.env.MONGO_URI);

const createAdmin = async () => {
    try {
        // Define admin credentials
        const adminData = {
            adminId: 'admin123', // A unique ID for the admin
            username: 'Admin',
            email: 'suryapraba.jicate@jkkn.ac.in',
            roles: ['admin'], // Array of roles
            password: 'adminpassword@123', // Plaintext password
        };

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        adminData.passwordHash = await bcrypt.hash(adminData.password, salt);
        delete adminData.password; // Remove the plaintext password

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(1);
        }

        // Create and save admin user in the database
        const newAdmin = new Admin(adminData);
        await newAdmin.save();

        console.log('Admin user created successfully');
    } catch (err) {
        console.error('Error creating admin user:', err.message);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};

// Connect to the database and create admin user
connectDB().then(createAdmin);
