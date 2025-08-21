import React from "react";
import "../style.css";
import LoginImage from "../../../components/LoginImage";
import LoginFields from "./components/LoginFields";

const Index = () => {
  return (
    <div id="login-container">
      <p className="main-title">HR Made Easy</p>
      <div className="login-content">
        <LoginImage />
        <LoginFields />
      </div>
    </div>
  );
};

export default Index;
