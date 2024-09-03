const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/flight", (req, res) => {
  res.render("flight.ejs");
});

app.get("/itinerary", (req, res) => {
  res.render("itinerary.ejs");
});

app.get("/lodging", (req, res) => {
  res.render("lodging.ejs");
});

app.get("/trip", (req, res) => {
  res.render("trip.ejs");
});

app.get("/user", (req, res) => {
  res.render("user.ejs");
});

app.listen(3001, () => {
  console.log("Listening on port 3001!");
});
