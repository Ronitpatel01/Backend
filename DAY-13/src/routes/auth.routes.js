const mongoose = require("mongoose");
const express = require("express");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {registerController, loginController} = require("../controllers/auth.controller");

const authRouter = express.Router();

const User = require("../models/user.model");

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);



module.exports = authRouter;