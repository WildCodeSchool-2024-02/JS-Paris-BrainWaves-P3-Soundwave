const AbstractSeeder = require("./AbstractSeeder");

class EventsSeeder extends AbstractSeeder {
    constructor() {
      // Call the constructor of the parent class (AbstractSeeder) with appropriate options
      super({ table: "event", truncate: true });
    }

    run() {
        const event1 = {
            name: "THE CHOMAGE GO OOOON!!",
            date: "2024-07-26",
            starting_hour: "23:00:00",
            address: "14 rue de toto paris", 
            description: "ça va bourlinguer sevère les amis lol", 
            image: "https://scontent.fcdg3-1.fna.fbcdn.net/v/t39.30808-6/436262251_738245651831998_6625109006347954237_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=riqeI716jl8Q7kNvgGH6CC-&_nc_ht=scontent.fcdg3-1.fna&oh=00_AYBmREJzwXV-zHbbbf_Qb_mShsIvFd2dgsdTj7EjSi_I4g&oe=666E2313",
        };

        const event2 = {
            name: "OUTDOM SAUVAGE : RETROLOG",
            date:"2024-08-15",
            starting_hour: "14:00:01",
            address: "Square du flop Paris 750flop", 
            description: "Attention ça va swinguer dans le vaisseau spatial SEE YOU IN SPACE", 
            image: "https://scontent.fcdg3-1.fna.fbcdn.net/v/t39.30808-6/419218938_863595245772316_8656101159860795969_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=yJYodf-EJfcQ7kNvgEiRaCE&_nc_ht=scontent.fcdg3-1.fna&oh=00_AYDnSpJ3jPnxxJTCcWJdKC9f85X2BWOO1CrKWXcUE0zIZw&oe=666E0052",
        };

        const event3 = {
            name: "TARMAC 3000 MACH2",
            date:"2024-09-03",
            starting_hour: "23:00:00",
            address: "12 rue de l'aéroport CDG ROISSY ORLY EN FRANCE", 
            description: "ça va décoler sevère n'oubliez votre farine", 
            image: "https://scontent.fcdg3-1.fna.fbcdn.net/v/t39.30808-6/431236957_932139475586155_3782091657230810251_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=swRk3TtClzAQ7kNvgFPtLyS&_nc_ht=scontent.fcdg3-1.fna&oh=00_AYD7hUlxIY14jghLI6ri_SAIIiZOzDWH8rZliL7IMmnghQ&oe=666E098B",
        };

        this.insert(event1);
        this.insert(event2);
        this.insert(event3);

    }
}

module.exports = EventsSeeder;