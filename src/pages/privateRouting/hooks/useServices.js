import React, { useState } from "react";

const useServices = () => {
  const [selectedLeftDrawer, setSelectedLeftDrawer] = useState();
  return {
    selectedLeftDrawer,
    setSelectedLeftDrawer,
  };
};

export default useServices;
