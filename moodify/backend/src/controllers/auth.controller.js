const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
require("dotenv").config();

// const cookie = require("cookie-parser")

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyRegistered) {
    return res.status(400).json({
      message: "User with same email or username already exists.",
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
      username: newUser.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully.",
    username: newUser.username,
    email: newUser.email,
    id: newUser._id,
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  }).select("+password");
  if (!user) {
    return res.status(401).json({
      message: "User not found.",
    });
  }

  const checkPass = await bcrypt.compare(password, user.password);

  if (!checkPass) {
    return res.status(401).json({
      message: "Invalid credentials.",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username,
    },
    process.env.jwt_secret,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);
  return res.status(200).json({
    message: "User logged in successfully.",
    user: {
      username: user.username,
      email: user.email,
      id: user._id,
    },
  });
}
module.exports = { registerUser, loginUser };
