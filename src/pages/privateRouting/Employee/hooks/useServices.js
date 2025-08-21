import React, { useState } from "react";

const filterFormFields = {
  position: "",
};

const employeeFormFields = {
  fullName: "",
  email: "",
  phoneNo: "",
  position: "",
  department: "",
  dateOfJoin: "",
};

const useServices = () => {
  const [filterForm, setFilterForm] = useState(filterFormFields);
  const [keyword, setKeyword] = useState("");
  const [editEmployeeModalOpen, setEditEmployeeModalOpen] = useState(false);
  const [employeeForm, setEmployeeForm] = useState(employeeFormFields);

  const headers = [
    { key: "srNo", label: "Sr No", width: "80px", height: "50px" },
    {
      key: "employeeName",
      label: "Employee Name",
      width: "150px",
      height: "50px",
    },
    {
      key: "emailAddress",
      label: "Email Address",
      width: "150px",
      height: "50px",
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
      width: "150px",
      height: "50px",
    },
    { key: "position", label: "Position", width: "120px", height: "50px" },
    { key: "department", label: "Department", width: "130px", height: "50px" },
    {
      key: "dateOfJoin",
      label: "Date of Joining",
      width: "100px",
      height: "50px",
    },
  ];

  const positionOptions = [
    "Intern",
    "Full Time",
    "Junior",
    "Senior",
    "Team Lead",
  ];

  const departmentOptions = ["Developer", "Designer", "HR"];

  const actions = [
    {
      label: "Edit",
      onClick: () => setEditEmployeeModalOpen(true),
    },
    {
      label: "Delete",
      onClick: (row) => console.log("Deleting", row.srNo),
    },
  ];

  const [data, setData] = useState([
    {
      srNo: "01",
      employeeName: "Aflah",
      emailAddress: "aflah@gmail.com",
      phoneNumber: "8998977878",
      position: "Senior",
      department: "Developer",
      dateOfJoin: "12/3/2024",
    },
    {
      srNo: "02",
      employeeName: "John Doe",
      emailAddress: "john@gmail.com",
      phoneNumber: "8123456789",
      position: "Junior",
      department: "HR",
      dateOfJoin: "14/2/25",
    },
  ]);

  //   const updateStatus = (srNo, newStatus) => {
  //     setData((prev) =>
  //       prev.map((row) =>
  //         row.srNo === srNo ? { ...row, status: newStatus } : row
  //       )
  //     );
  //   };

  return {
    headers,
    actions,
    data,
    positionOptions,
    filterForm,
    setFilterForm,
    keyword,
    setKeyword,
    editEmployeeModalOpen,
    setEditEmployeeModalOpen,
    employeeForm,
    setEmployeeForm,
    departmentOptions,
  };
};

export default useServices;
