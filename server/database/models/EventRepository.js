const AbstractRepository = require("./AbstractRepository");

class EventRepository extends AbstractRepository {
  constructor() {
    super({ table: "event" });
  }

  async readCurrent() {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE date(date) >= CURDATE() AND is_validated IS true`
    );
    return rows;
  }

  async create(event) {
    const [results] = await this.database.query(
      `INSERT INTO ${this.table} (name, date, starting_hour, location, address, description, image, lineup) VALUES(?,?,?,?,?,?,?,?)`,
      [
        event.name,
        event.date,
        event.starting_hour,
        event.location,
        event.address,
        event.description,
        event.image,
        event.lineup,
      ]
    );
    return results;
  }
}

module.exports = EventRepository;
