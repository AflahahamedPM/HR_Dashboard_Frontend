import { Field } from "@fluentui/react-components";
import React from "react";
import { eyeOpenColor, eyeCloseColor } from "../../../../../image";
import { useAuthData } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";

const LoginFields = () => {
  const { showPassword, setShowPassword, loginForm, setLoginForm, loginUser } =
    useAuthData();

  const handleOnChange = (value, fieldName) => {
    setLoginForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="login-field-container">
      <div className="login-content">
        <p className="welcome-text">Welcome to Dashboard</p>
        <Field label="Email Address" className="field-label" required>
          <input
            className="text-input"
            placeholder="Email Address"
            value={loginForm?.email}
            type="email"
            onChange={(e) => handleOnChange(e.target.value, "email")}
          />
        </Field>

        <Field label="Password" className="field-label" required>
          <div className="password-field">
            <input
              className="text-input"
              placeholder="Password"
              value={loginForm?.password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => handleOnChange(e.target.value, "password")}
            />
            <img
              src={showPassword ? eyeOpenColor : eyeCloseColor}
              alt="toggle password visibility"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </Field>
        <div className="btn-container">
          <button
            disabled={!loginForm?.email || !loginForm?.password}
            className="login-btn"
            style={{
              backgroundColor:
                !loginForm?.email || !loginForm?.password
                  ? "#E5E5E5"
                  : "var(--primary-color)",
            }}
            onClick={loginUser}
          >
            Login
          </button>
        </div>

        <p className="redirect-link">
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "var(--primary-color)" }}>
            Register
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default LoginFields;
