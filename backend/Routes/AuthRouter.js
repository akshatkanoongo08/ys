const express = require('express');
const router = express.Router();

const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { signup, login } = require('../Controllers/AuthController');

// Define the POST route for signup
router.post('/signup', signupValidation, signup);
router.post('/login',loginValidation,login)

module.exports = router;
