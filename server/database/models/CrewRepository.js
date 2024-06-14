const AbstractRepository = require("./AbstractRepository");

class CrewRepository extends AbstractRepository {
  constructor() {
    super({ table: "crew" });
  }

  async readAllEventsFromCrew(id) {
    const [events] = await this.database.query(
      `SELECT * FROM event JOIN crew_event ON crew_event.event_id = event.id JOIN ${this.table} ON ${this.table}.id = crew_event.crew_id WHERE ${this.table}.id = ?`,
      [id]
    );
    console.log(events);
    return events;
  }
}

module.exports = CrewRepository;
