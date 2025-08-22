import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useServices = () => {
  const [selectedLeftDrawer, setSelectedLeftDrawer] = useState();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return {
    selectedLeftDrawer,
    setSelectedLeftDrawer,
    openLogoutModal,
    setOpenLogoutModal,
    handleLogout,
  };
};

export default useServices;
