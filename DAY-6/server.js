const app = require("./src/app");
const mongoose = require("mongoose")

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

function connectToDatabase() {
  mongoose
    .connect(
      "mongodb+srv://roonitpatel_db_user:yA7H0YF66uv8MG2c@cluster0.uws6sb9.mongodb.net/day-6",
    )
    .then(console.log("Connected to DB successfully"));
}

connectToDatabase();
