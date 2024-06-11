const AbstractSeeder = require("./AbstractSeeder");

class CrewSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "crew", truncate: true });
  }

  run() {
    const crew1 = {
      name: "Outdom Records",
      image:
        "https://res.cloudinary.com/shotgun/image/upload/v1683012905/production/artworks/artists/Outdom.jpg",
      description:
        "Outdom est l association du préfixe out et du suffixe dom, qui signifie hors des concepts. La signature sonore du label peut être définie par son esthétique rétro-futuriste et rave. Inspiré par le son électro-house, tech-house et breaks des années 90 et du début des années 2000, créant un style hybride à base de basses électro funky et grinçantes, des vocoders robotiques, des synthés spooky ou cosmiques, des échantillons de vinyle et des grooves de breaks tranchants. Dans un style orienté vers le dancefloor, visant à faire vibrer foule, comme ils ont l habitude de le faire lors de leurs évènement à Paris.",
      owner_id: 2,
    };

    const crew2 = {
      name: "Tarmac 3000",
      image:
        "https://scontent.flyn1-1.fna.fbcdn.net/v/t39.30808-6/304463264_487941533339287_5960928212151516663_n.png?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=tdz9xPgh7yAQ7kNvgHQKYB5&_nc_ht=scontent.flyn1-1.fna&oh=00_AYAnyCkz1EISBKGEZvy29i7mS0UxIXsPbYBfL-_ImVc9aA&oe=666DDC45",
      description:
        "Vos pilotes préférés débarquent pour vous faire danser toute la nuit",
      owner_id: 4,
    };

    const crew3 = {
      name: "Claquettes Chaussettes",
      image:
        "https://res.cloudinary.com/shotgun/image/upload/v1700670540/production/artworks/logo_saison_3_neutre_siv3p2.jpg",
      description: "La fête, l'amour, la plage et un shoot de bonnes vibes !",
      owner_id: 3,
    };

    this.insert(crew1, crew2, crew3);
  }
}

module.exports = CrewSeeder;
