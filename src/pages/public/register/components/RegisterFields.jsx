import React from "react";
import { useAuthData } from "../../../../context/AuthContext";
import { Field } from "@fluentui/react-components";
import { eyeCloseColor, eyeOpenColor } from "../../../../../image";
import { Link } from "react-router-dom";

const RegisterFields = () => {
  const {
    registerForm,
    setRegisterForm,
    showConfirmPassword,
    setShowConfirmPassword,
    showPassword,
    setShowPassword,
    registerUser,
  } = useAuthData();

  const handleOnChange = (value, fieldName) => {
    setRegisterForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  return (
    <div className="login-field-container">
      <div className="login-content">
        <p className="welcome-text">Welcome to Dashboard</p>
        <Field label="Full Name" className="field-label" required>
          <input
            className="text-input"
            placeholder="Full Name"
            value={registerForm?.fullName}
            type="email"
            onChange={(e) => handleOnChange(e.target.value, "fullName")}
          />
        </Field>
        <Field label="Email Address" className="field-label" required>
          <input
            className="text-input"
            placeholder="Email Address"
            value={registerForm?.email}
            type="email"
            onChange={(e) => handleOnChange(e.target.value, "email")}
          />
        </Field>

        <Field label="Password" className="field-label" required>
          <div className="password-field">
            <input
              className="text-input"
              placeholder="Password"
              value={registerForm?.password}
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

        <Field label="Confirm Password" className="field-label" required>
          <div className="password-field">
            <input
              className="text-input"
              placeholder="Confirm Password"
              value={registerForm?.confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              onChange={(e) =>
                handleOnChange(e.target.value, "confirmPassword")
              }
            />
            <img
              src={showConfirmPassword ? eyeOpenColor : eyeCloseColor}
              alt="toggle password visibility"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
        </Field>

        <div className="btn-container">
          <button
            className="login-btn"
            style={{
              backgroundColor: "var(--primary-color)",
            }}
            onClick={registerUser}
          >
            Register
          </button>
        </div>

        <p className="redirect-link">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--primary-color)" }}>
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default RegisterFields;
