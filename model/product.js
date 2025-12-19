const db = require("../util/database");

module.exports = class Product {
  constructor(name, price, category, photo, userId) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.photo = photo;
    this.userId = userId;
  }

  save() {
    return db.execute(
      "INSERT INTO product (name, price, category, photo, userId) VALUES (?, ?, ?, ?, ?)",
      [this.name, this.price, this.category, this.photo, this.userId]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM product");
  }

  static fetchUserProducts(userId) {
    return db.execute("SELECT * FROM product WHERE userId = ?", [userId]);
  }
};
