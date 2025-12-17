const db = require("../util/database");

module.exports = class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  save() {
    return db.execute(
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
      [this.name, this.email, this.password]
    );
  }

  isEmailFound() {
    return db
      .execute(
        "SELECT EXISTS(SELECT 1 FROM user WHERE email = ? AND password = ?) AS found",
        [this.email, this.password]
      )
      .then(([rows]) => {
        return rows[0].found === 1;
      })
      .catch((err) => {
        console.error("Database error in isEmailFound:", err);
        return false; // return false if any error occurs
      });
  }
};
