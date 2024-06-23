const AbstractSeeder = require("./AbstractSeeder");

class CategorySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "category", truncate: true });
  }

  run() {
    const cat1 = {
      name: "House",
      refName: "category_1",
    };
    const cat2 = {
      name: "Techno",
      refName: "category_2",
    };
    const cat3 = {
      name: "Trance",
      refName: "category_3",
    };
    const cat4 = {
      name: "Dub",
      refName: "category_4",
    };
    const cat5 = {
      name: "Tech House",
      refName: "category_5",
    };
    const cat6 = {
      name: "Electro",
      refName: "category_6",
    };

    this.insert(cat1);
    this.insert(cat2);
    this.insert(cat3);
    this.insert(cat4);
    this.insert(cat5);
    this.insert(cat6);
  }
}

module.exports = CategorySeeder;
