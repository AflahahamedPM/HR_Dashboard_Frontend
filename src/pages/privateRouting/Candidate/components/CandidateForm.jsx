import { Dropdown, Option } from "@fluentui/react-components";
import { Button, Checkbox } from "@fluentui/react-components";
import "../style.css";
import { ArrowUploadFilled } from "@fluentui/react-icons";
import { useState } from "react";
import { useCandidateData } from "../../../../context/CandidateContext";
import TextField from "@mui/material/TextField";

const CandidateForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { candidateForm, setCandidateForm, positionOptions } =
    useCandidateData();

  const handleInputChange = (value, fieldName) => {
    setCandidateForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  return (
    <div className="candidate-form">
      <div className="form-grid">
        <TextField
          label="Full Name*"
          size="small"
          onChange={(e) => handleInputChange(e.target.value, "fullName")}
          value={candidateForm?.fullName}
        />
        <TextField
          label="Email Address*"
          onChange={(e) => handleInputChange(e.target.value, "email")}
          size="small"
          value={candidateForm?.email}
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
          value={candidateForm?.phoneNo}
        />
        <Dropdown
          appearance="outline"
          placeholder="Position*"
          className="input-field"
          onOptionSelect={(e, data) =>
            setCandidateForm((prev) => ({
              ...prev,
              position: data?.optionValue,
            }))
          }
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
        <TextField
          label="Experience*"
          size="small"
          onChange={(e) => {
            handleInputChange(e.target.value, "experience");
          }}
          value={candidateForm?.experience}
        />

        <div className="resume-upload">
          <input id="resume" type="file" className="resume-input-hidden" />
          <label htmlFor="resume" className="resume-label">
            <span>Upload Resume*</span>
            <ArrowUploadFilled className="upload-icon" />
          </label>
        </div>
      </div>

      <div className="form-checkbox">
        <Checkbox
          checked={isChecked}
          onChange={(e, data) => setIsChecked(data.checked)}
        />
        <span>
          I hereby declare that the above information is true to the best of my
          knowledge and belief
        </span>
      </div>

      <div className="form-actions">
        <Button
          appearance="primary"
          disabled={!isChecked}
          style={{
            padding: "8px 30px",
            borderRadius: "50px",
            backgroundColor: isChecked ? "var(--primary-color)" : "#E5E5E5",
            color: "white",
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CandidateForm;
