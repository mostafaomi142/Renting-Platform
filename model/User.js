const db = require("../util/database");

module.exports = class User {
  constructor(name, email, password, role = 'user') {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  save() {
    return db.execute(
      "INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)",
      [this.name, this.email, this.password, this.role]
    );
  }

  
  isUserFound() {
    return db.execute(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [this.email, this.password]
    ).then(([rows]) => {
      if (rows.length > 0) {
        return rows[0]; 
      }
      return null;
    });
  }

  static fetchById(userId) {
    return db.execute(
      "SELECT * FROM user WHERE id = ?",
      [userId]
    );
  }
};
