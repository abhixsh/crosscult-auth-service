const express = require('express');
const router = express.Router();
const { registerUser, getUsers, updateUser, deleteUser, loginUser, getUsersCount } = require('../controllers/userController'); // Add getUsersCount here

router.post('/register', registerUser);
router.get('/', getUsers);
router.post('/login', loginUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
router.get('/count', getUsersCount); // Route for total users count

module.exports = router;
