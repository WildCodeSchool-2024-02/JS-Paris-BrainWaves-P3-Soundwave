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
    const {firstname, lastname, email, password, role} = userData
    const [user] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)`,
      [firstname, lastname, email, password, role]
    );
    return user;
  }

  async findByEmail(email) {
    const [users] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ? `,
      [email]
    );
    return users;
  }

  
}

module.exports = UserRepository;
