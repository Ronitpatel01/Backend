const mongoose = require("mongoose");
require("dotenv").config();

function connectToDB() {
  mongoose
    .connect(process.env.Mongo_URI)
    .then(console.log("Connected to Database"));
}
module.exports = connectToDB;
