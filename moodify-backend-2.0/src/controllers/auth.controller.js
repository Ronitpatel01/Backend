const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
require("dotenv").config();
const bcrypt = require("bcryptjs");

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({ $or: [{ username }, { email }] }).select("+password");

  if (!user) {
    return res
      .status(401)
      .json({ message: "Invalid username, email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ message: "Invalid credentials" });
  }
  

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token);
  res.status(200).json({ message: "Login successful", user });
}

async function registerController(req, res) {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await userModel.create({ username, email, password: hashedPassword });
  const token  = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token);

  res.status(201).json({ message: "User created successfully", username:user.username, email:user.email });
}

module.exports = { loginController , registerController};
