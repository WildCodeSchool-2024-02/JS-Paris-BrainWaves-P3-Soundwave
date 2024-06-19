const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async readOne(id) {
    const [[users]] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ? AND role = "client"`,
      [id]
    );
    return users;
  }

  async insertOne(userData) {
    const {firstname, lastname, email, password} = userData
    const [user] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`,
      [firstname, lastname, email, password]
    );
    return user;
  }

  async logIn(email, password) {
    const [users] = await this.database.query(
      `SELECT id, email FROM ${this.table} WHERE email = ? AND password = ?`,
      [email, password]
    );
    return users;
  }
}

module.exports = UserRepository;
