const express= require('express');
const { registerController, loginController } = require('../controllers/authController');

const router= express.Router();

// routes
// REGISTER || POST METHOD
router.post('/register', registerController)

// LOGIN || POST METHOD
router.post('/login', loginController)
module.exports= router