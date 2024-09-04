const express = require('express');
const router = express.Router();
const routeController = require('../controllers/busController'); // Adjust the path as necessary

// Route to add a new route
router.post('/add-route', routeController.addRoute);
router.get('/view-routes/:institutionId', routeController.getRoutesByInstitutionId);
router.post('/add-stop', routeController.addStop);
module.exports = router;
