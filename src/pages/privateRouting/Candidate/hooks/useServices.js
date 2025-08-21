import React, { useRef, useState } from "react";

const filterFormFields = {
  status: "",
  position: "",
};

const candidateFormFields = {
  fullName: "",
  email: "",
  phoneNo: "",
  position: "",
  experience: "",
  resume: "",
};

const useServices = () => {
  const [filterForm, setFilterForm] = useState(filterFormFields);
  const [keyword, setKeyword] = useState("");
  const [addCandidateModalOpen, setAddCandidateModalOpen] = useState(false);
  const [candidateForm, setCandidateForm] = useState(candidateFormFields);

  const headers = [
    { key: "srNo", label: "Sr No", width: "80px", height: "50px" },
    {
      key: "candidatesName",
      label: "Candidate Name",
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
    { key: "status", label: "Status", width: "130px", height: "50px" },
    { key: "experience", label: "Experience", width: "100px", height: "50px" },
  ];

  const statusOptions = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];

  const positionOptions = ["Designer", "Developer", "HR"];

  const actions = [
    {
      label: "Download Resume",
      onClick: (row) => console.log("Downloading resume for", row.srNo),
    },
    {
      label: "Delete Candidate",
      onClick: (row) => console.log("Deleting", row.srNo),
    },
  ];

  const [data, setData] = useState([
    {
      srNo: "01",
      candidatesName: "Aflah",
      emailAddress: "aflah@gmail.com",
      phoneNumber: "8998977878",
      position: "MERN Stack Developer",
      status: "New",
      experience: "1+",
    },
    {
      srNo: "02",
      candidatesName: "John Doe",
      emailAddress: "john@gmail.com",
      phoneNumber: "8123456789",
      position: "Backend Developer",
      status: "Scheduled",
      experience: "3+",
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
    actions,
    statusOptions,
    data,
    updateStatus,
    positionOptions,
    filterForm,
    setFilterForm,
    keyword,
    setKeyword,
    addCandidateModalOpen,
    setAddCandidateModalOpen,
    candidateForm,
    setCandidateForm,
  };
};

export default useServices;
