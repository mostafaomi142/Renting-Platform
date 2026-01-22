const express = require("express");

const path = require("path");
const rootDir = path.dirname(require.main.filename);
const Product = require('../model/product');
const productController = require('../controllers/product');

const router = express.Router();

router.get("/product/:productId", (req, res) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .then(([product]) => {
            if (!product.length) {
                return res.status(404).send("Product not found");
            }
            res.render("productDetails", { product: product[0] });
        })
        .catch(err => console.log(err));
});

router.post("/rent/:productId", (req, res) => {
    productController.requestRent(req, res);
});

router.post('/category', (req, res) => {
    productController.getCategoryProducts(req, res);
}
);

router.get('/category', (req, res)=>{
    res.render("productDetails", { product: product[0] });
})


module.exports = router;