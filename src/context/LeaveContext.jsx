import React, { createContext, useContext } from "react";

const LeaveContext = createContext();

export const useLeaveData = () => useContext(LeaveContext);

export const LeaveDataProvider = ({ children, value }) => (
  <LeaveContext.Provider value={value}>
    {children}
  </LeaveContext.Provider>
);
