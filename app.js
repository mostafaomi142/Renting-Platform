const express = require("express");

const path = require("path");
const rootDir = path.dirname(require.main.filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(rootDir,'public')));

const authRoutes = require(path.join(rootDir, 'routes', 'auth'));
const indexRoutes = require(path.join(rootDir, 'routes', 'index'));
const controlPanelRoutes = require(path.join(rootDir, 'routes', 'controlPanel'));

app.use(authRoutes);
app.use(indexRoutes);
app.use(controlPanelRoutes);

app.listen(process.env.PORT || 3000);
