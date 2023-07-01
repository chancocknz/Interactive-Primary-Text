import React from "react";
import "./Definitions.css";

const Definitions = (props) => {
  const { selectedTerms, definitions, selectedPositions } = props;

  const shortenTerm = (term) => {
    const words = term.split(" ");
    if (words.length > 20) {
      const shortenedWords = [...words.slice(0, 15), "...", ...words.slice(-5)];
      return shortenedWords.join(" ");
    }
    return term;
  };

  return (
    <div className="definitions">
      <h3>Definitions</h3>
      {selectedTerms.map((term, index) => {
        const position = selectedPositions[index];
        const key = `${selectedTerms[index]}:${position}`;
        const shortenedTerm = shortenTerm(term);
        return (
          <div className="definition" key={key}>
            <p>
              <strong>{shortenedTerm}:</strong> {definitions[key]}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Definitions;
