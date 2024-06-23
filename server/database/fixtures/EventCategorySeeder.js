const AbstractSeeder = require("./AbstractSeeder");
const CategorySeeder = require("./CategorySeeder");
const EventsSeeder = require("./EventsSeeder");

class EventCategorySeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "category_event",
      truncate: true,
      dependencies: [CategorySeeder, EventsSeeder],
    });
  }

  run() {
    const catEvent1 = {
      category_id: this.getRef("category_2").insertId,
      event_id: this.getRef("event_3").insertId,
    };
    const catEvent2 = {
      category_id: this.getRef("category_6").insertId,
      event_id: this.getRef("event_1").insertId,
    };
    const catEvent3 = {
      category_id: this.getRef("category_3").insertId,
      event_id: this.getRef("event_4").insertId,
    };
    const catEvent4 = {
      category_id: this.getRef("category_1").insertId,
      event_id: this.getRef("event_2").insertId,
    };
    const catEvent5 = {
      category_id: this.getRef("category_4").insertId,
      event_id: this.getRef("event_5").insertId,
    };
    const catEvent6 = {
      category_id: this.getRef("category_5").insertId,
      event_id: this.getRef("event_6").insertId,
    };
    this.insert(catEvent1);
    this.insert(catEvent2);
    this.insert(catEvent3);
    this.insert(catEvent4);
    this.insert(catEvent5);
    this.insert(catEvent6);
  }
}

module.exports = EventCategorySeeder;
