const Product = require("../model/product");
const User = require("../model/auth");


exports.getHomeProducts = (req, res) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("home", { 
        products,
        isLoggedIn: !!req.session.userId 
      });
    })
    .catch(err => console.log(err));
};


exports.addProduct = (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect("/login");

  const { name, price, category } = req.body;
  
  // Require file upload
  if (!req.file) {
    return res.status(400).send('Please upload a photo');
  }
  
  const photoUrl = `/uploads/${req.file.filename}`;

  const product = new Product(name, price, category, photoUrl, userId);
  product.save()
    .then(() => res.redirect("/controlPanel"))
    .catch(err => console.log(err));
};

// Product of the user displayed in the control panel
exports.getControlPanelProducts = (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect("/login");

  Promise.all([
    User.fetchById(userId),
    Product.fetchUserProducts(userId)
  ])
    .then(([userData, productsData]) => {
      res.render("controlPanel", {
        // query return {rows, metadata}, rows are the actual data of table, but metadata are the comlumn names...
         user: userData[0][0],  //[0] => rows , second [0] => first row
         products: productsData[0]
      });
    })
    .catch(err => console.log(err));
};
