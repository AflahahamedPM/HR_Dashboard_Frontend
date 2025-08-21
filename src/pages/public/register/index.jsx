import React from 'react'
import "../style.css";
import LoginImage from "../../../components/LoginImage";
import RegisterFields from './components/RegisterFields';

const Index = () => {
  return (
    <div id="login-container">
      <p className="main-title">HR Made Easy</p>
      <div className="login-content">
        <LoginImage />
        <RegisterFields />
      </div>
    </div>
  )
}

export default Index