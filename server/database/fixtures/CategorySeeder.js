const AbstractSeeder = require("./AbstractSeeder");

class CategorySeeder extends AbstractSeeder {
    constructor() {
        super({ table: "category", truncate: true });
    }

    run() {
        const cat1 = {
            name: "House"
        }
        const cat2 = {
            name: "Techno"
        }
        const cat3 = {
            name: "Trance"
        }
        const cat4 = {
            name: "Dub"
        }
        const cat5 = {
            name: "Tech House"
        }

        this.insert(cat1);
        this.insert(cat2);
        this.insert(cat3);
        this.insert(cat4);
        this.insert(cat5);
    }
};

module.exports = CategorySeeder;