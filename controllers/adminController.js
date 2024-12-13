const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Temporary store for OTPs. For production, use a cache like Redis.
let adminOTPs = {};

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send OTP
const sendOTP = async (email) => {
    const otp = crypto.randomInt(100000, 999999); // Generate 6-digit OTP
    const expiresIn = Date.now() + 5 * 60 * 1000; // Valid for 5 minutes

    // Save OTP temporarily
    adminOTPs[email] = { otp, expiresIn };

    // Send email with OTP
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Admin Login OTP',
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    console.log(`OTP sent to ${email}: ${otp}`);
    return otp;
};

// Register a new admin
exports.registerAdmin = async (req, res) => {
    const { name, email, notification_email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            name,
            email,
            notification_email,
            password: hashedPassword,
        });
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login admin with OTP verification
exports.loginAdmin = async (req, res) => {
    const { email, password, otp } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        // OTP Validation Step
        if (otp) {
            const storedOTP = adminOTPs[admin.notification_email];
            if (!storedOTP || storedOTP.otp !== parseInt(otp)) {
                return res.status(400).json({ message: 'Invalid or expired OTP' });
            }

            if (storedOTP.expiresIn < Date.now()) {
                delete adminOTPs[admin.notification_email];
                return res.status(400).json({ message: 'OTP expired. Please login again.' });
            }

            // OTP verified
            delete adminOTPs[admin.notification_email]; // Clear OTP after use
            return res.status(200).json({ message: 'Login successful', admin });
        }

        // If OTP not provided, send OTP
        await sendOTP(admin.notification_email);
        res.status(200).json({ message: 'OTP sent to your notification email.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CRUD for admins
exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const updateData = req.body;
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Admin deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
