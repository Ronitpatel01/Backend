const e = require("express");
const app = require("./src/app");


const notes = [];



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.post("/notes", (req, res) => {
  // const note = req.body.note;
  notes.push(req.body);
  res.send("Note added successfully");
  console.log(req.body)
});

app.delete("/notes/:index", (req, res) => {
  const index = req.params.index;
  notes.splice(index, 1);
  res.send("Note deleted successfully");
  
});
