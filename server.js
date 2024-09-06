const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});


app.get("/trip", (req, res) => {
  res.render("trip.ejs");
});

app.listen(3001, () => {
  console.log("Listening on port 3001!");
});
