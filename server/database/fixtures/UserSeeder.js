const argon2 = require("argon2");
const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "user", truncate: true });
  }
  
  static hash(password) {
    return argon2.hash(password);
  }
  
  
  // The run method - Populate the 'user' table with fake data
  async run() {
    const userAdmin = {
      firstname: "toto",
      lastname: "tata",
      email: "toto@gmail.com",
      password: await UserSeeder.hash("toto"),
      role: "admin",
      refName: null,
    };

    const userCrew1 = {
      firstname: "yann",
      lastname: "la",
      email: "la@gmail.com",
      password: await UserSeeder.hash("toto"),
      role: "crew",
      refName: "userCrew1"
    };
    const userCrew2 = {
      firstname: "adam",
      lastname: "ma",
      email: "ma@gmail.com",
      password: await UserSeeder.hash("toto"),
      role: "crew",
      refName: "userCrew2"
    };
    const userCrew3 = {
      firstname: "aude",
      lastname: "sed",
      email: "sed@gmail.com",
      password: await UserSeeder.hash("toto"),
      role: "crew",
      refName: "userCrew3"
    };
    const userCrew4 = {
      firstname: "manue",
      lastname: "cu",
      email: "cu@gmail.com",
      password: await UserSeeder.hash("toto"),
      role: "crew",
      refName: "userCrew4"
    };

    const userClient = {
      firstname: "brian",
      lastname: "bou",
      email: "bou@gmail.com",
      password: await UserSeeder.hash("toto"),
      role: "client",
      refName: null,
    };
    this.insert(userAdmin);
    this.insert(userCrew1);
    this.insert(userCrew2);
    this.insert(userCrew3);
    this.insert(userCrew4);
    this.insert(userClient);
  }
}

// Export the UserSeeder class
module.exports = UserSeeder;
