// Import database client
const database = require("../client");

// Provide database access through AbstractRepository class
class AbstractRepository {
  constructor({ table }) {
    // thx https://www.codeheroes.fr/2017/11/08/js-classes-abstraites-et-interfaces/
    if (this.constructor === AbstractRepository) {
      throw new TypeError(
        "Abstract class 'AbstractRepository' cannot be instantiated directly"
      );
    }

    // Store the table name
    this.table = table;

    // Provide access to the database client
    this.database = database;
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table} WHERE is_validated IS true`);
    return rows;
  }

  async readOne(id) {
    const [[row]] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return row;
  }

  async readAllPendings() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table} WHERE is_validated IS null`);
    return rows;
  }
 

  async edit(body, id) {
    const [row] = await this.database.query(
      `UPDATE ${this.table} SET ? WHERE id = ? `,
      [body, id]
    );
    return row;
  }
};  

// Ready to export
module.exports = AbstractRepository;
