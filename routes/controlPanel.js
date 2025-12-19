const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const upload = require("../middleware/upload");


router.get("/", productController.getHomeProducts);   // the the products in home page.


router.post("/controlPanel", upload.single('photo'), productController.addProduct);  //store product information from the control panel.


router.get("/controlPanel", productController.getControlPanelProducts);  // user products in control panel.

module.exports = router;
