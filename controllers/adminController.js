require('dotenv').config();
const express = require('express');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendOTPEmail = require('../utils/sendEmail');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Register Admin
exports.registerAdmin = async (req, res) => {
    const { name, email, password, profile_photo } = req.body;

    try {
        console.log('Received admin registration data:', { name, email, password, profile_photo });

        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Generate OTP (6 digit random number)
        const otp = crypto.randomInt(100000, 999999).toString();
        console.log('Generated OTP:', otp);

        // Store OTP in the admin record, along with OTP expiry time (valid for 10 minutes)
        const otpExpiry = Date.now() + 10 * 60 * 1000;  // OTP valid for 10 minutes
        const admin = new Admin({
            name,
            email,
            password,
            profile_photo,
            otp,
            otpExpiry,
        });

        // Save admin details along with OTP to the database
        await admin.save();

        // Create the transporter using environment variables
        const transporter = nodemailer.createTransport({
            service: 'gmail',  // You can use 'gmail' or any other provider.
            auth: {
                user: process.env.EMAIL_USER,  // From .env
                pass: process.env.EMAIL_PASS,  // From .env
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,  // From .env
            to: email,
            subject: 'Admin Registration OTP',
            text: `Your OTP code for registering as an admin is: ${otp}`,
        };

        // Send the OTP email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending OTP email:', err);
                return res.status(500).json({ message: 'Failed to send OTP email' });
            } else {
                console.log('OTP email sent:', info.response);
                return res.status(200).json({ message: 'OTP sent to email, please verify it' });
            }
        });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error during admin registration', error: error.message });
    }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        console.log('Verifying OTP with the following details:', { email, otp });

        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log(`Admin with email ${email} not found.`);
            return res.status(404).json({ message: 'Admin not found' });
        }

        console.log(`Stored OTP: ${admin.otp}, Provided OTP: ${otp}`);

        // Verify OTP
        if (admin.otp !== otp) {
            console.log('OTP does not match.');
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Check if OTP has expired
        const currentTime = Date.now();
        if (currentTime > admin.otpExpiry + 60000) {  // 1-minute margin
            console.log('OTP has expired.');
            return res.status(400).json({ message: 'OTP expired' });
        }

        // OTP is valid, clear OTP fields and hash password
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        admin.password = hashedPassword;
        admin.otp = undefined;  // Clear OTP
        admin.otpExpiry = undefined;  // Clear OTP expiry

        await admin.save();
        console.log('OTP verified successfully. Admin registered:', admin);
        res.status(200).json({ message: 'Admin successfully registered' });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Error verifying OTP', error: error.message });
    }
};

// Get All Admins
exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admins', error });
    }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        // Generate JWT Token
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',  // Token expires in 1 hour
        });

        res.status(200).json({
            message: 'Admin logged in successfully',
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                profile_photo: admin.profile_photo, // Include profile_photo
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in admin', error });
    }
};

// Update Admin
exports.updateAdmin = async (req, res) => {
    const { adminId } = req.params;
    const { name, email, password, profile_photo } = req.body;

    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updateData = {
            ...(name && { name }),
            ...(email && { email }),
            ...(hashedPassword && { password: hashedPassword }),
            ...(profile_photo && { profile_photo }),
        };

        const admin = await Admin.findByIdAndUpdate(adminId, updateData, { new: true });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error updating admin', error });
    }
};

// Delete Admin
exports.deleteAdmin = async (req, res) => {
    const { adminId } = req.params;
    try {
        const admin = await Admin.findByIdAndDelete(adminId);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin', error });
    }
};

// Get Admin By ID
exports.getAdminById = async (req, res) => {
    const { adminId } = req.params;

    try {
        const admin = await Admin.findById(adminId).select('-password -otp -otpExpiry'); // Exclude sensitive fields
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin data', error });
    }
};
