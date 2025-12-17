const db = require("../util/database");

module.exports = class Product {
  constructor(name, price, category, photo) {   //photoUrl
    this.name = name;
    this.price = price;
    this.category = category;
    this.photo = photo;
  }

  save() {
    return db.execute(
      "INSERT INTO product (name, price, category, photo) VALUES (?, ?, ?, ?)",
      [this.name, this.price, this.category, this.photo || null]
    ).catch((err)=>{
        console.error('database error in save product:', err);
        return false;
    })
  }

  static fetchAll(){
    return db.execute(
        'SELECT * FROM product'
    )
  }
};
