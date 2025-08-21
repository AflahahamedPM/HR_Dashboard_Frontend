import React from "react";
import Admin from "./Admin";
import { AdminDataProvider } from "../../context/PrivateContentContext";
import useServices from "./hooks/useServices";

const AdminIndex = () => {
  const data = useServices();
  return (
    <AdminDataProvider value={{ ...data }}>
      <Admin />
    </AdminDataProvider>
  );
};

export default AdminIndex;
