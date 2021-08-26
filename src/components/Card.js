export default class Card {
  constructor(character) {
    this.state = {
      name: character.name.first,
      image:
        "https://upload.wikimedia.org/wikipedia/de/thumb/4/4e/Futurama-logo.svg/1920px-Futurama-logo.svg.png",
      gender: character.gender,
      species: character.species,
      homePlanet: character.homePlanet,
      ocupation: character.ocupation,
      sayings: character.sayings,
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

    Card.addEventListener("click", () => {
      console.log(this.state);
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
