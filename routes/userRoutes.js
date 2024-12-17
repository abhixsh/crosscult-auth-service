const express = require('express');
const router = express.Router();
const { registerUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');

/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               country:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profile_picture:
 *                 type: string
 *               bio:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [content_creator, visitor]
 *               fav_Country:
 *                 type: string
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [history, food]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerUser);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Fetches all users in the system.
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Internal server error
 */
router.get('/', getUsers);

/**
 * @openapi
 * /users/{userId}:
 *   put:
 *     summary: Update user information
 *     description: Updates information for an existing user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User's unique identifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               country:
 *                 type: string
 *               email:
 *                 type: string
 *               profile_picture:
 *                 type: string
 *               bio:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [content_creator, visitor]
 *               fav_Country:
 *                 type: string
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [history, food]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:userId', updateUser);

/**
 * @openapi
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user from the system.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User's unique identifier
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:userId', deleteUser);

module.exports = router;
