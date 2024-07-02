const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "user", truncate: true });
  }

  // The run method - Populate the 'user' table with fake data

  run() {
    const userAdmin = {
      firstname: "toto",
      lastname: "tata",
      email: "toto@gmail.com",
      password: "toto",
      role: "admin",
    };

    const userCrew1 = {
      firstname: "yann",
      lastname: "la",
      email: "la@gmail.com",
      password: "toto",
      role: "crew",
    };

    const userCrew2 = {
      firstname: "aude",
      lastname: "sed",
      email: "sed@gmail.com",
      password: "toto",
      role: "crew",
    };

    const userCrew3 = {
      firstname: "manue",
      lastname: "cu",
      email: "cu@gmail.com",
      password: "toto",
      role: "crew",
    };

    const userClient = {
      firstname: "adam",
      lastname: "ma",
      email: "ma@gmail.com",
      password: "toto",
      role: "client",
    };
    this.insert(userAdmin);
    this.insert(userCrew1);
    this.insert(userCrew2);
    this.insert(userCrew3);
    this.insert(userClient);
  }
}

// Export the UserSeeder class
module.exports = UserSeeder;
