import React from "react";
import useServices from "./hooks/useServices";
import { LeaveDataProvider } from "../../../context/LeaveContext";
import LeaveComponent from "./components/LeaveComponent";
import "./style.css"

const Leave = () => {
  const data = useServices();
  return (
    <LeaveDataProvider value={data}>
      <LeaveComponent />
    </LeaveDataProvider>
  );
};

export default Leave;
