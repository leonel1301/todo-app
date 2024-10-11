const express = require('express');
const router = express.Router();


const userController = require('../controllers/UserController')


router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);

module.exports = router;