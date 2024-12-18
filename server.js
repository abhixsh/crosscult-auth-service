// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Database connection
const cors = require('cors'); // CORS middleware
const userRoutes = require('./routes/userRoutes'); // User routes
const adminRoutes = require('./routes/adminRoutes'); // Admin routes
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config(); // Initialize environment variables
const app = express();

// Connect to the database
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json()); 

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',  // Allow frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Routes for users and admins
app.use('/users', userRoutes);  // POST route for registration will be here
app.use('/admins', adminRoutes); 

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('API Documentation available at http://localhost:${PORT}/api-docs');
});
