import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuthData = () => useContext(AuthContext);

export const AuthDataProvider = ({ children, value }) => (
  <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
);
