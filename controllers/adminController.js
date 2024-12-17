const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

// Register Admin
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const adminExists = await Admin.findOne({ email });
        if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ name, email, password: hashedPassword });
        await admin.save();

        res.status(201).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error registering admin', error });
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
