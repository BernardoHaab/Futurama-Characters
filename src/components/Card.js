import Details from "./Datails";

export default class Card {
  constructor(character) {
    this.character = {
      name: "Unknown Name",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HbJIB8q08sp1pkUEH4zijwHaK5%26pid%3DApi&f=1",
      gender: character.gender,
      species: character.species,
      homePlanet: character.homePlanet,
      occupation: character.occupation,
      sayings: character.sayings,
      age: character.age,
    };

    this.character.name = this.getName(character);

    if (character.images && character.images.main) {
      this.character.image = character.images.main.split("/revision")[0];
    }
  }

  getName(character) {
    return character.name.first
      ? character.name.first
      : character.name.second
      ? character.name.secondlast
      : character.name.last;
  }

  render() {
    const Card = document.createElement("li");
    Card.setAttribute("class", "card");

    Card.append(this.getImageElement());
    Card.append(this.getTitleElement());

    Card.addEventListener("click", async () => {
      window.scrollTo(0, 0);
      const Opaque = document.createElement("div");
      Opaque.setAttribute("class", "opaque");
      const HomeElement = document.getElementById("home");
      HomeElement.append(Opaque);

      const DetailsContainer = document.createElement("div");
      DetailsContainer.setAttribute("class", "details-container");
      DetailsContainer.append(await new Details(this.character).render());
      HomeElement.append(DetailsContainer);

      Opaque.addEventListener("click", () => {
        Opaque.parentNode.removeChild(Opaque);
        DetailsContainer.parentNode.removeChild(DetailsContainer);
      });
    });

    return Card;
  }

  getImageElement() {
    const Image = document.createElement("img");
    Image.setAttribute("src", this.character.image);
    Image.setAttribute("class", "character-image");
    Image.setAttribute("alt", this.character.name);

    return Image;
  }

  getTitleElement() {
    const Background = document.createElement("div");
    Background.setAttribute("class", "title-background");

    Background.append(this.getNameElement());
    Background.append(this.getSayingElement());

    return Background;
  }

  getNameElement() {
    const Name = document.createElement("h2");

    Name.setAttribute("class", "character-name");
    Name.innerHTML = this.character.name;

    return Name;
  }

  getSayingElement() {
    const Saying = document.createElement("p");

    Saying.innerHTML = `— "${
      this.character.sayings[
        Math.floor(Math.random() * this.character.sayings.length)
      ]
    }"`;

    return Saying;
  }
}
