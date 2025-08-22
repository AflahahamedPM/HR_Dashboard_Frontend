import React, { useEffect, useState } from "react";
import useAlert from "../../../../hooks/useAlert";
import axiosInstance from "../../../../utils/axiosInstance";
import ConfigAPIURL from "../../../../config/ConfigAPIURL";
import { CheckValidation } from "../../../../utils/checkValidation";
import { useNavigate } from "react-router-dom";

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
  const { publishNotification } = useAlert();
  const [employeeList, setEmployeeList] = useState([]);
  const navigate = useNavigate();
  const headers = [
    { key: "srNo", label: "Sr No", width: "80px", height: "50px" },
    {
      key: "fullName",
      label: "Employee Name",
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
      onClick: (row) => {
        fetchEmployeeDetails(row?._id);
        setEditEmployeeModalOpen(true);
      },
    },
    {
      label: "Delete",
      onClick: (row) => deleteEmployee(row?._id),
    },
  ];

  useEffect(() => {
    listAllEmployees();
  }, [filterForm, keyword]);

  const fetchEmployeeDetails = async (id) => {
    try {
      const response = await axiosInstance.post(ConfigAPIURL.employeeDetails, {
        recordId: id,
      });

      if (response?.data?.data?.responseCode === 109) {
        const employeeDetail = response?.data?.data?.result;
        setEmployeeForm((prev) => ({
          ...prev,
          fullName: employeeDetail?.fullName,
          email: employeeDetail?.email,
          phoneNo: employeeDetail?.phoneNo,
          position: employeeDetail?.position,
          department: employeeDetail?.department,
          dateOfJoin: employeeDetail?.dateOfJoin,
          recordId: employeeDetail?._id,
        }));
      }
    } catch (error) {
      console.log(error, "error");
      publishNotification("Error while fetching employee details", "error");
    }
  };

  const updateEmployee = async () => {
    const employeeFormCopy = { ...employeeForm };
    delete employeeFormCopy?.recordId;

    let missingFields = CheckValidation(employeeFormCopy);

    if (missingFields.length > 0) {
      publishNotification("Please fill all the required fields", "error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !employeeFormCopy?.email ||
      employeeFormCopy.email.length === 0 ||
      !emailPattern.test(employeeFormCopy.email)
    ) {
      publishNotification("Please enter a valid email", "error");
      return;
    }

    if (employeeFormCopy?.phoneNo.length < 10) {
      publishNotification("Mobile no should be 10 digits", "error");
      return;
    }

    const response = await axiosInstance.post(
      ConfigAPIURL.updateEmployee,
      employeeForm
    );

    if (response?.data?.data?.responseCode === 109) {
      publishNotification("Successfully updated employee details", "success");
      setEditEmployeeModalOpen(false);
      setEmployeeForm(employeeFormFields);
      listAllEmployees();
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await axiosInstance.post(ConfigAPIURL.deleteUser, {
        recordId: id,
      });
      if (response?.data?.data?.responseCode === 109) {
        publishNotification("Successfully deleted Employee", "success");
        listAllEmployees();
      }
    } catch (error) {
      console.log(error, "error");
      publishNotification("Error while deleting employee");
    }
  };

  const listAllEmployees = async () => {
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

  return {
    headers,
    actions,
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
    employeeList,
    updateEmployee,
  };
};

export default useServices;
