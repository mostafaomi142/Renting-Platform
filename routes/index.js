const express = require("express");

const path = require("path");
const rootDir = path.dirname(require.main.filename);
const Product = require('../model/product');

const router = express.Router();

router.get('/', (req, res) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render('home', {
        isLoggedIn: req.session.isLoggedIn,
        products: rows
      });
    })
    .catch(err => {
      console.log(err);
      res.render('home', {
        isLoggedIn: req.session.isLoggedIn,
        products: []
      });
    });
});


router.post('/', (req, res)=>{
    res.redirect('/');
})


module.exports = router;