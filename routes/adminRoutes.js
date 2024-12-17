const express = require('express');
const router = express.Router();
const { registerAdmin, getAdmins, updateAdmin, deleteAdmin } = require('../controllers/adminController');

/**
 * @openapi
 * /admins/register:
 *   post:
 *     summary: Register a new admin
 *     description: Creates a new admin in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Admin already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerAdmin);

/**
 * @openapi
 * /admins:
 *   get:
 *     summary: Get all admins
 *     description: Fetches all admins in the system.
 *     responses:
 *       200:
 *         description: List of admins
 *       500:
 *         description: Internal server error
 */
router.get('/', getAdmins);

/**
 * @openapi
 * /admins/{adminId}:
 *   put:
 *     summary: Update admin information
 *     description: Updates information for an existing admin.
 *     parameters:
 *       - in: path
 *         name: adminId
 *         required: true
 *         description: Admin's unique identifier
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */
router.put('/:adminId', updateAdmin);

/**
 * @openapi
 * /admins/{adminId}:
 *   delete:
 *     summary: Delete an admin
 *     description: Deletes an admin from the system.
 *     parameters:
 *       - in: path
 *         name: adminId
 *         required: true
 *         description: Admin's unique identifier
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:adminId', deleteAdmin);

module.exports = router;
