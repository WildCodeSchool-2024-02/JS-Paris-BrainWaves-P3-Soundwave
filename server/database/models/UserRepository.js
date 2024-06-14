const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
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
