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

  async readCrewId() {
    const [crewId] = await this.database.query(
      `SELECT crew FROM user WHERE owner_id = user.id`
    )
    return crewId;
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


  async addCrewIdEvent (crewId, eventId) {
    const [eventCrewId] = await this.database.query(
      `INSERT INTO crew_event (crew_id, event_id) value (?, ?)`, [crewId, eventId]
    )
    
    return eventCrewId;
  }

  async readCategory(genre) {
    const [results] = await this.database.query(
      `SELECT ${this.table}.*, category.genre FROM ${this.table} JOIN category_event ON category_event.event_id = ${this.table}.id JOIN category ON category_event.category_id = category.id WHERE category.style = ?`,
      [genre]
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
