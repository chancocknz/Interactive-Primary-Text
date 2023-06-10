import React, { useState } from "react";
import "./InteractiveReader.css";

const InteractiveReader = (props) => {
  const [selectedTerm, setSelectedTerm] = useState(null);

  const handleClick = (term) => {
    setSelectedTerm(term === selectedTerm ? null : term);
  };

  const paragraphs = props.text.split("\n");

  let positionTracker = 0;

  const getWordClassName = (position) => {
    return selectedTerm && position === selectedTerm ? "word selected" : "word";
  };

  return (
    <div className="interactive-reader">
      <h1>Plato's Symposium</h1>
      {paragraphs.map((paragraph, paragraphIndex) => {
        const words = paragraph.split(" ");
        positionTracker += words.length;
        return (
          <p key={paragraphIndex}>
            {words.map((word, wordIndex) => {
              const position = positionTracker - words.length + wordIndex + 1;
              return (
                <span
                  key={position}
                  className={getWordClassName(position)}
                  onClick={() => {
                    handleClick(position);
                    props.handleTermSelection(word, paragraph, position);
                  }}
                >
                  {word + " "}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};

export default InteractiveReader;
