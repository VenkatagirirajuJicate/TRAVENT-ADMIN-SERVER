// routes/registrationRoutes.js
const express = require("express");
const router = express.Router();
const Institution = require("../models/Institutions");
const Route = require("../models/Route");

// Fetch institutions with their routes
router.get("/registerform", async (req, res) => {
  console.log("func called")

  try {
    console.log("func called")
    const institutions = await Institution.find({});
    const routes = await Route.find({ institutionId: { $in: institutions.map(inst => inst.institutionId) } });
    
    // Map routes to their corresponding institutions
    const institutionsWithRoutes = institutions.map(institution => {
      const institutionRoutes = routes.find(route => route.institutionId === institution.institutionId);
      return {
        ...institution.toObject(),
        routes: institutionRoutes ? institutionRoutes.routes : []
      };
    });

    res.json(institutionsWithRoutes);
  } catch (error) {
    console.error("Error fetching institutions and routes:", error);
    res.status(500).json({ message: "Error fetching institutions and routes" });
  }
});

module.exports = router;
