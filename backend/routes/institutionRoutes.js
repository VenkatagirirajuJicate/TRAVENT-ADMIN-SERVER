// routes/institutions.js

const express = require('express');
const router = express.Router();
const institutionsController = require('../controllers/institutionsController');

// Add a new institution
router.post('/add', institutionsController.addInstitution);

// Get all institutions
router.get('/', institutionsController.getAllInstitutions);

// Get an institution by ID
router.get('/:id', institutionsController.getInstitutionById);

// Update an institution
router.put('/:id', institutionsController.updateInstitution);

// Delete an institution
router.delete('/:id', institutionsController.deleteInstitution);

module.exports = router;
