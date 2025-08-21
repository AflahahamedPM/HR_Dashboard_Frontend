import React from "react";
import { loginLogo } from "../../../image";
import "./style.css";
const MainImage = () => {
  return (
    <div className="left-login-side">
      <img src={loginLogo} alt="login-img" width={520} height={284} />
      <p className="main-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </p>
      <p className="sub-text">
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </div>
  );
};

export default MainImage;
