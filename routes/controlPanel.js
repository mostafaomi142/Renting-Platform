const express = require("express");

const path = require("path");
const rootDir = path.dirname(require.main.filename);

const router = express.Router();

const { addProducts, getProducts } = require('../controllers/Product');

router.get('/controlPanel', getProducts);
router.post('/controlPanel', addProducts);

router.post('/controlPanel', addProducts);

module.exports = router;
