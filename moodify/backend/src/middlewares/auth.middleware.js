const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");
require("dotenv").config();

const authUser = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(400).json({
      message: "No token provided",
    });
  }

  const isTokenBlacklisted = await redis.get(token);
  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "Token is blacklisted",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
  next();
};
module.exports = { authUser };
