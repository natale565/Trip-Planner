const path = require('path');
const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const routes = require('./routes');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 100000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict'
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/create-trip", (req, res) => {
  res.render("create-trip.ejs");
});

app.get("/trip", (req, res) => {
  res.render("trip.ejs");
});
=======


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});