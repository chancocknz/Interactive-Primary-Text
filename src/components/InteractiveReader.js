import React from "react";
import "./InteractiveReader.css";

const InteractiveReader = (props) => {
  const [text, setText] = React.useState(props.text);
  const [hoverTerm, setHoverTerm] = React.useState(null);
  const [hoverDef, setHoverDef] = React.useState(null);
  const [showDefinition, setShowDefinition] = React.useState(true);

  const handleMouseEnter = (term, def) => {
    setHoverTerm(term);
    setHoverDef(def);
  };

  const handleMouseLeave = () => {
    setHoverTerm(null);
    setHoverDef(null);
  };

  const toggleDefinition = () => {
    setShowDefinition(!showDefinition);
  };

  return (
    <div className="interactive-reader">
      <h1>Plato's Symposium</h1>
      {text.map((paragraph, index) => (
        <p key={index}>
          {paragraph.split(" ").map((word, wordIndex) => (
            <span
              key={wordIndex}
              onMouseEnter={() =>
                handleMouseEnter(word, props.definitions[word])
              }
              onMouseLeave={() => handleMouseLeave()}
            >
              {word + " "}
            </span>
          ))}
        </p>
      ))}
      {showDefinition && hoverTerm && (
        <div className="definition">
          <p>
            <strong>{hoverTerm}:</strong> {hoverDef}
          </p>
        </div>
      )}
      <div className="button-container">
        <button
          className={`toggle-button ${showDefinition ? "active" : ""}`}
          onClick={toggleDefinition}
        >
          {showDefinition ? "Hide" : "Show"} Definitions
        </button>
      </div>
    </div>
  );
};

export default InteractiveReader;
