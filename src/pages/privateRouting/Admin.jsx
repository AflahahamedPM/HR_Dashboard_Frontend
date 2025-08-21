import React from "react";
import Topbar from "./Topbar";
import LeftDrawer from "./LeftDrawer";
import AdminContentRouting from "./AdminContentRouting";

const Admin = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "220px", flexShrink: 0 }}>
        <LeftDrawer />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <AdminContentRouting />
      </div>
    </div>
  );
};

export default Admin;
