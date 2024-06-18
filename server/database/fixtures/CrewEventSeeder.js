const AbstractSeeder = require("./AbstractSeeder");
const CrewSeeder = require("./CrewSeeder");
const EventsSeeder = require("./EventsSeeder");

class CrewEventSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "crew_event",
      truncate: true,
      dependencies: [CrewSeeder, EventsSeeder],
    });
  }

  run() {
    const crewEvent1 = {
      crew_id: this.getRef("crew_1").insertId,
      event_id: this.getRef("event_2").insertId,
    };
    const crewEvent2 = {
      crew_id: this.getRef("crew_1").insertId,
      event_id: this.getRef("event_4").insertId,
    };
    const crewEvent3 = {
      crew_id: this.getRef("crew_2").insertId,
      event_id: this.getRef("event_3").insertId,
    };
    const crewEvent4 = {
      crew_id: this.getRef("crew_3").insertId,
      event_id: this.getRef("event_1").insertId,
    };
    const crewEvent5 = {
      crew_id: this.getRef("crew_3").insertId,
      event_id: this.getRef("event_5").insertId,
    };
    this.insert(crewEvent1);
    this.insert(crewEvent2);
    this.insert(crewEvent3);
    this.insert(crewEvent4);
    this.insert(crewEvent5);
  }
}

module.exports = CrewEventSeeder;
