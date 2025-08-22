import React from "react";
import Admin from "./Admin";
import { AdminDataProvider } from "../../context/PrivateContentContext";
import useServices from "./hooks/useServices";
import "./style.css";

const AdminIndex = () => {
  const data = useServices();
  return (
    <AdminDataProvider value={{ ...data }}>
      <Admin />
    </AdminDataProvider>
  );
};

export default AdminIndex;
