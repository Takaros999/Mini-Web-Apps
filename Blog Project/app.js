const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("Home Page!");
  // res.send("Welcome Home!");
  res.render("home.ejs");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
