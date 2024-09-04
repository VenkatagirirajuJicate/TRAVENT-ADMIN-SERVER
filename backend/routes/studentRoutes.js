const express = require('express');
const router = express.Router();
const {  updateStudentDetails, revertStudentDetails, fetchStudentDetails } = require('../controllers/studentController');

// router.get('/students', getStudents);
// router.get('/fetch_student_data', fetchStudentData);
// router.get('/students_data', getStudentsData);
router.post('/update_student_details', updateStudentDetails);
router.post('/revert_student_details', revertStudentDetails);
router.get('/fetch_student_details', fetchStudentDetails);

module.exports = router;
