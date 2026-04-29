const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  const userAlreadyExists = await userModel.findOne({ email });

  if (userAlreadyExists) {
    res.status(400).json({ message: "User already exists" });
  }

  const user = await userModel.create({
    email,
    name,
    password,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("jwt_token", token);

  res
    .status(201)
    .json({ message: "User registered successfully", user, token });
});

module.exports = authRouter;
