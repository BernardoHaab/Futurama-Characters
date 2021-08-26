export default class Datails {
  constructor(character) {
    this.state = character;
  }

  render() {
    const Details = document.createElement("div");
    Details.setAttribute("class", "details");

    const Header = document.createElement("header");
    Details.append(Header);

    Header.append(this.getProfileImageElement());
    Header.append(this.getProfileInfosElement());

    const QuoteList = document.createElement("ul");
    Details.append(QuoteList);

    const QuoteTitle = document.createElement("h2");
    QuoteTitle.innerHTML = "Main Lines";
    QuoteList.append(QuoteTitle);
    this.state.sayings.forEach((quote) => {
      QuoteList.append(this.getQuoteElement(quote));
    });

    return Details;
  }

  getProfileImageElement() {
    const ImageContainer = document.createElement("div");
    ImageContainer.setAttribute("class", "image-container");

    const ProfileImage = document.createElement("img");
    ProfileImage.setAttribute("src", this.state.image);
    ProfileImage.setAttribute("alt", this.state.name);

    ImageContainer.append(ProfileImage);
    return ImageContainer;
  }

  getQuoteElement(quoteText) {
    const QuoteContainer = document.createElement("div");
    QuoteContainer.setAttribute("class", "quote-container");

    const Quote = document.createElement("p");
    Quote.innerHTML = `"${quoteText}"`;
    QuoteContainer.append(Quote);

    return QuoteContainer;
  }

  getProfileInfosElement() {
    const InfosContainer = document.createElement("section");
    InfosContainer.setAttribute("class", "infos-container");

    InfosContainer.append(this.getCharacterNameElement());
    InfosContainer.append(this.getHomePlanetElement());
    InfosContainer.append(this.getIdentityElement());
    InfosContainer.append(this.getOccupationElement());

    return InfosContainer;
  }

  getCharacterNameElement() {
    const Name = document.createElement("h1");
    Name.innerHTML = `${this.state.name}, ${this.state.age}`;

    return Name;
  }

  getHomePlanetElement() {
    const HomePlanetContainer = document.createElement("span");
    const HomePlanet = document.createElement("h3");

    HomePlanet.innerHTML = this.state.homePlanet;

    HomePlanetContainer.append(this.getIcon("language"));
    HomePlanetContainer.append(HomePlanet);

    return HomePlanetContainer;
  }

  getIdentityElement() {
    const IdentityContainer = document.createElement("span");
    const Identity = document.createElement("p");

    Identity.innerHTML = `${this.state.species}, ${this.state.gender}`;

    IdentityContainer.append(this.getIcon("fingerprint"));
    IdentityContainer.append(Identity);

    return IdentityContainer;
  }

  getOccupationElement() {
    const OccupationContainer = document.createElement("span");
    const Occupation = document.createElement("p");

    Occupation.innerHTML = this.state.occupation;

    OccupationContainer.append(this.getIcon("work"));
    OccupationContainer.append(Occupation);

    return OccupationContainer;
  }

  getIcon(iconName) {
    const Icon = document.createElement("span");

    Icon.setAttribute("class", "material-icons");
    Icon.innerHTML = iconName;

    return Icon;
  }
}
