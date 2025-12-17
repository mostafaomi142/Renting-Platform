const express = require("express");

const path = require("path");
const rootDir = path.dirname(require.main.filename);

const app = express();


const authRoutes = require(path.join(rootDir, 'routes', 'auth'));
const indexRoutes = require(path.join(rootDir, 'routes', 'index'));
const profileRoutes = require(path.join(rootDir, 'routes', 'profile'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(rootDir,'public')));

app.use(authRoutes);
app.use(indexRoutes);
app.use(profileRoutes);

app.listen(process.env.PORT || 3000);
