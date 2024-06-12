const AbstractRepository = require("./AbstractRepository");

class CrewRepository extends AbstractRepository {
  constructor() {
    super({ table: "crew" });
  }
}

module.exports = CrewRepository;
