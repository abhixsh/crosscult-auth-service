const express = require('express');
const router = express.Router();
const {
    registerAdmin,
    getAdmins,
    getAdminById,  // New import
    updateAdmin,
    deleteAdmin,
    verifyOTP,
    loginAdmin
} = require('../controllers/adminController');

// Register Admin
router.post('/register', registerAdmin);

// OTP Verification route
router.post('/verify-otp', verifyOTP);

// Get admin by ID
router.get('/:adminId', getAdminById); // New route for fetching admin by ID

// Other routes as before
router.get('/', getAdmins);
router.put('/:adminId', updateAdmin);
router.delete('/:adminId', deleteAdmin);

router.post('/login', loginAdmin);

module.exports = router;
