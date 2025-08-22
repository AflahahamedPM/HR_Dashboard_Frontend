import React, { useEffect, useState } from "react";
import useAlert from "../../../../hooks/useAlert";
import axiosInstance from "../../../../utils/axiosInstance";
import ConfigAPIURL from "../../../../config/ConfigAPIURL";
import { CheckValidation } from "../../../../utils/checkValidation";
import { useNavigate } from "react-router-dom";

const filterFormFields = {
  status: "",
};

const leaveFormFields = {
  userId: "",
  appliedDate: "",
  docs: "",
  docsUrl: "",
  reason: "",
};

const useServices = () => {
  const [filterForm, setFilterForm] = useState(filterFormFields);
  const [keyword, setKeyword] = useState("");
  const [leaveForm, setLeaveForm] = useState(leaveFormFields);
  const [leaveList, setLeaveList] = useState([]);
  const [addLeaveModalOpen, setAddLeaveModalOpen] = useState(false);
  const [employeeDropdown, setEmployeeDropdown] = useState([]);
  const { publishNotification } = useAlert();
  const navigate = useNavigate();

  const statusOptions = ["Pending", "Approved", "Rejected"];
  const headers = [
    { key: "srNo", label: "Sr No", width: "50px", },
    {
      key: "name",
      label: "Name",
      width: "120px",
    },
    {
      key: "appliedDate",
      label: "Date",
      width: "120px",
      
    },
    {
      key: "reason",
      label: "Reason",
      width: "120px",
    },
    { key: "status", label: "Status", width: "120px",  },
    { key: "docsUrl", label: "Docs", width: "50px", },
  ];

  const departmentOptions = ["Developer", "Designer", "HR"];

  useEffect(() => {
    if (addLeaveModalOpen) {
      fetchEmployeeDropdown();
    }
  }, [addLeaveModalOpen]);

  useEffect(() => {
    listAllLeaves();
  }, [filterForm, keyword]);

  const listAllLeaves = async () => {
    try {
      const response = await axiosInstance.post(ConfigAPIURL.listLeaves, {
        ...filterForm,
        keyword,
      });
      if (response?.data?.data?.responseCode === 109) {
        setLeaveList(response?.data?.data?.result);
      } else if (
        response?.data?.data?.message === "Not authorized, token expired"
      ) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error, "error");
      publishNotification("Error while fetching leave list", "error");
    }
  };

  const applyLeave = async () => {
    try {
      const leaveFormCopy = { ...leaveForm };

      delete leaveFormCopy.docs;
      delete leaveFormCopy.docsUrl;

      let missingFields = CheckValidation(leaveFormCopy);
      console.log(missingFields);

      if (missingFields?.length > 0) {
        publishNotification("Please fill all the required fields", "error");
        return;
      }

      const response = await axiosInstance.post(
        ConfigAPIURL.applyLeave,
        leaveForm
      );

      if (response?.data?.data?.responseCode === 109) {
        publishNotification("Successfully applied leave", "success");
        setLeaveForm(leaveFormFields);
        setAddLeaveModalOpen(false);
        listAllLeaves();
      } else if (response?.data?.data?.responseCode === 114) {
        publishNotification("Leave Already Exists", "error");
      }
    } catch (error) {
      console.log(error, "error");
      publishNotification("Error while applying leave", "error");
    }
  };

  const fetchEmployeeDropdown = async () => {
    try {
      const response = await axiosInstance.get(ConfigAPIURL.employeeDropdown);
      if (response?.data?.data?.responseCode === 109) {
        setEmployeeDropdown(response?.data?.data?.result);
      }
    } catch (error) {
      console.log(error, "error");
      publishNotification("Error in fetching employee dropdown", "error");
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
        setLeaveForm((prev) => ({
          ...prev,
          docs: response?.data?.data?.fileName,
          docsUrl: response?.data?.data?.url,
        }));
      } else {
        publishNotification("Error while uploading documents", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLeaveStatus = async (recordId, status) => {
    try {
      const response = await axiosInstance.post(
        ConfigAPIURL.updateLeaveStatus,
        { recordId, status }
      );

      if (response?.data?.data?.responseCode === 109) {
        publishNotification("Leave status updated successfully", "success");
        listAllLeaves();
      } else if (response?.data?.data?.responseCode === 108) {
        publishNotification("Selected record not found", "error");
      }
    } catch (error) {
      console.log(error, "error");
      publishNotification("Error while updating status", "error");
    }
  };

  return {
    statusOptions,
    filterForm,
    setFilterForm,
    setKeyword,
    keyword,
    leaveForm,
    setLeaveForm,
    headers,
    leaveList,
    addLeaveModalOpen,
    setAddLeaveModalOpen,
    departmentOptions,
    applyLeave,
    uploadFile,
    employeeDropdown,
    updateLeaveStatus,
  };
};

export default useServices;
