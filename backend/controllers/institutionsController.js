// controllers/institutionController.js
const Institutions = require("../models/Institutions");
const bcrypt = require("bcryptjs"); // Import bcrypt

// Helper function to generate the next institution ID
const generateInstitutionId = async () => {
  // Find the institution with the highest numeric value in the institutionId
  const lastInstitution = await Institutions.findOne({
    institutionId: { $regex: /^trav-/ },
  })
    .sort({ institutionId: -1 })
    .exec();

  if (!lastInstitution) {
    // If no institution exists, start with "trav-1"
    return "trav-1";
  }

  // Extract the numeric part from the institutionId
  const lastIdNumber = parseInt(
    lastInstitution.institutionId.split("-")[1],
    1000
  );

  // Generate the next ID by incrementing the numeric part
  const newIdNumber = lastIdNumber + 1;

  return `trav-${newIdNumber}`;
};

// Add a new institution
exports.addInstitution = async (req, res) => {
  try {
    // Generate the institution ID
    const institutionId = await generateInstitutionId();

    // Hash the admin password
    const hashedPassword = await bcrypt.hash(
      req.body.adminDetails.password,
      10
    );

    // Add the institutionId and hashed password to the institution data
    const institutionData = {
      ...req.body,
      institutionId,
      adminDetails: {
        ...req.body.adminDetails,
        password: hashedPassword, // Store the hashed password
      },
    };

    const newInstitution = new Institutions(institutionData);
    await newInstitution.save();
    res.status(201).json({
      message: "Institution added successfully",
      data: newInstitution,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all institutions
exports.getAllInstitutions = async (req, res) => {
  try {
    const institutions = await Institutions.find();
    res.status(200).json(institutions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an institution by ID
exports.getInstitutionById = async (req, res) => {
  try {
    const institution = await Institutions.findById(req.params.id);
    if (!institution) {
      return res.status(404).json({ message: "Institution not found" });
    }
    res.status(200).json(institution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an institution
exports.updateInstitution = async (req, res) => {
  try {
    const institutionId = req.params.id;
    const updatedInstitution = await Institutions.findByIdAndUpdate(
      institutionId,
      req.body,
      { new: true }
    );
    if (!updatedInstitution) {
      return res.status(404).json({ message: "Institution not found" });
    }
    res.status(200).json({
      message: "Institution updated successfully",
      data: updatedInstitution,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an institution
exports.deleteInstitution = async (req, res) => {
  try {
    const institutionId = req.params.id;
    const deletedInstitution = await Institutions.findByIdAndDelete(
      institutionId
    );
    if (!deletedInstitution) {
      return res.status(404).json({ message: "Institution not found" });
    }
    res.status(200).json({ message: "Institution deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
