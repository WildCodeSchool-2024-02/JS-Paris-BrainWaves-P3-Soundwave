const AbstractRepository = require("./AbstractRepository");

class EventRepository extends AbstractRepository {
    constructor() {
        super ({table : 'event'});
    }
}

module.exports = EventRepository;