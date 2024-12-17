const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = async (req, res) => {
    const { name, username, country, email, password, profile_picture, bio, role, fav_Country, preferences } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, username, country, email, password: hashedPassword, profile_picture, bio, role, fav_Country, preferences });
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Get All Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name, username, country, email, profile_picture, bio, role, fav_Country, preferences } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { name, username, country, email, profile_picture, bio, role, fav_Country, preferences }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
