const express = require("express");

const path = require("path");
const rootDir = path.dirname(require.main.filename);

const app = express();


const loginRoutes = require(path.join(rootDir, 'routes', 'login'));
const signupRoutes = require(path.join(rootDir, 'routes', 'signup'));
const homeRoutes = require(path.join(rootDir, 'routes', 'home'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(rootDir,'public')));

app.use(loginRoutes);
app.use(signupRoutes);
app.use(homeRoutes);

app.listen(process.env.PORT || 3000);
