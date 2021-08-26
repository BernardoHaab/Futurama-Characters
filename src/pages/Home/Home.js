import CharactersList from "../../components/CharactersList";

export default class Home {
  constructor() {}

  async render() {
    const Home = document.createElement("div");
    Home.setAttribute("id", "home");

    const Main = document.createElement("main");
    Main.setAttribute("class", "main");
    Home.append(Main);
    Main.append(await new CharactersList().render());

    return Home;
  }
}
