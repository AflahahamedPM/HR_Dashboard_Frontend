import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import { AuthDataProvider } from "../../context/AuthContext";
import useServices from "./hooks/useServices";

const Index = () => {
  const data = useServices();
  return (
    <AuthDataProvider value={{ ...data }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthDataProvider>
  );
};

export default Index;
