import axios from "axios";
import React, { useState } from "react";
import ConfigAPIURL from "../../../config/ConfigAPIURL";
import axiosInstance from "../../../utils/axiosInstance";
import { CheckValidation } from "../../../utils/checkValidation";
import useAlert from "../../../hooks/useAlert";
import { useNavigate } from "react-router-dom";

let loginFormFields = {
  email: "",
  password: "",
};

let registerFormFields = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const useServices = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginForm, setLoginForm] = useState(loginFormFields);
  const [registerForm, setRegisterForm] = useState(registerFormFields);
  const { publishNotification } = useAlert();
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const missingFields = CheckValidation(registerForm);

      if (missingFields?.length > 0) {
        publishNotification("Please fill all the required fields", "error");
        return;
      }

      if (registerForm?.confirmPassword !== registerForm?.password) {
        publishNotification(
          "Confirm password should be same as of password",
          "error"
        );
        return;
      }
      const response = await axiosInstance.post(
        ConfigAPIURL.registerNewUser,
        registerForm
      );
      if (response?.data?.data?.responseCode === 109) {
        publishNotification("Successfully registered", "success");
        navigate("/login");
      } else if (response?.data?.data?.responseCode === 114) {
        publishNotification("Email already exists", "error");
      }
    } catch (error) {
      console.log(error, "error");
      publishNotification("Error while registering user", "error");
    }
  };

  const loginUser = async () => {
    try {
      const missingFields = CheckValidation(loginForm);

      if (missingFields?.length > 0) {
        publishNotification("Please fill all the required fields", "error");
        return;
      }

      const response = await axiosInstance.post(
        ConfigAPIURL.userLoggin,
        loginForm
      );

      if (response?.data?.data?.responseCode === 109) {
        const authToken = response?.data?.data?.token;
        localStorage.setItem("authToken", authToken);
        navigate("/admin");
      } else if (response?.data?.data?.responseCode === 123) {
        publishNotification("Email doesn't exists", "error");
      } else if (response?.data?.data?.responseCode === 104) {
        publishNotification("Wrong Password", "error");
      }
    } catch (error) {
      console.log(error, "error");
      publishNotification("Error while logging in", "error");
    }
  };
  return {
    showPassword,
    setShowPassword,
    loginForm,
    setLoginForm,
    registerForm,
    setRegisterForm,
    showConfirmPassword,
    setShowConfirmPassword,
    registerUser,
    loginUser,
  };
};

export default useServices;
