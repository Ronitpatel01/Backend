const mongoose = require("mongoose")
require("dotenv").config()

function connectToDB() {
  mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected to database")
}).catch((err)=>{
  console.log(err)
})
}

module.exports = connectToDB