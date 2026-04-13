const express = require("express"); // importing express module
const app = express(); // creating an instance of express

app.get("/", (req, res) => {
  res.send("Hello World!"); // sending a response to the client
});
app.get("/home", (req, res) => {
  res.send({ name: "Ronit" }); // sending a response to the client
});

app.listen(3000, () => {
  console.log("Server is running on port 3000"); // starting the server
});
