// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
require("dotenv").config();
const admin = require("firebase-admin");

// Initialize express app
const app = express();

// Load environment variables from .env file
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Initialize Firebase Admin SDK for any Google-related services
const serviceAccount = require("./firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware setup
// Configure CORS with multiple allowed origins
// CORS setup with environment variables
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Import and use routes
const authRoutes = require("./routes/authRoutes");
const institutionRoutes = require("./routes/institutionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const busRoutes = require("./routes/busRoutes");
const institutions = require("./routes/institutionRoutes");
const registrationForm = require("./routes/registrationRoutes");
// Define routes
app.use("/api/auth", authRoutes);
app.use("/api", institutionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/institutions", institutions);
app.use("/api/register", registrationForm); 


// Root endpoint
app.get("/", (req, res) => {
  res.send(
    "<html><body><h1>Transport Management System API</h1></body></html>"
  );
});

// Google Authentication Endpoint (if applicable)
app.post("/api/auth/google", async (req, res) => {
  const { token, institute, role } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;

    if (!email.endsWith("@jkkn.ac.in")) {
      return res
        .status(400)
        .json({ error: "Only @jkkn.ac.in emails are allowed" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        googleId: uid,
        email,
        name,
        picture,
        institute,
        role,
      });
      await user.save();
    } else {
      let updated = false;

      if (user.googleId !== uid) {
        user.googleId = uid;
        updated = true;
      }
      if (user.name !== name) {
        user.name = name;
        updated = true;
      }
      if (user.picture !== picture) {
        user.picture = picture;
        updated = true;
      }
      if (user.institute !== institute) {
        user.institute = institute;
        updated = true;
      }
      if (user.role !== role) {
        user.role = role;
        updated = true;
      }

      if (updated) {
        await user.save();
      }
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(400).json({ error: "Invalid token" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
