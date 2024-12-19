const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_photo: { type: String, required: false },
    otp: { type: String, required: false },
    otpExpiry: { type: Date, required: false },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
