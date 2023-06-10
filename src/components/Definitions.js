import React from "react";
import "./Definitions.css";

const Definitions = (props) => {
  const { selectedTerms, definitions, selectedPositions } = props;

  return (
    <div className="definitions">
      <h3>Definitions</h3>
      {selectedTerms.map((term, index) => {
        const position = selectedPositions[index];
        const key = `${term}:${position}`;
        return (
          <div className="definition" key={key}>
            <p>
              <strong>{term}:</strong> {definitions[term]}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Definitions;
