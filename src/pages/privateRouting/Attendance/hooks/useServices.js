import React, { useState } from "react";

const filterFormFields = {
  status: "",
};

const useServices = () => {
  const [filterForm, setFilterForm] = useState(filterFormFields);
  const [keyword, setKeyword] = useState("");

  const headers = [
    {
      key: "employeeName",
      label: "Employee Name",
      width: "150px",
      height: "50px",
    },
    {
      key: "position",
      label: "Position",
      width: "150px",
      height: "50px",
    },
    {
      key: "department",
      label: "Department",
      width: "150px",
      height: "50px",
    },
    { key: "status", label: "Status", width: "120px", height: "50px" },
  ];

  const statusOptions = [
    "Present",
    "Absent",
    "Medical Leave",
    "Work from Home",
  ];

  const [data, setData] = useState([
    {
      srNo: "01",
      employeeName: "Aflah",
      position: "Intern",
      status: "Absent",
      department: "Developer",
    },
    {
      srNo: "02",
      employeeName: "John Doe",
      position: "Junior",
      department: "HR",
      status: "Present",
    },
  ]);

  const updateStatus = (srNo, newStatus) => {
    setData((prev) =>
      prev.map((row) =>
        row.srNo === srNo ? { ...row, status: newStatus } : row
      )
    );
  };

  return {
    headers,
    data,
    filterForm,
    setFilterForm,
    keyword,
    setKeyword,
    statusOptions,
    updateStatus,
  };
};

export default useServices;
