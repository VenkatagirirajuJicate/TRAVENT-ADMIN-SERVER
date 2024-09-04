// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const PendingUser = require('../models/PendingUser');
const Passenger = require('../models/Passenger');
const RejectedPassenger = require('../models/RejectedPassenger'); // Import RejectedPassenger model
const bcrypt = require('bcrypt');

router.get('/pending-users', async (req, res) => {
  try {
    const pendingUsers = await PendingUser.find();
    res.status(200).json(pendingUsers);
  } catch (err) {
    console.error("Error fetching pending users:", err.message);
    res.status(500).send("Server error");
  }
});

router.post('/approve-user', async (req, res) => {
  const { userId, action } = req.body;

  try {
    const pendingUser = await PendingUser.findById(userId);
    if (!pendingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (action === 'approve') {
      // Prepare the data for the Passenger model
      const newPassenger = new Passenger({
        passengerId: pendingUser.passengerId,
        type: pendingUser.type,
        basicDetails: pendingUser.basicDetails,
        locationDetails: pendingUser.locationDetails,
        studentDetails: pendingUser.type === 'student' ? pendingUser.studentDetails : undefined,
        staffDetails: pendingUser.type === 'staff' ? pendingUser.staffDetails : undefined,
        credentials: {
          username: pendingUser.basicDetails.email,
          passwordHash: await bcrypt.hash('defaultPassword', 10) // Set a default password or use a generated one
        },
        status: 'active',
      });

      // Save the approved user to the database
      await newPassenger.save();
      // Remove the user from the PendingUser collection
      await PendingUser.findByIdAndDelete(userId);
      res.status(200).json({ message: 'User approved successfully' });
    } else if (action === 'reject') {
      // Move user details to the RejectedPassenger collection
      const rejectedPassenger = new RejectedPassenger({
        passengerId: pendingUser.passengerId,
        type: pendingUser.type,
        basicDetails: pendingUser.basicDetails,
        locationDetails: pendingUser.locationDetails,
        studentDetails: pendingUser.studentDetails,
        staffDetails: pendingUser.staffDetails,
        createdAt: pendingUser.createdAt,
        updatedAt: pendingUser.updatedAt,
      });

      // Save the rejected user to the RejectedPassenger collection
      await rejectedPassenger.save();
      // Remove the user from the PendingUser collection
      await PendingUser.findByIdAndDelete(userId);

      res.status(200).json({ message: 'User rejected and moved to RejectedPassenger collection' });
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
