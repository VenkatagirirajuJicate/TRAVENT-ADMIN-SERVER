// const User = require('../models/User');
const Bus = require('../models/Bus');

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Bus.findOne({ name: email, password: password });
        if (!admin) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error authenticating admin:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// exports.login = async (req, res) => {
//     const { registerNumber, DOB } = req.body;
//     try {
//         const student = await User.findOne({ registerNumber, DOB });
//         if (!student) {
//             return res.status(401).json({ message: 'Authentication failed' });
//         }
//         res.status(200).json({ success: true, message: 'Login successful' });
//     } catch (error) {
//         console.error('Error authenticating student:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

