const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");


router.get("/", productController.getHomeProducts);   // the the products in home page.


router.post("/add-product", productController.addProduct);  //store product information from the control panel.


router.get("/controlPanel", productController.getControlPanelProducts);  // user products in control panel.

module.exports = router;
