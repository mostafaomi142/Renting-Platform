const db = require("../util/database");

module.exports = class Product {
  constructor(name, price, category, photoUrl, userId) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.photoUrl = photoUrl;
    this.userId = userId;

  }

  save() {
    return db.execute(
      "INSERT INTO product (name, price, category, photoUrl, userId) VALUES (?, ?, ?, ?, ?)",
      [this.name, this.price, this.category, this.photoUrl, this.userId]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM product");
  }

  static fetchUserProducts(userId) {
    return db.execute("SELECT * FROM product WHERE userId = ?", [userId]);
  }

  static findById(id) {
    return db.execute("SELECT * FROM product WHERE id = ?", [id]);
  }

  static updateBasic(id, name, price, category) {
    return db.execute(
      "UPDATE product SET name = ?, price = ?, category = ? WHERE id = ?",
      [name, price, category, id]
    );
  }

  // edit
  editProduct(id) {
    return db.execute(
      "UPDATE product SET name = ?, price = ?, category = ?, photoUrl = ?, userId = ? WHERE id = ?",
      [this.name, this.price, this.category, this.photoUrl, this.userId, id]
    );
  }
  
  // delete
  deleteProduct(id) {
    return db.execute("DELETE FROM product WHERE id = ?", [id]);
  }

  static deleteById(id) {
    return db.execute("DELETE FROM product WHERE id = ?", [id]);
  }

  // Change renting status
  updateRentingStatus(id){
    return db.execute("UPDATE product SET rentingStatus = NOT rentingStatus where id = ?", [id])
  }

  static setRentingStatus(id, status){
    return db.execute("UPDATE product SET rentingStatus = ? WHERE id = ?", [status, id]);
  }

  static getCat(category){
    return db.execute("SELECT * FROM product Where category = ?", [category]);
  }
};


