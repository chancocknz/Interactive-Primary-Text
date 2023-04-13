import React from "react";
import InteractiveReader from "./components/InteractiveReader";
import "./App.css";
import symposiumText from "./material/symposiumText";

const definitions = {
  Aristophanes:
    "A Greek playwright of Old Comedy, known for his witty and satirical plays.",
  Socrates:
    "A classical Greek philosopher credited as one of the founders of Western philosophy.",
  banquet: "A formal meal where guests are invited to eat and drink together.",
};

const App = () => (
  <div>
    <InteractiveReader text={symposiumText} definitions={definitions} />
  </div>
);

export default App;
