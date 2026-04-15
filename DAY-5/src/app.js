const express = require("express");
const app = express();

app.use(express.json());

const notes = [];
app.get("/notes", (req, res) => {
  res.status(200).json({
    notes: notes,
  });
});

app.post("/notes", (req, res) => {
  const note = req.body;
  notes.push(note);
  res.status(201).json({
    message: "Created note successfully !",
  });
});

app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  notes.splice(id, 1);
  res.status(200).json({
    message: "Deleted note successfully !",
  });
});

app.patch("/notes/:id", (req, res) => {
  const id = req.params.id;
  const description = req.body.description;
  notes[id].description = description;
  res.status(200).json({
    message: "Updated note successfully !",
  });
});

module.exports = app;
