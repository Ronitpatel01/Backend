const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});

app.use(express.json());

app.post("/notes", (req, res) => {
  res.send("Note has been created ");
  console.log(req.body); 
});
