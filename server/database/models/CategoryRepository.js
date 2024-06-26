const AbstractRepository = require("./AbstractRepository");

class CategoryRepository extends AbstractRepository {
    constructor() {
        super({ table : "category"});
    }

   async readCategory() {
    const [category] = await this.database.query(
        `SELECT * FROM ${this.table}`
    );
    return category;
   }
}

module.exports= CategoryRepository;