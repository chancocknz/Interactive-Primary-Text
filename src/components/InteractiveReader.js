import React from "react";
import "./InteractiveReader.css";

const InteractiveReader = (props) => {
  const [selectedTerm, setSelectedTerm] = React.useState(null);

  const handleClick = (term) => {
    setSelectedTerm(term === selectedTerm ? null : term);
  };

  return (
    <div className="interactive-reader">
      <h1>Plato's Symposium</h1>
      {props.text.map((paragraph, index) => (
        <p key={index}>
          {paragraph.split(" ").map((word, wordIndex) => {
            const isTermSelected = word === selectedTerm;
            return (
              <span
                key={wordIndex}
                className={`word ${isTermSelected ? "selected" : ""}`}
                onClick={() => {
                  handleClick(word);
                  props.handleTermSelection(word);
                }}
              >
                {word + " "}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
};

export default InteractiveReader;
