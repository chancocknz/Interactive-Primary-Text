import React from "react";
import "./Definitions.css";

const Definitions = (props) => {
  const { selectedTerms, definitions } = props;

  //   if (!selectedTerms || selectedTerms.length === 0) {
  //     return null;
  //   }

  //   const selectedDef = definitions[selectedTerms];

  return (
    <div className="definitions">
      <h3>Definitions</h3>
      {selectedTerms.map((term) => (
        <div className="definition" key={term}>
          <p>
            <strong>{term}:</strong> {definitions[term]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Definitions;
