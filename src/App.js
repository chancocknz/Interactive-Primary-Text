import React from "react";
import InteractiveReader from "./components/InteractiveReader";
import Definitions from "./components/Definitions";
import Generator from "./components/Generator";
import "./App.css";
import symposiumText from "./material/symposiumText";
import commonWords from "./material/mostCommonWords.json";

const App = () => {
  const [selectedTerms, setSelectedTerms] = React.useState([]);
  const [generatedDefinitions, setGeneratedDefinitions] = React.useState({});

  const handleTermSelection = (term) => {
    // Remove punctuation and capitalize the first letter of each word
    const normalizedTerm = term
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    setSelectedTerms((prevSelectedTerms) => [
      ...prevSelectedTerms,
      normalizedTerm,
    ]);
  };

  const handleDefinitionsGenerated = (term, definition) => {
    setGeneratedDefinitions((prevDefinitions) => ({
      ...prevDefinitions,
      [term]: definition,
    }));
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
        <Generator
          term={selectedTerms[selectedTerms.length - 1]}
          commonWords={commonWords.commonWords}
          onDefinitionsGenerated={handleDefinitionsGenerated}
        />
        <Definitions
          selectedTerms={selectedTerms}
          definitions={generatedDefinitions}
        />
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
