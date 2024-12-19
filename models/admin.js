const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String, required: false }, // Add OTP field
    otpExpiry: { type: Date, required: false }, // Add OTP expiry time field
});

// Create model from schema
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
