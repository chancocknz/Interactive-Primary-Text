import React, { useEffect, useState, useCallback, useRef } from "react";

const Generator = ({
  term,
  paragraph,
  commonWords,
  onDefinitionsGenerated,
  selectedPosition,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cachedDefinitions, setCachedDefinitions] = useState({});
  const isCommonWord = term && commonWords.includes(term.toLowerCase());
  const isTooLong = term && term.split(" ").length > 100;
  const prevTermRef = useRef(term);
  const prevParagraphRef = useRef(paragraph);
  const cacheKey = `${term}:${selectedPosition}`;

  const generateDefinitions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([term, paragraph]),
      });

      if (response.ok) {
        const data = await response.json();

        // Update cache
        setCachedDefinitions((prevCache) => ({
          ...prevCache,
          [cacheKey]: data.message,
        }));

        onDefinitionsGenerated(term, data.message);
      } else {
        setError("Failed to generate definitions.");
      }
    } catch (err) {
      setError("An error occurred while generating definitions.");
    }
    setIsLoading(false);
  }, [term, paragraph, onDefinitionsGenerated, cacheKey]);

  useEffect(() => {
    const isTermChanged = prevTermRef.current !== term;
    const isParagraphChanged = prevParagraphRef.current !== paragraph;

    if (isTermChanged || isParagraphChanged) {
      prevTermRef.current = term;
      prevParagraphRef.current = paragraph;
    } else {
      return; // No changes, so skip the effect
    }

    // Check if the term already exists in the cache
    if (cachedDefinitions.hasOwnProperty(cacheKey)) {
      onDefinitionsGenerated(term, cachedDefinitions[cacheKey]);
      setIsLoading(false);
      return;
    }

    if (term && !isCommonWord && !isTooLong) {
      generateDefinitions();
    }

    if (isCommonWord) {
      onDefinitionsGenerated(
        term,
        `${term} is a common word so I decided not to waste energy by generating a definition.`
      );
    }
    if (isTooLong) {
      onDefinitionsGenerated(
        term,
        "The passage you have highlighted is over 100 words, try a shorter one."
      );
    }
  }, [
    term,
    paragraph,
    cachedDefinitions,
    generateDefinitions,
    isCommonWord,
    isTooLong,
    onDefinitionsGenerated,
    cacheKey,
  ]);

  if (isLoading) {
    return <p>Loading definitions...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return null;
};

export default React.memo(Generator);
