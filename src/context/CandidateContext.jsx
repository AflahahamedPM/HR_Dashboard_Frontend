import React, { createContext, useContext } from "react";

const CandidateContext = createContext();

export const useCandidateData = () => useContext(CandidateContext);

export const CandidateDataProvider = ({ children, value }) => (
  <CandidateContext.Provider value={value}>
    {children}
  </CandidateContext.Provider>
);
