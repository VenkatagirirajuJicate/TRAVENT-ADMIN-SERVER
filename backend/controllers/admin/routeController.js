const Routes = require('../models/Routes'); // Import the Routes model

/**
 * Add a new route for an institution.
 * If routes exist for the institution, the new route is appended.
 * If no routes exist, a new document is created.
 */
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

        res.status(200).json({ routes: institutionRoutes.routes });
    } catch (error) {
        console.error("Error fetching routes:", error);
        res.status(500).json({ message: "Failed to fetch routes." });
    }
};
