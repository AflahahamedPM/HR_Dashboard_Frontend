import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import ConfigAPIURL from "../../../../config/ConfigAPIURL";
import { CheckValidation } from "../../../../utils/checkValidation";
import useAlert from "../../../../hooks/useAlert";
import { useNavigate } from "react-router-dom";

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
  resumeUrl: "",
};

const useServices = () => {
  const [filterForm, setFilterForm] = useState(filterFormFields);
  const [keyword, setKeyword] = useState("");
  const [addCandidateModalOpen, setAddCandidateModalOpen] = useState(false);
  const [candidateForm, setCandidateForm] = useState(candidateFormFields);
  const { publishNotification } = useAlert();
  const [candidateList, setCandidateList] = useState([]);
  const navigate = useNavigate();

  const headers = [
    { key: "srNo", label: "Sr No", width: "80px", height: "50px" },
    {
      key: "fullName",
      label: "Candidate Name",
      width: "150px",
      height: "50px",
    },
    {
      key: "email",
      label: "Email Address",
      width: "150px",
      height: "50px",
    },
    {
      key: "phoneNo",
      label: "Phone Number",
      width: "150px",
      height: "50px",
    },
    { key: "department", label: "Position", width: "120px", height: "50px" },
    { key: "status", label: "Status", width: "130px", height: "50px" },
    { key: "experience", label: "Experience", width: "100px", height: "50px" },
  ];

  const statusOptions = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];

  const positionOptions = ["Designer", "Developer", "HR"];

  const actions = [
    {
      label: "Download Resume",
      onClick: (row) => downloadResume(row?._id),
    },
    {
      label: "Delete Candidate",
      onClick: (row) => deleteCandidate(row?._id),
    },
  ];

  useEffect(() => {
    listAllCandidates();
  }, [filterForm, keyword]);

  const downloadResume = (id) => {
    const filterData = candidateList?.find((list) => list?._id === id);

    if (filterData?.resumeUrl) {
      window.open(filterData.resumeUrl, "_blank");
    } else {
      console.log("Resume not found for this candidate");
    }
  };

  const deleteCandidate = async (id) => {
    try {
      const response = await axiosInstance.post(ConfigAPIURL.deleteUser, {
        recordId: id,
      });
      if (response?.data?.data?.responseCode === 109) {
        publishNotification("Successfully deleted candidate", "success");
        listAllCandidates();
      }
    } catch (error) {
      console.log(error, "error");
      publishNotification("Error while deleting candidate");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      setCandidateForm((prev) => ({
        ...prev,
        status: newStatus,
      }));

      const response = await axiosInstance.post(ConfigAPIURL.updateStatus, {
        recordId: id,
        status: newStatus,
      });

      if (response?.data?.data?.responseCode === 109) {
        publishNotification("Status updated successfully", "success");
        listAllCandidates();
      }
    } catch (error) {
      console.log("error - ", error);
      publishNotification("Error while updating the candidate", "error");
    }
  };

  const listAllCandidates = async () => {
    try {
      const response = await axiosInstance.post(ConfigAPIURL.listCandidate, {
        ...filterForm,
        keyword,
      });
      if (response?.data?.data?.responseCode === 109) {
        setCandidateList(response?.data?.data?.result);
      } else if (
        response?.data?.data?.message === "Not authorized, token expired"
      ) {
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
      publishNotification("Error while fetching data", "error");
    }
  };

  const createCandidate = async () => {
    try {
      let candidateFormCopy = { ...candidateForm };
      delete candidateFormCopy?.resume;

      let missingFields = CheckValidation(candidateFormCopy);
      console.log(missingFields);

      if (missingFields?.length > 0) {
        publishNotification("Please fill all the required fields", "error");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        !candidateFormCopy?.email ||
        candidateFormCopy.email.length === 0 ||
        !emailPattern.test(candidateFormCopy.email)
      ) {
        publishNotification("Please enter a valid email", "error");
        return;
      }

      if (candidateFormCopy?.phoneNo.length < 10) {
        publishNotification("Mobile no should be 10 digits", "error");
        return;
      }

      const response = await axiosInstance.post(
        ConfigAPIURL.createCandidate,
        candidateFormCopy
      );

      if (response?.data?.data?.responseCode === 109) {
        publishNotification("Successfully created candidate", "success");
        setAddCandidateModalOpen(false);
        setCandidateForm(candidateFormFields);
        listAllCandidates();
      }
    } catch (error) {
      console.log("error", error);
      publishNotification("Error while creating candidate", "error");
    }
  };

  const uploadFile = async (data) => {
    try {
      const response = await axiosInstance.post(ConfigAPIURL.upload, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.data?.responseCode === 109) {
        setCandidateForm((prev) => ({
          ...prev,
          resume: response?.data?.data?.fileName,
          resumeUrl: response?.data?.data?.url,
        }));
      } else {
        publishNotification("Error while uploading resume", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    headers,
    actions,
    statusOptions,
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
    uploadFile,
    createCandidate,
    candidateList,
  };
};

export default useServices;
