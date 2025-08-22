import React from "react";
import TextField from "@mui/material/TextField";
import "../style.css";
import { useEmployeeData } from "../../../../context/EmployeeContext";
import { Button, Dropdown, Option } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";

const EmplyeeForm = () => {
  const {
    employeeForm,
    setEmployeeForm,
    positionOptions,
    departmentOptions,
    updateEmployee,
  } = useEmployeeData();
  const handleInputChange = (value, fieldName) => {
    setEmployeeForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="employee-form">
      <div className="form-grid">
        <TextField
          label="Full Name*"
          size="small"
          onChange={(e) => handleInputChange(e.target.value, "fullName")}
          value={employeeForm?.fullName}
        />

        <TextField
          label="Email Address*"
          onChange={(e) => handleInputChange(e.target.value, "email")}
          size="small"
          value={employeeForm?.email}
        />

        <TextField
          label="Phone Number*"
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value) && value.length <= 10) {
              handleInputChange(value, "phoneNo");
            }
          }}
          size="small"
          value={employeeForm?.phoneNo}
        />

        <Dropdown
          appearance="outline"
          placeholder="Department*"
          className="input-field"
          onOptionSelect={(e, data) =>
            setEmployeeForm((prev) => ({
              ...prev,
              department: data?.optionValue,
            }))
          }
          value={employeeForm?.department}
        >
          <div
            style={{
              padding: "6px",
              border: "1px solid #E5E5E5",
              backgroundColor: "#fff",
            }}
          >
            {departmentOptions?.map((option) => (
              <Option value={option}>{option}</Option>
            ))}
          </div>
        </Dropdown>

        <Dropdown
          appearance="outline"
          placeholder="Position*"
          className="input-field"
          onOptionSelect={(e, data) =>
            setEmployeeForm((prev) => ({
              ...prev,
              position: data?.optionValue,
            }))
          }
          value={employeeForm?.position}
        >
          <div
            style={{
              padding: "6px",
              border: "1px solid #E5E5E5",
              backgroundColor: "#fff",
            }}
          >
            {positionOptions?.map((option) => (
              <Option value={option}>{option}</Option>
            ))}
          </div>
        </Dropdown>

        <DatePicker
          size="small"
          className="datepicker_style"
          value={
            employeeForm?.dateOfJoin
              ? new Date(employeeForm?.dateOfJoin * 1000)
              : null
          }
          onSelectDate={(e) =>
            setEmployeeForm((prev) => ({
              ...prev,
              dateOfJoin: new Date(e) / 1000,
            }))
          }
          placeholder="Date of Joining*"
        />
      </div>
      <div className="form-actions">
        <Button
          appearance="primary"
          style={{
            padding: "8px 30px",
            borderRadius: "50px",
            backgroundColor: "var(--primary-color)",
            color: "white",
          }}
          onClick={updateEmployee}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EmplyeeForm;
