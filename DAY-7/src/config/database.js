const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(
      "mongodb+srv://roonitpatel:Ronit_MongoDB123@cluster0.znyqjht.mongodb.net/day-7",
    )
    .then(console.log("Connected to database"));
}
module.exports = connectToDB;
