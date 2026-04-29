const express = require("express");
const userModel = require("./models/user.model");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

app.get("/api/users", async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({
    message: "Users fetched successfully",
    users
  });
});

module.exports = app;
