import Card from "./Card";

export default class CharactersList {
  constructor(characters) {
    this.charactersList = characters;
  }

  async render() {
    const CharactersList = document.createElement("ul");
    CharactersList.setAttribute("id", "characters-list");

    this.charactersList.forEach((character) => {
      character.name && CharactersList.append(new Card(character).render());
    });

    return CharactersList;
  }

  async updateCharactersList(newCharactersList) {
    this.charactersList = newCharactersList;
    const CharactersList = document.getElementById("characters-list");
    CharactersList.parentElement.removeChild(CharactersList);
    return await this.render();
  }
}
