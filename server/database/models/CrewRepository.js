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

  // async addIdOwner(userId) {
  //   // Récupération de l'id de l'utilisateur
  //   const result = await this.database.query(
  //     `SELECT user.id  FROM user  JOIN ${this.table} ON user.id = ${this.table}.owner_id`,
  //     [userId]
  //   );
  // }

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
