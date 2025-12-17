const express = require('express');
const app = express();

app.use(express.json());        
app.use(express.urlencoded({ extended: true }));

const Product = require('../model/product'); 

exports.addProducts = (req, res, next) => {
  const {name, price, category, photoUrl} = req.body;
  console.log('Product data: ', req.body);

  const product = new Product(name, price, category, photoUrl);
  console.log('Product object data: ', product);

  product.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render('controlPanel', {
        products: products
      });
    })
    .catch(err => console.log(err));
};
