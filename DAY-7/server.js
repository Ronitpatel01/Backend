const app = require("./src/app");

const NotesModel = require("./src/models/notes.model");

const connectToDB = require("./src/config/database");

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

connectToDB();
