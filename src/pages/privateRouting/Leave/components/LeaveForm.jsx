import { Button, Dropdown, Option } from "@fluentui/react-components";
import React from "react";
import { useLeaveData } from "../../../../context/LeaveContext";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { ArrowUploadFilled } from "@fluentui/react-icons";
import TextField from "@mui/material/TextField";
import Select from "react-select";

const LeaveForm = () => {
  const {
    setLeaveForm,
    leaveForm,
    applyLeave,
    uploadFile,
    employeeDropdown,
  } = useLeaveData();

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      [...e.target.files].map(async (data) => {
        let formData = new FormData();
        formData.append("docs", data);

        uploadFile(formData);
      });
    }
  };

  const employeeOptions = employeeDropdown.map((emp) => ({
    value: emp._id,
    label: emp.fullName,
    department: emp.department,
  }));

  return (
    <div className="candidate-form">
      <div className="form-grid">
        <Select
          options={employeeOptions}
          value={employeeOptions.find((opt) => opt.value === leaveForm?.userId)}
          onChange={(selected) =>
            setLeaveForm((prev) => ({
              ...prev,
              userId: selected.value,
              department: selected.department,
            }))
          }
          placeholder="Search Employee Name"
          isSearchable
        />
        <TextField
          placeholder="Designation*"
          value={leaveForm?.department}
          disabled
          size="small"
        />
        <DatePicker
          size="small"
          className="datepicker_style"
          minDate={new Date()}
          value={
            leaveForm?.appliedDate
              ? new Date(leaveForm?.appliedDate * 1000)
              : null
          }
          onSelectDate={(e) =>
            setLeaveForm((prev) => ({
              ...prev,
              appliedDate: new Date(e) / 1000,
            }))
          }
          placeholder="Leave Date*"
        />

        <div className="resume-upload">
          <input
            id="docs"
            type="file"
            accept=".pdf"
            onChange={(e) => handleUpload(e)}
            className="resume-input-hidden"
          />
          <label htmlFor="docs" className="resume-label">
            {leaveForm?.docs ? leaveForm?.docs : <span>Documents</span>}
            <ArrowUploadFilled className="upload-icon" />
          </label>
        </div>

        <TextField
          label="Reason*"
          onChange={(e) =>
            setLeaveForm((prev) => ({ ...prev, reason: e.target.value }))
          }
          size="small"
          value={leaveForm?.reason}
        />
      </div>

      <div className="form-actions">
        <Button
          appearance="primary"
          className="save-btn"
          onClick={applyLeave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default LeaveForm;
