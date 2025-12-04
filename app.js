const express = require("express");

const path = require("path");
const rootDir = path.dirname(require.main.filename);

app = express();

const loginRoutes = require(path.join(rootDir, 'routes', 'login'));
const signupRoutes = require(path.join(rootDir, 'routes', 'signup'));
const homeRoutes = require(path.join(rootDir, 'routes', 'home'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(rootDir,'Public')));

app.use(loginRoutes);
app.use(signupRoutes);
app.use(homeRoutes);


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
