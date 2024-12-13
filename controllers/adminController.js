const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');

// Register a new admin
exports.registerAdmin = async (req, res) => {
    const { name, email, notification_email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            name,
            email,
            notification_email,
            password: hashedPassword
        });
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login admin
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        res.status(200).json({ message: 'Login successful', admin });
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
