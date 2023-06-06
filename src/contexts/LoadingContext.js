import React, { createContext, useState } from 'react';

// Create the LoadingContext
const LoadingContext = createContext();

// Create a LoadingProvider component
const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // Create the context value
  const contextValue = {
    loading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
