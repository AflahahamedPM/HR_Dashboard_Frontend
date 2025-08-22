import React from "react";
import Topbar from "./Topbar";
import LeftDrawer from "./LeftDrawer";
import AdminContentRouting from "./AdminContentRouting";

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="left-drawer-container">
        <LeftDrawer />
      </div>

      <div className="admin-content">
        <Topbar />
        <AdminContentRouting />
      </div>
    </div>
  );
};

export default Admin;
