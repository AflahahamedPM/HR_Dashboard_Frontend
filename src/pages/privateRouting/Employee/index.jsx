import React from "react";
import {
  EmployeeDataProvider,
} from "../../../context/EmployeeContext";
import EmployeeComponent from "./components/EmployeeComponent";
import useServices from "./hooks/useServices";

const Employee = () => {
  const data = useServices();
  return (
    <EmployeeDataProvider value={{ ...data }}>
      <EmployeeComponent />
    </EmployeeDataProvider>
  );
};

export default Employee;
