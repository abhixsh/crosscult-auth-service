const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Specification version
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation for my Express app',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`, // Server URL
            },
        ],
    },
    apis: ['server.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sample route
/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a greeting
 *     responses:
 *       200:
 *         description: A hello world response
 */
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

/**
 * @swagger
 * /api/data:
 *   post:
 *     summary: Receives data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Data received successfully
 */
app.post('/api/data', (req, res) => {
    const data = req.body; // Access JSON data sent in the request
    res.json({ message: 'Data received', data });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
