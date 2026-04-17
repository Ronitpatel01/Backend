require("dotenv").config();
const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.Mongo_URI)
    .then(console.log("Connected to Database"));
}

module.exports = connectToDB;
