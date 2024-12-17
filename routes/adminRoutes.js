const express = require('express');
const router = express.Router();
const { registerAdmin, getAdmins, updateAdmin, deleteAdmin } = require('../controllers/adminController');

router.post('/register', registerAdmin);
router.get('/', getAdmins);
router.put('/:adminId', updateAdmin);
router.delete('/:adminId', deleteAdmin);

module.exports = router;
