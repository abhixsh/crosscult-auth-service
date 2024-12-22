const express = require('express');
const router = express.Router();
const { registerUser, getUsers, updateUser, deleteUser, loginUser, getUsersCount, getUserByUsername } = require('../controllers/userController'); // Import the new controller method

router.post('/register', registerUser);
router.get('/', getUsers);
router.post('/login', loginUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
router.get('/count', getUsersCount);  // Route for getting the count of users

// Route to get a user by username
router.get('/username/:username', getUserByUsername); // Route for fetching user by username

module.exports = router;
