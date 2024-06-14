const AbstractRepository = require("./AbstractRepository");

class EventRepository extends AbstractRepository {
    constructor() {
        super ({table : 'event'});
        }
        
        async readCurrent () {
            const [rows] = await this.database.query(
                `SELECT * FROM ${this.table} WHERE date(date) >= CURDATE()`
            )
            return rows
        }


}

module.exports = EventRepository;