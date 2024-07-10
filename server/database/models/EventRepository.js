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
    return results.insertId;
  }

  async addCrewIdEvent(eventId, crewId) {
    const [eventCrewId] = await this.database.query(
      `INSERT INTO crew_event (event_id, crew_id) values (?, ?)`,
      [eventId, crewId]
    );

    return eventCrewId;
  }

  async addStyleEvent(eventCategories) {
    const request = this.database.format(
      `INSERT INTO category_event (category_id, event_id) VALUES ?`,
      [eventCategories]
    );
    const eventStyle = this.database.query(request);
    return eventStyle;
  }

  async readLast() {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE date(date) >= CURDATE() AND is_validated = true ORDER BY id DESC`
    );
    return rows;
  }

  async readCategory(style) {
    const results = await this.database.query(
      `SELECT ${this.table}.*, category.style FROM ${this.table} JOIN category_event ON category_event.event_id = ${this.table}.id JOIN category ON category_event.category_id = category.id WHERE category.style = ?`,
      [style]
    );
    return results;
  }

  async readCrewFromEvent(id) {
    const [[crew]] = await this.database.query(
      `SELECT crew.* FROM crew JOIN crew_event ON crew_event.crew_id = crew.id JOIN ${this.table} ON ${this.table}.id = crew_event.event_id WHERE event_id = ?`,
      [id]
    );
    return crew;
  }
}

module.exports = EventRepository;
