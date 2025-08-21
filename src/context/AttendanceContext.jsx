import React, { createContext, useContext } from "react";

const AttendanceContext = createContext();

export const useAttendanceData = () => useContext(AttendanceContext);

export const AttendanceDataProvider = ({ children, value }) => (
  <AttendanceContext.Provider value={value}>
    {children}
  </AttendanceContext.Provider>
);
