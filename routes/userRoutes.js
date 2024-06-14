const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Define user routes here
router.post('/register', userController.registerUser);
router.get('/:id', userController.getUserById);

module.exports = router;
