const express = require("express");
const cors = require("cors");
const noteModel = require("./models/note.model");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    message: "Notes retreived successfully",
    notes,
  });
});

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({
    title,
    description,
  });
  res.status(201).json({
    msg: "Created note successfully",
    note,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const noteId = req.params.id;

  await noteModel.findByIdAndDelete(noteId);
  res.status(200).json({
    msg: "Note deleted successfully",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const noteId = req.params.id;

  const { description } = req.body;

  await noteModel.findByIdAndUpdate(noteId, { description });

  res.status(200).json({
    message: "Note updated successfully",
  });
});

app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
