const Product = require("../model/product");
const User = require("../model/User");


exports.getHomeProducts = (req, res) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("home", { 
        products,
        isLoggedIn: !!req.session.userId,
        userRole: req.session.userRole || 'user'
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

exports.updateProduct = (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect("/login");

  const productId = req.params.id;
  const { name, price, category } = req.body;

  Product.updateBasic(productId, name, price, category)
    .then(() => res.redirect("/controlPanel"))
    .catch(err => console.log(err));
};

exports.deleteProduct = (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect("/login");

  const productId = req.params.id;

  Product.deleteById(productId)
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

exports.requestRent = (req, res) => {
  // Prevent owners from renting
  if (req.session.userRole === 'owner') return res.redirect("/");
  
  const productId = req.params.productId;
  // status: 1 means pending
  Product.setRentingStatus(productId, 1)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err));
};

exports.approveRent = (req, res) => {
  const productId = req.params.productId;
  // status: 2 means approved/rented
  Product.setRentingStatus(productId, 2)
    .then(() => res.redirect("/controlPanel"))
    .catch(err => console.log(err));
};

exports.denyRent = (req, res) => {
  const productId = req.params.productId;
  // status: 0 means available again
  Product.setRentingStatus(productId, 0)
    .then(() => res.redirect("/controlPanel"))
    .catch(err => console.log(err));
};

exports.getCategoryProducts = (req, res) => {
  const category = req.body.category
  console.log(category);
  Product.getCat(category);
};