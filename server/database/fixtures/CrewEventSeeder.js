const AbstractSeeder = require("./AbstractSeeder");
const CrewSeeder = require("./CrewSeeder");
const EventsSeeder = require("./EventsSeeder");

class CrewEventSeeder extends AbstractSeeder {
    constructor() {
        super({ table: "crew_event", truncate: true, dependencies: [CrewSeeder, EventsSeeder] });
    }

    run() {
        const crewEvent1 = {
            crew_id : 1,
            event_id: 4
        };
        const crewEvent2 = {
            crew_id : 2,
            event_id: 2
        };
        const crewEvent3 = {
            crew_id : 2,
            event_id: 3
        };
        const crewEvent4 = {
            crew_id : 3,
            event_id: 1
        };
        const crewEvent5 = {
            crew_id : 3,
            event_id: 5
        };
    this.insert(crewEvent1);
    this.insert(crewEvent2);
    this.insert(crewEvent3);
    this.insert(crewEvent4);
    this.insert(crewEvent5);
        }
};

module.exports = CrewEventSeeder;