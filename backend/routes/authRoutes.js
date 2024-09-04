const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Institutions = require("../models/Institutions"); // Assuming Admin is the model for admin users
const AppAdmin = require("../models/AppAdmin");
// const Student = require("../models/Student");
// const Staff = require("../models/Staff");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt with email:", email);

    const userCollections = [
      { model: AppAdmin, role: "appadmin" },
      { model: Institutions, role: "admin" },
    ];

    let user = null;
    let role = null;
    let institutionDetails = null; // Initialize institution details

    for (let i = 0; i < userCollections.length; i++) {
      const { model, role: userRole } = userCollections[i];
      console.log(`Checking in model: ${userRole}`);

      if (userRole === "admin") {
        const institution = await model.findOne({
          "adminDetails.email": email,
        });
        console.log("Institution found:", institution);
        if (institution) {
          user = institution.adminDetails;
          role = userRole;
          institutionDetails = institution; // Store the institution details
          console.log("Admin user found:", user);
          break;
        }
      } else {
        user = await model.findOne({ email });
        console.log("AppAdmin user found:", user);
        if (user) {
          role = userRole;
          break;
        }
      }
    }

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Comparing password...");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match for user:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login successful, sending token and institution details...");
    res.json({
      message: "Login successful",
      token,
      institutionDetails, // Send institution details in the response
    });
  } catch (err) {
    console.error("Server error occurred:", err);
    res.status(500).send("Server error");
  }
});


router.post("/register", async (req, res) => {
  console.log(req.body);

  try {
    const {
      basicDetails,
      studentDetails,
      staffDetails,
      locationDetails,
      type,
    } = req.body;

    // Ensure basicDetails and basicDetails.email are provided and not null or empty
    if (!basicDetails || !basicDetails.email) {
      return res.status(400).json({
        message: "Email is required.",
        statusCode: 400,
        success: false,
      });
    }
 
    if (basicDetails.email.trim() === "") {
      return res.status(400).json({
        message: "Email cannot be empty.",
        statusCode: 400,
        success: false,
      });
    }

    // Check if the email already exists in the PendingUser collection
    const existingUser = await PendingUser.findOne({
      "basicDetails.email": basicDetails.email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered.",
        statusCode: 400,
        success: false,
      });
    }

    // Create a new PendingUser instance
    const pendingUser = new PendingUser({
      type,
      basicDetails,
      locationDetails,
      studentDetails: type === "student" ? studentDetails : undefined,
      staffDetails: type === "staff" ? staffDetails : undefined,
    });

    // Save the pending user to the database
    await pendingUser.save();

    return res.status(201).json({
      message: "User registered successfully. Awaiting approval.",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    return res.status(500).json({
      message: "Server error. Please try again later.",
      statusCode: 500,
      success: false,
    });
  }
});

module.exports = router;
