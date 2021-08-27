import CharactersList from "../../components/CharactersList";

export default class Home {
  constructor() {
    this.allCharacters = new Array();
    this.filteredCharacters = new Array();
    this.species = new Array();
    this.filterSpecies = new Array();
    this.search = "";
    this.characterListElement;
    this.mainElement;
  }

  async render() {
    const Home = document.createElement("div");
    Home.setAttribute("id", "home");

    Home.append(this.getFeturedImage());
    try {
      const res = await fetch(
        "https://api.sampleapis.com/futurama/characters/"
      );
      const resJson = await res.json();

      resJson.forEach((res) => {
        if (res.name) {
          this.allCharacters.push(res);
        }
      });
    } catch (error) {
      log.error(error);
    }
    this.loadSpecies();
    this.loadFilteredCharacters();

    this.mainElement = document.createElement("main");
    this.mainElement.setAttribute("class", "main");
    Home.append(this.mainElement);

    this.mainElement.append(this.getFilterFormElemet());
    this.characterListElement = new CharactersList(this.filteredCharacters);
    this.mainElement.append(await this.characterListElement.render());

    return Home;
  }

  getFeturedImage() {
    const ImageContainer = document.createElement("div");
    ImageContainer.setAttribute("class", "feturedimage-container");

    const FeturedImage = document.createElement("img");
    FeturedImage.setAttribute("id", "fetured-image");
    FeturedImage.setAttribute(
      "src",
      "https://i.postimg.cc/MKfYcW0Q/Component-2-1.jpg"
    );
    ImageContainer.append(FeturedImage);
    const FuturamaLogo = document.createElement("img");
    FuturamaLogo.setAttribute("class", "futurama-logo");
    FuturamaLogo.setAttribute(
      "src",
      "https://i.postimg.cc/vHDYFmRC/external-content-duckduckgo-2.png"
    );
    FuturamaLogo.setAttribute("alt", "Futurama");
    ImageContainer.append(FuturamaLogo);

    return ImageContainer;
  }

  getFilterFormElemet() {
    const FilterForm = document.createElement("form");
    FilterForm.setAttribute("class", "filter-form");

    FilterForm.append(this.getSearchElement());

    const FiltersTitle = document.createElement("h3");
    FiltersTitle.setAttribute("id", "filters-title");
    FiltersTitle.innerHTML = "Species:";
    FilterForm.append(FiltersTitle);

    FilterForm.append(this.getFilterElement());

    return FilterForm;
  }

  getSearchElement() {
    const SearchContainer = document.createElement("div");
    SearchContainer.setAttribute("class", "search-container");

    const Icon = document.createElement("span");

    Icon.setAttribute("class", "material-icons");
    Icon.innerHTML = "search";
    SearchContainer.append(Icon);

    const SearchFieldContainer = document.createElement("span");
    SearchFieldContainer.setAttribute("id", "search-field-container");
    const SearchField = document.createElement("input");
    SearchField.setAttribute("name", "search");
    SearchField.setAttribute("placeholder", "Search");
    SearchField.setAttribute("value", this.search);
    SearchFieldContainer.append(SearchField);
    SearchContainer.append(SearchFieldContainer);

    SearchField.addEventListener("input", async () => {
      this.search = SearchField.value;
      this.loadFilteredCharacters();

      this.mainElement.append(
        await this.characterListElement.updateCharactersList(
          this.filteredCharacters
        )
      );
    });

    return SearchContainer;
  }

  getFilterElement() {
    const FiltersContainer = document.createElement("div");
    FiltersContainer.setAttribute("class", "filters-container");

    this.species.forEach((specie) => {
      const Filter = document.createElement("p");
      const FilterLabel = document.createElement("label");
      const FilterCheckbox = document.createElement("input");

      FilterLabel.setAttribute("for", specie);
      FilterLabel.innerHTML = specie;

      FilterCheckbox.setAttribute("type", "checkbox");
      FilterCheckbox.setAttribute("name", "filter-species");
      FilterCheckbox.setAttribute("value", specie);
      FilterCheckbox.setAttribute("id", specie);

      FilterCheckbox.addEventListener("change", async (checkbox) => {
        checkbox.target.checked
          ? this.filterSpecies.push(checkbox.target.value)
          : (this.filterSpecies = this.removeFilter(checkbox.target.value));

        this.loadFilteredCharacters();

        this.mainElement.append(
          await this.characterListElement.updateCharactersList(
            this.filteredCharacters
          )
        );
      });
      Filter.append(FilterCheckbox);
      Filter.append(FilterLabel);

      FiltersContainer.append(Filter);
    });

    return FiltersContainer;
  }

  removeFilter(filter) {
    return this.filterSpecies.filter(
      (appliedFilters) => appliedFilters != filter
    );
  }

  loadFilteredCharacters() {
    let filteredCharacters = this.allCharacters;
    if (this.filterSpecies.length > 0) {
      filteredCharacters = this.allCharacters.filter((character) =>
        this.filterSpecies.includes(character.species)
      );
    }

    if (this.search.trim != "") {
      this.filteredCharacters = filteredCharacters.filter((character) =>
        character.name.first.toUpperCase().startsWith(this.search.toUpperCase())
      );
    }
  }

  loadSpecies() {
    const species = new Array();
    this.allCharacters.forEach((character) => {
      species.push(character.species);
    });

    this.species = [...new Set(species)];
  }
}
