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

  async readCategory(style) {
    const results = await this.database.query(
      `SELECT ${this.table}.*, category.style FROM ${this.table} JOIN category_event ON category_event.event_id = ${this.table}.id JOIN category ON category_event.category_id = category.id WHERE category.style = ?`,
      [style]
    );
    return results;
  }
}

module.exports = EventRepository;
