import React, { createContext, useContext } from "react";

const EmployeeContext = createContext();

export const useEmployeeData = () => useContext(EmployeeContext);

export const EmployeeDataProvider = ({ children, value }) => (
  <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
);
