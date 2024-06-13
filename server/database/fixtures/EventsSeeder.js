const AbstractSeeder = require("./AbstractSeeder");
const CrewSeeder = require("./CrewSeeder")

class EventsSeeder extends AbstractSeeder {
    constructor() {
      // Call the constructor of the parent class (AbstractSeeder) with appropriate options
      super({ table: "event", truncate: true, dependencie: [CrewSeeder]});
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

        const event4 = {
            name: "Toto au Rex Club",
            date:"2024-06-29",
            starting_hour: "23:00:00",
            address: "12 rue du Rex", 
            description: "Super soirée avec Dj Toto", 
            image: "https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/366509081_317271337477771_1297028564986031302_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rsVwbNOqT6oQ7kNvgFB7VLs&_nc_ht=scontent-cdg4-2.xx&oh=00_AYCHz_wrCvyN4ortP8Hn9P8wLHgWwV8_KUJx-5SAvyX94w&oe=66706BDF",
        };

        this.insert(event1);
        this.insert(event2);
        this.insert(event3);
        this.insert(event4);

    }
}

module.exports = EventsSeeder;