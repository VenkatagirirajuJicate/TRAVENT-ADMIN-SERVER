// const User = require('../models/User');
const Student = require('../models/Student');


exports.updateStudentDetails = async (req, res) => {
    try {
        const { start_date, StudentData } = req.body;

        let student = await Student.findOne();

        if (student) {
            // Backup existing RegularPlans before replacing
            if (student.StudentDetails) {
                student.BackupStudentDetails = student.StudentDetails;
                student.BackupStudentDetails.plan_status = 'Backup Plan';
            }

            // Replace the existing plan with the new plan in StudentDetails
            student.StudentDetails = {
                plan_status: 'Active Plan',
                start_date,
                studentData:StudentData,
            };
        } else {
            // If no bus document found, create a new one
            student = new Student({
                StudentDetails: {
                    plan_status: 'Active Plan',
                    start_date,
                    studentData:StudentData,
                }
            });
        }

        // Save the updated bus document
        await student.save();

        res.status(200).json({ message: 'Student data updated successfully' });
    } catch (error) {
        console.error('Error updating student data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.revertStudentDetails = async (req, res) => {
    try {
        // Find any bus document
        let student = await Student.findOne();

        if (student && student.BackupStudentDetails) {
            // Revert to the backup regular plan
            student.StudentDetails = student.BackupStudentDetails;
            student.StudentDetails.plan_status = 'Active Plan';
            // Clear the backup regular plan after reverting
            student.BackupStudentDetails = null;
            // Save the updated bus document
            await student.save();
            res.status(200).json({ message: 'Regular plan reverted successfully' });
        } else {
            res.status(404).json({ message: 'No backup regular plans available' });
        }
    } catch (error) {
        console.error('Error reverting regular plan:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.fetchStudentDetails = async (req, res) => {
    try {
        const student = await Student.findOne();

        if (!student || !student.StudentDetails) {
            return res.status(404).json({ message: 'No active bus data available' });
        }

        // Find the active regular plan
        const studentData = student.StudentDetails.studentData;


        if (!studentData) {
            return res.status(404).json({ message: 'No active regular plan available' });
        }

        res.status(200).json({ studentData });
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//not needed
// exports.getStudents = async (req, res) => {
//     const { email } = req.query;
//     try {
//         const student = await User.findOne({ email });
//         if (!student) {
//             return res.status(404).json({ message: 'Student not found' });
//         }
//         res.status(200).json(student);
//     } catch (error) {
//         console.error('Error fetching student data:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// //not needed
// exports.fetchStudentData = async (req, res) => {
//     const { registerNumber } = req.query;
//     try {
//         const student = await User.findOne({ registerNumber });
//         if (!student) {
//             return res.status(404).json({ message: 'Student not found' });
//         }
//         res.status(200).json(student);
//     } catch (error) {
//         console.error('Error fetching student data:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// //not needed
// exports.getStudentsData = async (req, res) => {
//     try {
//         const { role, department, instituteName } = req.query;
//         const filter = {
//             role: role,
//             department: department,
//             institute_name: instituteName,
//         };
//         const students = await User.find(filter);
//         res.status(200).json(students);
//     } catch (error) {
//         console.error('Error fetching students data:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

