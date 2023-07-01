import React, { useState } from "react";
import "./InteractiveReader.css";

const InteractiveReader = (props) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  // const [selectedText, setSelectedText] = useState("");

  const handleClick = (position) => {
    setSelectedPosition(position === selectedPosition ? null : position);
  };

  const paragraphs = props.text.trim().split("\n");

  let positionTracker = 0;

  const getWordClassName = (position) => {
    return selectedPosition && position === selectedPosition
      ? "word selected"
      : "word";
  };

  return (
    <div
      className="interactive-reader"
      onMouseUpCapture={() => {
        const highlighted = window.getSelection().toString();
        if (highlighted && highlighted.trim().split(" ").length !== 1) {
          props.handlePhraseSelection(highlighted.trim());
        }
      }}
    >
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

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import "./InteractiveReader.css";

// const propTypes = {
//   text: PropTypes.string.isRequired,
//   handleTermSelection: PropTypes.func.isRequired,
// };

// const InteractiveReader = (props) => {
//   const [selectedText, setSelectedText] = useState("");
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const [selectionStart, setSelectionStart] = useState(null);
//   const [selectionEnd, setSelectionEnd] = useState(null);

//   const handleMouseUp = (position, paragraph) => {
//     console.log(position);
//     const selectedText = window.getSelection().toString();
//     const selectionStart = window.getSelection().anchorOffset;
//     const selectionEnd = window.getSelection().focusOffset;

//     setSelectedText(selectedText);
//     setSelectionStart(selectionStart);
//     setSelectionEnd(selectionEnd);

//     if (selectedText) {
//       console.log(setSelectionStart);
//       console.log(setSelectionEnd);
//       props.handlePhraseSelection(
//         selectedText,
//         paragraph,
//         position,
//         position + selectedText.split(" ").length
//       );
//     }
//   };

//   const handleClick = (position, word) => {
//     setSelectedPosition(position === selectedPosition ? null : position);
//     setSelectedText(word);
//   };

//   const getWordClassName = (position) => {
//     return selectedPosition && position === selectedPosition
//       ? "word selected"
//       : "word";
//   };

//   const paragraphs = props.text.split("\n");

//   let positionTracker = 0;

//   return (
//     <div className="interactive-reader" onMouseUp={handleMouseUp}>
//       <h1>Plato's Symposium</h1>
//       {paragraphs.map((paragraph, paragraphIndex) => {
//         const words = paragraph.split(" ");
//         positionTracker += words.length;
//         return (
//           <p key={paragraphIndex}>
//             {words.map((word, wordIndex) => {
//               const position = positionTracker - words.length + wordIndex + 1;
//               return (
//                 <span
//                   key={position}
//                   // onMouseUp={() => {
//                   //   handleClick(position, word);
//                   //   handleMouseUp(position, word);
//                   // }}
//                   className={getWordClassName(position)}
//                   onClick={() => {
//                     handleClick(position, word);
//                     props.handleTermSelection(word, paragraph, position);
//                   }}
//                 >
//                   {word + " "}
//                 </span>
//               );
//             })}
//           </p>
//         );
//       })}
//     </div>
//   );
// };

// InteractiveReader.propTypes = propTypes;

// export default InteractiveReader;

//Hover stuff:
// import React, { useState, useCallback } from "react";
// import PropTypes from "prop-types";
// import "./InteractiveReader.css";

// const propTypes = {
//   text: PropTypes.string.isRequired,
//   handleTermSelection: PropTypes.func.isRequired,
//   handlePhraseSelection: PropTypes.func.isRequired,
// };

// const InteractiveReader = (props) => {
//   const [selectedText, setSelectedText] = useState("");
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   // const [selectionStart, setSelectionStart] = useState(null);
//   // const [selectionEnd, setSelectionEnd] = useState(null);

//   const handleMouseUp = useCallback((position, paragraph) => {
//     // const selectedText = window.getSelection().toString();
//     // const selectionStart = window.getSelection().anchorOffset;
//     // const selectionEnd = window.getSelection().focusOffset;
//     // const selection = window.getSelection().getRangeAt(0);
//     // const selectionStart = selection.startOffset;
//     // const selectionEnd = selection.endOffset;
//     console.log("here");
//     setSelectedText(window.getSelection().toString());
//     // setSelectionStart(selectionStart);
//     // setSelectionEnd(selectionEnd);

//     // if (selectedText) {
//     //   props.handlePhraseSelection(
//     //     selectedText,
//     //     paragraph,
//     //     position - selectedText.split(" ").length - 1,
//     //     position
//     //   );
//     // }
//   }, []);

//   const handleClick = useCallback((position, word) => {
//     setSelectedPosition(position === selectedPosition ? null : position);
//     setSelectedText(word);
//   }, []);

//   const getWordClassName = (position) => {
//     return selectedPosition && position === selectedPosition
//       ? "word selected"
//       : "word";
//   };

//   const paragraphs = props.text.split("\n");

//   let positionTracker = 0;

//   return (
//     <div className="interactive-reader">
//       <h1>Plato's Symposium</h1>
//       {paragraphs.map((paragraph, paragraphIndex) => {
//         const words = paragraph.split(" ");
//         positionTracker += words.length;
//         return (
//           <p key={paragraphIndex}>
//             {words.map((word, wordIndex) => {
//               const position = positionTracker - words.length + wordIndex + 1;
//               return (
//                 <span
//                   key={position}
//                   className={getWordClassName(position)}
//                   onMouseUp={() => {
//                     handleMouseUp(position, paragraph);
//                   }}
//                   onClick={() => {
//                     handleClick(position, word);
//                     // props.handleTermSelection(word, paragraph, position);
//                   }}
//                 >
//                   {word + " "}
//                 </span>
//               );
//             })}
//           </p>
//         );
//       })}
//     </div>
//   );
// };

// InteractiveReader.propTypes = propTypes;

// export default React.memo(InteractiveReader);
