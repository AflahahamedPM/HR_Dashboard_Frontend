import React from "react";
import "./style.css";
import { useAdminData } from "../../../context/PrivateContentContext";
import {
  AlertBadge24Regular,
  MailUnread24Regular,
} from "@fluentui/react-icons";
import { profilePic } from "../../../../image";

const Topbar = () => {
  const { selectedLeftDrawer } = useAdminData();
  return (
    <div className="top-bar-container">
      <p className="main-text">{selectedLeftDrawer}</p>
      <div className="nav-container">
        <MailUnread24Regular />
        <AlertBadge24Regular />
        <img src={profilePic} width={50} height={50} />
      </div>
    </div>
  );
};

export default Topbar;
