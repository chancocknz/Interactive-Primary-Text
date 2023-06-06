import React, { useEffect, useState } from "react";

const Generator = ({ term, commonWords, onDefinitionsGenerated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cachedDefinitions, setCachedDefinitions] = useState({});
  const isCommonWord = term && commonWords.includes(term.toLowerCase());

  const generateDefinitions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: term }),
      });

      if (response.ok) {
        const data = await response.json();

        // Update cache
        setCachedDefinitions({ ...cachedDefinitions, [term]: data.message });

        onDefinitionsGenerated(term, data.message);
      } else {
        setError("Failed to generate definitions.");
      }
    } catch (err) {
      setError("An error occurred while generating definitions.");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // Check if the term already exists in the cache
    if (cachedDefinitions.hasOwnProperty(term)) {
      onDefinitionsGenerated(term, cachedDefinitions[term]);
      setIsLoading(false);
      return;
    }

    if (term && !isCommonWord) {
      generateDefinitions();
    }

    if (isCommonWord) {
      onDefinitionsGenerated(
        term,
        `${term} is a common word so I decided not to waste energy by generating a definition.`
      );
    }
  }, [term]);

  if (isLoading) {
    return <p>Loading definitions...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return null;
};

export default Generator;
