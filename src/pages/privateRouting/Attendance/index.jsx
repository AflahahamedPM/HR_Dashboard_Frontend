import React from "react";
import { AttendanceDataProvider } from "../../../context/AttendanceContext";
import useServices from "./hooks/useServices";
import AttendanceComponent from "./components/AttendanceComponent";

const Attendance = () => {
  const data = useServices();
  return (
    <AttendanceDataProvider value={{ ...data }}>
      <AttendanceComponent />
    </AttendanceDataProvider>
  );
};

export default Attendance;
