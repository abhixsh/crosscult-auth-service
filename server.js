const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS middleware
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const adminRoutes = require('./routes/adminRoutes'); // Use appropriate route file for Admin CRUD operations and authentication

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173', // Your React frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// MongoDB Connection (Admin-related models)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/admins')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Swagger Setup for Documentation
const swaggerOptions = {
  swaggerDefinition: require('./swagger.json'), // Path to your Swagger JSON definition
  apis: ['./routes/adminRoutes.js'], // Define paths for your route documentation, e.g. Admin routes file
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/admins', adminRoutes); // Replace `adminRoutes` with your actual route file that handles admin-related requests

// Root route to display backend URL and Swagger URL
app.get('/', (req, res) => {
  res.send(`
    Backend is running on port ${process.env.PORT || 3002}<br>
    Swagger documentation is available at <a href="http://localhost:${process.env.PORT || 3002}/api-docs" target="_blank">Swagger API Documentation</a>
  `);
});

// Start server
const PORT = process.env.PORT || 3002; // Update your desired port here
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
