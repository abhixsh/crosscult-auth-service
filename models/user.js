const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    country: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_picture: { type: String },
    bio: { type: String },
    role: { type: String, enum: ['content_creator', 'visitor'], default: 'visitor' },
    registration_date: { type: Date, default: Date.now },
    fav_Country: { type: String },
    preferences: { type: [String], enum: ['history', 'food'], default: [] }
});

module.exports = mongoose.model('User', userSchema);
