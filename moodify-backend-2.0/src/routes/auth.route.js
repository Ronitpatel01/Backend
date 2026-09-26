const express = require('express');
const userModel = require('../models/user.model');
const router = express.Router();
const { loginController, registerController, logoutController, getMeController} = require('../controllers/auth.controller');

router.post('/login', loginController)
router.post("/register", registerController)
// router.get('/logout', logoutController)
// router.get('/get-me', getMeController)

module.exports = router