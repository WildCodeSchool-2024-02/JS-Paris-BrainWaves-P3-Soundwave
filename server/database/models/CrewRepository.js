const AbstractRepository = require("./AbstractRepository");

class CrewRepository extends AbstractRepository {
  constructor() {
    super({ table: "crew" });
  }

  async readAllEventsFromCrew(id) {
    const [events] = await this.database.query(
      `SELECT event.* FROM event JOIN crew_event ON crew_event.event_id = event.id JOIN ${this.table} ON ${this.table}.id = crew_event.crew_id WHERE ${this.table}.id = ?`,
      [id]
    );
    return events;
  }

  async insertOne(crewData) {
    const { name, image, description } = crewData;
    const [crew] = await this.database.query(
      `INSERT INTO ${this.table} (name, image,description) VALUES (?, ?, ?, ?, ?)`,
      [name, image, description]
    );
    return crew;
  }
}

module.exports = CrewRepository;
