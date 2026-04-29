const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: [true, "A user already exists with this email"],
  },
  name: String,
});

const userModel = mongoose.model("userSchema", userSchema);

module.exports = userModel;
