const express = require('express');
const router = express.Router();
const { registerUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');


router.post('/register', registerUser);
router.get('/', getUsers);
router.post('/login', loginUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
