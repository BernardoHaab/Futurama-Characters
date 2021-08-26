import Card from "./Card";

export default class CharactersList {
  constructor() {}

  async render() {
    const CharactersList = document.createElement("ul");
    CharactersList.setAttribute("class", "characters-list");

    try {
      const res = await fetch(
        "https://api.sampleapis.com/futurama/characters/"
      );
      const characters = await res.json();

      characters.forEach((character) => {
        character.name && CharactersList.append(new Card(character).render());
      });
    } catch (error) {
      console.log(error);
    }
    return CharactersList;
  }
}
