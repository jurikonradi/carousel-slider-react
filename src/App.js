import Carousel from "./components/Carousel";
import "./App.css";
import settings from "./settings/settings.js";
import elementSources from "./components/elements/ElementsForCarousel";

function App() {
  return (
    <div>
      <Carousel elementSources={elementSources} settings={settings} />
    </div>
  );
}

export default App;
