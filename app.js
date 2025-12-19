require('dotenv').config();
const express = require("express");
const session = require('express-session');
const path = require("path");

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'very-secret-key',
  resave: false,
  saveUninitialized: false
}));

const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const controlPanelRoutes = require('./routes/controlPanel');

app.use(authRoutes);
app.use(indexRoutes);
app.use(controlPanelRoutes);

app.listen(3000);
