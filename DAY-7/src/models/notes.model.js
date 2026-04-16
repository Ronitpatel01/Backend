const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const NotesModel = mongoose.model("notes", NoteSchema);

module.exports = NotesModel;
