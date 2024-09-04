const Routes = require('../models/Route'); // Import the Routes model
const mongoose = require('mongoose');


exports.addStop = async (req, res) => {
  const {
    institutionId,
    routeNumber,
    stopName,
    latitude,
    longitude,
    districtName,
    cityName,
    stateName,
    boardTime,
    dropTime,
    boardingCountMorning = 0,
    boardingCountEvening = 0,
  } = req.body;
console.log(req.body)
  try {
    // Find the institution by ID
    const institutionRoutes = await Routes.findOne({ institutionId });

    if (!institutionRoutes) {
      return res.status(404).json({ success: false, message: "Institution not found." });
    }

    // Find the specific route within the routes array
    const route = institutionRoutes.routes.find(r => r.routeNumber === routeNumber);

    if (!route) {
      return res.status(404).json({ success: false, message: "Route not found." });
    }

    // Ensure the stops array is initialized
    if (!route.stops) {
      route.stops = [];
    }

    // Check if the stop already exists within the institution's routes
    let stop = route.stops.find(s => 
      s.stopName === stopName &&
      s.districtName === districtName &&
      s.cityName === cityName &&
      s.stateName === stateName
    );

    if (!stop) {
      // Generate a new stop ID if the stop does not exist
      stop = {
        stopID: new mongoose.Types.ObjectId().toString(),
        stopName,
        latitude,
        longitude,
        districtName,
        cityName,
        stateName,
        boardTime,
        dropTime,
        boardingCountMorning,
        boardingCountEvening,
        institutionId,
      };
      route.stops.push(stop); // Add the new stop to the route
    } else {
      // Update the existing stop's details if it already exists
      stop.latitude = latitude;
      stop.longitude = longitude;
      stop.boardTime = boardTime;
      stop.dropTime = dropTime;
      stop.boardingCountMorning = boardingCountMorning;
      stop.boardingCountEvening = boardingCountEvening;
    }

    // Update the stoppingCount and boardingCount for the route
    route.stoppingCount = route.stops.length;
    route.boardingCount = route.stops.reduce(
      (total, s) => total + s.boardingCountMorning + s.boardingCountEvening,
      0
    );

    // Save the updated routes document
    await institutionRoutes.save();

    res.status(200).json({ success: true, message: "Stop added/updated successfully." });

  } catch (error) {
    console.error("Error adding/updating stop:", error);
    res.status(500).json({ success: false, message: "Failed to add/update stop." });
  }
};


exports.addRoute = async (req, res) => {
    console.log("Received request to add route.");
    console.log("Request body:", req.body);

    const {
        institutionId, // Assuming institutionId is passed in the request body
        routeNumber,
        routeName,
        boardTime,
        eta,
        sittingCapacity,
        standingCapacity,
        vehicleRegistrationNumber,
        mainDriver,
        departureFromHalt,
        collegeArrivalTime,
        departureFromCollege,
        dropTimeFromCollege
    } = req.body;

    try {
        // Find if there are routes for the given institutionId
        let institutionRoutes = await Routes.findOne({ institutionId });

        if (institutionRoutes) {
            // Check if the route already exists
            const existingRoute = institutionRoutes.routes.find(
                (r) => r.routeNumber === routeNumber || r.routeName === routeName
            );

            if (existingRoute) {
                console.log("Route already exists.");
                return res.status(400).json({ message: "Route already exists." });
            }

            // Add the new route to the existing routes array
            institutionRoutes.routes.push({
                routeNumber,
                routeName,
                boardTime,
                eta,
                sittingCapacity,
                standingCapacity,
                vehicleRegistrationNumber,
                mainDriver,
                departureFromHalt,
                collegeArrivalTime,
                departureFromCollege,
                dropTimeFromCollege,
                stops: null, // Initial stops are null
                boardingCount: 0,
                stoppingCount: 0
            });

            // Save the updated routes document
            await institutionRoutes.save();

            console.log("Route added to existing institution.");
            return res.status(200).json({ success: true, message: "Route added to existing institution." });

        } else {
            // If no routes exist for this institution, create a new document
            institutionRoutes = new Routes({
                institutionId,
                routes: [{
                    routeNumber,
                    routeName,
                    boardTime,
                    eta,
                    sittingCapacity,
                    standingCapacity,
                    vehicleRegistrationNumber,
                    mainDriver,
                    departureFromHalt,
                    collegeArrivalTime,
                    departureFromCollege,
                    dropTimeFromCollege,
                    stops: null, // Initial stops are null
                    boardingCount: 0,
                    stoppingCount: 0
                }]
            });

            // Save the new routes document
            await institutionRoutes.save();

            console.log("First route added for this institution.");
            return res.status(200).json({ success: true, message: "First route added for this institution." });
        }
    } catch (error) {
        console.error("Error adding route:", error);
        return res.status(500).json({ success: false, message: "Failed to add route." });
    }
};

/**
 * Get all routes for a given institution by institutionId.
 */
exports.getRoutesByInstitutionId = async (req, res) => {
    const { institutionId } = req.params; // Get institutionId from request params
console.log(institutionId)
    try {
        // Find the routes by institutionId
        const institutionRoutes = await Routes.findOne({ institutionId });

        if (!institutionRoutes) {
            return res.status(404).json({ message: "No routes found for this institution." });
        }

        res.status(200).json({ institutionRoutes: institutionRoutes });
    } catch (error) {
        console.error("Error fetching routes:", error);
        res.status(500).json({ message: "Failed to fetch routes." });
    }
};
