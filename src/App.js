// App.js for highlighting
import React from "react";
import InteractiveReader from "./components/InteractiveReader";
import Definitions from "./components/Definitions";
import Generator from "./components/Generator";
import PasswordScreen from "./components/PasswordScreen";
import "./App.css";
import symposiumText from "./material/symposiumText";
import commonWords from "./material/mostCommonWords.json";

const App = () => {
  const [selectedTerms, setSelectedTerms] = React.useState([]);
  const [generatedDefinitions, setGeneratedDefinitions] = React.useState({});
  const [currentParagraph, setCurrentParagraph] = React.useState(null);
  const [selectedPositions, setSelectedPositions] = React.useState([]);
  const [hasAccess, setHasAccess] = React.useState(false);

  // Define your password validation function here
  const validatePassword = (enteredPassword) => {
    // Replace 'your-secret-password' with your actual secret password
    return enteredPassword === "1234";
  };

  // Handle password submission
  const handlePasswordSubmit = (enteredPasswordValid) => {
    if (enteredPasswordValid) {
      setHasAccess(true); // Grant access if the password is correct
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handleTermSelection = (term, paragraph, position) => {
    // Remove punctuation and capitalize the first letter of each word
    const normalizedTerm = term
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    // Check if the position of the selected term has already been selected
    const positionIndex = selectedPositions.indexOf(position);

    if (positionIndex === -1) {
      // selected position doesn't exist so we can add term and position
      setSelectedTerms((prevSelectedTerms) => [
        ...prevSelectedTerms,
        normalizedTerm,
      ]);

      setSelectedPositions((prevSelectedPositions) => [
        ...prevSelectedPositions,
        position,
      ]);
    } else {
      // Selected position exists, so we should reorder terms and positions to have
      // it add end of list without re-generating
      const updatedTerms = [...selectedTerms];
      const updatedPositions = [...selectedPositions];

      // Move the selected term and position to the end of the arrays
      updatedTerms.splice(positionIndex, 1);
      updatedTerms.push(normalizedTerm);

      updatedPositions.splice(positionIndex, 1);
      updatedPositions.push(position);

      setSelectedTerms(updatedTerms);
      setSelectedPositions(updatedPositions);
    }

    setCurrentParagraph(paragraph);
  };

  const handlePhraseSelection2 = (phrase) => {
    const positionIndex = selectedTerms.indexOf(phrase);

    if (positionIndex === -1) {
      // selected position doesn't exist so we can add term and position
      setSelectedTerms((prevSelectedTerms) => [...prevSelectedTerms, phrase]);

      setSelectedPositions((prevSelectedPositions) => [
        ...prevSelectedPositions,
        null,
      ]);
    } else {
      const updatedTerms = [...selectedTerms];
      const updatedPositions = [...selectedPositions];

      // Move the selected term and position to the end of the arrays
      updatedTerms.splice(positionIndex, 1);
      updatedTerms.push(phrase);
      updatedPositions.splice(positionIndex, 1);
      updatedPositions.push(null);

      setSelectedTerms(updatedTerms);
      setSelectedPositions(updatedPositions);
    }

    setCurrentParagraph(null);
  };

  const handleDefinitionsGenerated = (term, definition) => {
    const key = `${term}:${selectedPositions[selectedPositions.length - 1]}`;
    setGeneratedDefinitions((prevDefinitions) => ({
      ...prevDefinitions,
      [key]: definition,
    }));
  };

  const handleClearDefinitions = () => {
    setSelectedTerms([]);
    setSelectedPositions([]);
  };

  return (
    <div className="app">
      {!hasAccess ? (
        <PasswordScreen onPasswordSubmit={handlePasswordSubmit} />
      ) : (
        // Render your main content here
        <div className="app">
          {/* ... Your existing code for the main content ... */}
          <div className="text-window">
            <InteractiveReader
              text={symposiumText}
              handleTermSelection={handleTermSelection}
              handlePhraseSelection={handlePhraseSelection2}
            />
          </div>
          <div className="definitions-window">
            <Generator
              term={selectedTerms[selectedTerms.length - 1]}
              paragraph={currentParagraph}
              commonWords={commonWords.commonWords}
              onDefinitionsGenerated={handleDefinitionsGenerated}
              selectedPosition={selectedPositions[selectedPositions.length - 1]}
            />
            <Definitions
              selectedTerms={selectedTerms}
              definitions={generatedDefinitions}
              selectedPositions={selectedPositions}
            />
            {selectedTerms.length > 0 && (
              <button className="button" onClick={handleClearDefinitions}>
                Clear
              </button>
            )}
          </div>
        </div>
      )}
      {/* <div className="text-window">
        <InteractiveReader
          text={symposiumText}
          handleTermSelection={handleTermSelection}
          handlePhraseSelection={handlePhraseSelection2}
        />
      </div>
      <div className="definitions-window">
        <Generator
          term={selectedTerms[selectedTerms.length - 1]}
          paragraph={currentParagraph}
          commonWords={commonWords.commonWords}
          onDefinitionsGenerated={handleDefinitionsGenerated}
          selectedPosition={selectedPositions[selectedPositions.length - 1]}
        />
        <Definitions
          selectedTerms={selectedTerms}
          definitions={generatedDefinitions}
          selectedPositions={selectedPositions}
        />
        {selectedTerms.length > 0 && (
          <button className="button" onClick={handleClearDefinitions}>
            Clear
          </button>
        )}
      </div> */}
    </div>
  );
};

export default App;
