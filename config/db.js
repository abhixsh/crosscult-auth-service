const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;  // Make sure this is set in your .env file
        if (!uri) {
            throw new Error('Mongo URI is undefined!');
        }

        await mongoose.connect(uri);  // No need to include deprecated options
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
