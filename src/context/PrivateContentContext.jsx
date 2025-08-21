import React, { createContext, useContext } from "react";

const PrivateContentContext = createContext();

export const useAdminData = () => useContext(PrivateContentContext);

export const AdminDataProvider = ({ children, value }) => (
  <PrivateContentContext.Provider value={value}>
    {children}
  </PrivateContentContext.Provider>
);
