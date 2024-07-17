const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async readAllUsers() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async readOne(id) {
    const [[users]] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ? `,
      [id]
    );
    return users;
  }

  async insertOne(userData) {
    const { firstname, lastname, email, password, role } = userData;
    const [user] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)`,
      [firstname, lastname, email, password, role]
    );
    return user;
  }

  async findByEmail(email) {
    const [user] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ? `,
      [email]
    );
    return user;
  }

  async selectCrewByUser(id) {
    const [[crew]] = await this.database.query(
      `SELECT crew.id FROM crew JOIN ${this.table} ON crew.owner_id = ${this.table}.id where ${this.table}.id = ?`,
      [id]
    );
    return crew;
  }

  async userLikeEvent(eventId, userId) {
    const [addLike] = await this.database.query(
      `INSERT INTO user_event_like (event_id, user_id) VALUES (?, ?)`,
      [eventId, userId]
    );
    return addLike;
  }

  async deleteEventLike(eventId, userId) {
    const [deleteLike] = await this.database.query(
      `DELETE FROM user_event_like WHERE event_id = ? AND user_id = ?`,
      [eventId, userId]
    );
    return deleteLike;
  }

  async readEventLike(userId) {
    const [readLikes] = await this.database.query(
      `SELECT event_id FROM user_event_like WHERE user_id = ?`,
      [userId]
    );
    return readLikes;
  } 
  
  async readAllEventLike (userId) {
    const [readLikes] = await this.database.query(
      `SELECT event.* FROM event JOIN user_event_like ON user_event_like.event_id = event.id JOIN ${this.table} ON ${this.table}.id = user_event_like.user_id WHERE user_id = ?`,
      [userId]
    );
    return readLikes;
  }

  

  async userFollowCrew(crewId, userId) {
    const [addFollow] = await this.database.query(
      `INSERT INTO user_crew_follow (crew_id, user_id) VALUES (?, ?)`,
      [crewId, userId]
    );
    return addFollow;
  }

  async deleteCrewFollow(crewId, userId) {
    const [deleteFollow] = await this.database.query(
      `DELETE FROM user_crew_follow WHERE crew_id = ? AND user_id = ?`,
      [crewId, userId]
    );
    return deleteFollow;
  }

  async readCrewFollow(userId) {
    const [readFollows] = await this.database.query(
      `SELECT crew_id FROM user_crew_follow WHERE user_id = ?`,
      [userId]
    );
    return readFollows;
  }

  async allCrewFollow(userId) {
    const [allFollows] = await this.database.query(
      `SELECT crew.* FROM crew JOIN user_crew_follow ON user_crew_follow.crew_id = crew.id JOIN user ON user.id = user_crew_follow.user_id WHERE = user_id = ?`,
      [userId]
    );
    return allFollows;
  }
}

module.exports = UserRepository;
