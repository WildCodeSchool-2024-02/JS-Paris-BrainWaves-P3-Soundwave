const AbstractRepository = require("./AbstractRepository");

class EventRepository extends AbstractRepository {
    constructor() {
        super ({table : 'event'});
        }
        
        // async create () {
        //     const [results] = await this.database.query(
        //         `INSERT INTO ${this.table} (name) VALUES`
        //     )
        //     return results
        // }


}

module.exports = EventRepository;