const express = require('express');
const router = express.Router();
const { registerUser, getUsers, updateUser, deleteUser, loginUser } = require('../controllers/userController');  // Add loginUser here

router.post('/register', registerUser);
router.get('/', getUsers);
router.post('/login', loginUser); // Now loginUser is defined
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
