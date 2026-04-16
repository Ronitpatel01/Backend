const express = require("express");

const NotesModel = require("./models/notes.model");
const app = express();

app.use(express.json());

// app.get("/notes", (req, res) => {
//   res.status(200).json({
//     message: "Received notes successfully !",
//     ,
//   });
// });

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await NotesModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "Created note successfully !",
    note,
  });
});

module.exports = app;
