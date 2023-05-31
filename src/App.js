import React from "react";
import InteractiveReader from "./components/InteractiveReader";
import Definitions from "./components/Definitions";
import "./App.css";
import symposiumText from "./material/symposiumText";

const definitions = {
  Aristophanes:
    "A Greek playwright of Old Comedy, known for his witty and satirical plays.",
  Socrates:
    "A classical Greek philosopher credited as one of the founders of Western philosophy.",
  banquet: "A formal meal where guests are invited to eat and drink together.",
};

const App = () => {
  const [selectedTerms, setSelectedTerms] = React.useState([]);

  const handleTermSelection = (term) => {
    setSelectedTerms((prevSelectedTerms) => [...prevSelectedTerms, term]);
  };

  const handleClearDefinitions = () => {
    setSelectedTerms([]);
  };

  return (
    <div className="app">
      <div className="text-window">
        <InteractiveReader
          text={symposiumText}
          handleTermSelection={handleTermSelection}
        />
      </div>
      <div className="definitions-window">
        <Definitions selectedTerms={selectedTerms} definitions={definitions} />
        {selectedTerms.length > 0 && (
          <button className="button" onClick={handleClearDefinitions}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
