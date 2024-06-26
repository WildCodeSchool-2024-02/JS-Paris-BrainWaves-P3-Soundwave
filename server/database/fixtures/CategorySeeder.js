const AbstractSeeder = require("./AbstractSeeder");

class CategorySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "category", truncate: true });
  }

  run() {
    const cat1 = {
      style: "House",
      refName: "category_1",
    };
    const cat2 = {
      style: "Techno",
      refName: "category_2",
    };
    const cat3 = {
      style: "Trance",
      refName: "category_3",
    };
    const cat4 = {
      style: "Dub",
      refName: "category_4",
    };
    const cat5 = {
      style: "Tech House",
      refName: "category_5",
    };
    const cat6 = {
      style: "Electro",
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
