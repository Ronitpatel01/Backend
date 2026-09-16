const express = require("express");
const NotesModel = require("./models/note.model");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const notes = await NotesModel.find();
  res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
});

app.post("/", async (req, res) => {
  const { title, description } = req.body;
  const newNote = await NotesModel.create({ title, description });
  res.status(201).json({
    message: "Note created successfully",
    note: newNote,
  });
});


module.exports = app;
