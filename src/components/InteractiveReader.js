import React from "react";
import "./InteractiveReader.css";

const InteractiveReader = (props) => {
  const [text, setText] = React.useState(props.text);
  const [selectedTerm, setSelectedTerm] = React.useState(null);
  const [selectedDef, setSelectedDef] = React.useState(null);

  const handleClick = (term, def) => {
    if (term === selectedTerm) {
      // Deselect the term if it's already selected
      setSelectedTerm(null);
      setSelectedDef(null);
    } else {
      // Select the clicked term and show its definition
      setSelectedTerm(term);
      setSelectedDef(def);
    }
  };

  return (
    <div className="interactive-reader">
      <div className="text-window">
        <h1>Plato's Symposium</h1>
        {text.map((paragraph, index) => (
          <p key={index}>
            {paragraph.split(" ").map((word, wordIndex) => {
              const isTermSelected = word === selectedTerm;
              return (
                <span
                  key={wordIndex}
                  className={`word ${isTermSelected ? "selected" : ""}`}
                  onClick={() => handleClick(word, props.definitions[word])}
                >
                  {word + " "}
                </span>
              );
            })}
          </p>
        ))}
      </div>
      <div className="definition-window">
        {selectedTerm && (
          <div className="definition">
            <p>
              <strong>{selectedTerm}:</strong> {selectedDef}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveReader;
