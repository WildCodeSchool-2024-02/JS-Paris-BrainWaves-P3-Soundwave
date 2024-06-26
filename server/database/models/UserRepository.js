const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async readOne(id) {
    const [[users]] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ? `,
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
    const [user] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ? `,
      [email]
    );
    return user;
  }

  
}

module.exports = UserRepository;
