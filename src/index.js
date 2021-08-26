import "./styles/main.scss";

import Home from "./pages/Home/Home";

new Home().render().then((component) => {
  document.body.append(component);
});
