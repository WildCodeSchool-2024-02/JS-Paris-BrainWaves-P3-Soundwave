const AbstractRepository = require("./AbstractRepository");

class CrewRepository extends AbstractRepository {
  constructor() {
    super({ table: "crew" });
  }

  async readValidatedEventsFromCrew(id) {
    const [events] = await this.database.query(
      `SELECT event.* FROM event JOIN crew_event ON crew_event.event_id = event.id JOIN ${this.table} ON ${this.table}.id = crew_event.crew_id WHERE event.is_validated IS true AND ${this.table}.id = ?`,
      [id]
    );
    return events;
  }

  async readUnvalidatedEventsFromCrew(id) {
    const [events] = await this.database.query(
      `SELECT event.* FROM event JOIN crew_event ON crew_event.event_id = event.id JOIN ${this.table} ON ${this.table}.id = crew_event.crew_id WHERE event.is_validated IS false AND ${this.table}.id = ?`,
      [id]
    );
    return events;
  }

  async insertOne(crewData) {
    const { name, image, description, ownerId } = crewData;

    const [crew] = await this.database.query(
      `INSERT INTO ${this.table} (name, image, description, owner_id) VALUES (?, ?, ?, ?)`,
      [name, image, description, ownerId]
    );
    return crew;
  }
}

module.exports = CrewRepository;
