import Details from "./Datails";

export default class Card {
  constructor(character) {
    this.state = {
      name: character.name.first,
      image:
        "https://upload.wikimedia.org/wikipedia/de/thumb/4/4e/Futurama-logo.svg/1920px-Futurama-logo.svg.png",
      gender: character.gender,
      species: character.species,
      homePlanet: character.homePlanet,
      occupation: character.occupation,
      sayings: character.sayings,
      age: character.age,
    };

    if (character.images && character.images.main) {
      this.state.image = character.images.main.split("/revision")[0];
    }
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
      DetailsContainer.append(await new Details(this.state).render());
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
    Image.setAttribute("src", this.state.image);
    Image.setAttribute("class", "character-image");
    Image.setAttribute("alt", this.state.name);

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
    Name.innerHTML = this.state.name;

    return Name;
  }

  getSayingElement() {
    const Saying = document.createElement("p");

    Saying.innerHTML = `— "${
      this.state.sayings[
        Math.floor(Math.random() * this.state.sayings.length + 1)
      ]
    }"`;

    return Saying;
  }
}
