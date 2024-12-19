const express = require('express');
const router = express.Router();
const { registerAdmin, getAdmins, updateAdmin, deleteAdmin, verifyOTP, loginAdmin } = require('../controllers/adminController');

// Register Admin
router.post('/register', registerAdmin);

// OTP Verification route
router.post('/verify-otp', verifyOTP); // Add this route for OTP validation

// Other routes as before
router.get('/', getAdmins);
router.put('/:adminId', updateAdmin);
router.delete('/:adminId', deleteAdmin);
router.post('/login', loginAdmin);

module.exports = router;
