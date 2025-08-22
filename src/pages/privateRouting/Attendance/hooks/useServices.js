import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import ConfigAPIURL from "../../../../config/ConfigAPIURL";
import { useNavigate } from "react-router-dom";
import useAlert from "../../../../hooks/useAlert";

const filterFormFields = {
  status: "",
};

const useServices = () => {
  const [filterForm, setFilterForm] = useState(filterFormFields);
  const [keyword, setKeyword] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const navigate = useNavigate();
  const { publishNotification } = useAlert();
  useEffect(() => {}, []);

  const hasData = employeeList.length > 0;

  const headers = [
    {
      key: "srNo",
      label: "Sr No",
      width: hasData ? "80px" : `${100 / 5}%`, // 5 total columns
      height: "50px",
    },
    {
      key: "fullName",
      label: "Employee Name",
      width: hasData ? "150px" : `${100 / 5}%`,
      height: "50px",
    },
    {
      key: "position",
      label: "Position",
      width: hasData ? "150px" : `${100 / 5}%`,
      height: "50px",
    },
    {
      key: "department",
      label: "Department",
      width: hasData ? "150px" : `${100 / 5}%`,
      height: "50px",
    },
    {
      key: "attendanceStatus",
      label: "Status",
      width: hasData ? "120px" : `${100 / 5}%`,
      height: "50px",
    },
  ];

  const statusOptions = [
    "Present",
    "Absent",
    "Medical Leave",
    "Work from Home",
  ];

  useEffect(() => {
    fetchAttendanceList();
  }, [filterForm, keyword]);

  const fetchAttendanceList = async () => {
    try {
      const response = await axiosInstance.post(ConfigAPIURL.listEmployee, {
        ...filterForm,
        keyword,
      });
      if (response?.data?.data?.responseCode === 109) {
        setEmployeeList(response?.data?.data?.result);
      } else if (
        response?.data?.data?.message === "Not authorized, token expired"
      ) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error, "error");
      publishNotification("Error while listing all employees", "error");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axiosInstance.post(
        ConfigAPIURL.updateAttendanceStatus,
        {
          recordId: id,
          status: newStatus,
        }
      );

      if (response?.data?.data?.responseCode === 109) {
        publishNotification("Attendance updated successfully", "success");
        fetchAttendanceList();
      }
    } catch (error) {
      console.log("error - ", error);
      publishNotification("Error while updating the candidate", "error");
    }
  };

  return {
    headers,
    filterForm,
    setFilterForm,
    keyword,
    setKeyword,
    statusOptions,
    updateStatus,
    employeeList,
  };
};

export default useServices;
