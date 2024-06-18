const AbstractSeeder = require("./AbstractSeeder");
const CrewSeeder = require("./CrewSeeder");

class EventsSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "event", truncate: true, dependencie: [CrewSeeder] });
  }

  run() {
    const event1 = {
      name: "THE CHOMAGE GO OOOON!!",
      date: "2024-07-26",
      starting_hour: "23:00:00",
      address: "14 rue de toto paris",
      description: "ça va bourlinguer sevère les amis lol",
      image:
        "https://imgproxy.ra.co/_/quality:66/w:1442/rt:fill/aHR0cHM6Ly9pbWFnZXMucmEuY28vNTQ5YzJlODFkNGFlN2UyNGI3YzZkMzE1MjNlMDAzZDIyMmVmMGI3MC5wbmc=",
      refName: "event_1",
    };

    const event2 = {
      name: "OUTDOM SAUVAGE : RETROLOG",
      date: "2024-08-15",
      starting_hour: "14:00:01",
      address: "Square du flop Paris 750flop",
      description:
        "Attention ça va swinguer dans le vaisseau spatial SEE YOU IN SPACE",
      image:
        "https://res.cloudinary.com/shotgun/image/upload/ar_16:9,c_limit,f_auto,fl_lossy,q_auto,w_1280/v1705338215/production/artworks/FACEBOOK-EVENT-COVER_ttppwf",
      refName: "event_2",
    };

    const event3 = {
      name: "TARMAC 3000 MACH2",
      date: "2024-09-03",
      starting_hour: "23:00:00",
      address: "12 rue de l'aéroport CDG ROISSY ORLY EN FRANCE",
      description: "ça va décoler sevère n'oubliez votre farine",
      image:
        "https://res.cloudinary.com/shotgun/image/upload/ar_16:9,c_limit,f_auto,fl_lossy,q_auto,w_1280/v1709718645/production/artworks/TARMAC_BERCY_test_2_o1ayak",
      refName: "event_3",
    };

    const event4 = {
      name: "Toto au Rex Club",
      date: "2024-06-29",
      starting_hour: "23:00:00",
      address: "12 rue du Rex",
      description: "Super soirée avec Dj Toto",
      image:
        "https://imgproxy.ra.co/_/quality:66/aHR0cHM6Ly9pbWFnZXMucmEuY28vY2I2MmU3MGIyODI0ZTVlZTZkMGExYTEzMmNjMGE3Y2U0NjgxMGE4My5wbmc=",
      refName: "event_4",
    };

    const event5 = {
      name: "Toto au Cabaret Sauvage",
      date: "2024-05-24",
      starting_hour: "23:00:00",
      address: "12 rue du Cabaret",
      description: "Encore une Super soirée avec Dj Toto",
      image:
        "https://res.cloudinary.com/shotgun/image/upload/ar_16:9,c_limit,f_auto,fl_lossy,q_auto,w_1280/v1630943002/production/artworks/GABARIT_COVER_EVENT_FB_bbwedb",
      refName: "event_5",
    };

    const event6 = {
      name: "Toto a la Rotonde de Stalincrack",
      date: "2024-07-24",
      starting_hour: "23:00:00",
      address: "12 rue du crack",
      description: "Encore une mega super soirée avec Dj Toto",
      image:
        "https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/371846629_330081256196779_319580765884456587_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=7xtESdTZQDkQ7kNvgG61-qR&_nc_ht=scontent-cdg4-1.xx&oh=00_AYAwR3vH4hzxToIvnPT6gfOyEGNqary02vBIHEQhyfY42Q&oe=6671D28A",
    };

    this.insert(event1);
    this.insert(event2);
    this.insert(event3);
    this.insert(event4);
    this.insert(event5);
    this.insert(event6);
  }
}

module.exports = EventsSeeder;
