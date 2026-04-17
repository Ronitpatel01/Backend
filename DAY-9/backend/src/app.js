const express = require("express");

const mongoose = require("mongoose");

const noteModel = require("./models/note.model");

const app = express();

app.use(express.json());

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

module.exports = app;
