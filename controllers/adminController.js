const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendOTPEmail = require('../utils/sendEmail');  // Import the utility

// Register Admin
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const adminExists = await Admin.findOne({ email });
        if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
        const otpExpiry = Date.now() + 300000;  // OTP valid for 5 minutes

        // Store OTP and its expiration in the admin document for later validation
        const admin = new Admin({ name, email, password, otp, otpExpiry });
        await admin.save();

        // Send OTP to admin's email
        await sendOTPEmail(email, otp);

        res.status(200).json({ message: 'OTP sent to email, please verify it' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering admin', error });
    }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        if (admin.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Check OTP expiration
        if (Date.now() > admin.otpExpiry) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        // Hash password and complete registration
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        admin.password = hashedPassword;
        admin.otp = undefined;  // OTP used, now clear it
        admin.otpExpiry = undefined;  // OTP expiration cleared

        await admin.save();
        res.status(201).json({ message: 'Admin successfully registered' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
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

// Update Admin
exports.updateAdmin = async (req, res) => {
    const { adminId } = req.params;
    const { name, email, password } = req.body;

    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updateData = hashedPassword ? { name, email, password: hashedPassword } : { name, email };

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
