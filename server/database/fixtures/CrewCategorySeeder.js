const AbstractSeeder = require("./AbstractSeeder");
const CrewSeeder = require("./CrewSeeder");
const CategorySeeder = require("./CategorySeeder");

class CrewCategorySeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "category_crew",
      truncate: true,
      dependencies: [CategorySeeder, CrewSeeder],
    });
  }

  run() {
    const catCrew1 = {
      category_id: this.getRef("category_1").insertId,
      crew_id: this.getRef("crew_2").insertId,
    };
    const catCrew2 = {
      category_id: this.getRef("category_3").insertId,
      crew_id: this.getRef("crew_1").insertId,
    };
    const catCrew3 = {
      category_id: this.getRef("category_4").insertId,
      crew_id: this.getRef("crew_3").insertId,
    };
    this.insert(catCrew1);
    this.insert(catCrew2);
    this.insert(catCrew3);
  }
}

module.exports = CrewCategorySeeder;
