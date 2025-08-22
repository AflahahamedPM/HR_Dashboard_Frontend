import { Dropdown, Option } from "@fluentui/react-components";
import { Button, Checkbox } from "@fluentui/react-components";
import "../style.css";
import { ArrowUploadFilled } from "@fluentui/react-icons";
import { useState } from "react";
import { useCandidateData } from "../../../../context/CandidateContext";
import TextField from "@mui/material/TextField";

const CandidateForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const {
    candidateForm,
    setCandidateForm,
    positionOptions,
    uploadFile,
    createCandidate,
  } = useCandidateData();

  const handleInputChange = (value, fieldName) => {
    setCandidateForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      [...e.target.files].map(async (data) => {
        let formData = new FormData();
        formData.append("resume", data);

        uploadFile(formData);
      });
    }
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
          aria-label="Position*"
          className="input-field"
          onOptionSelect={(e, data) =>
            setCandidateForm((prev) => ({
              ...prev,
              position: data?.optionValue,
            }))
          }
        >
          <div className="postion-options">
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
          <input
            id="resume"
            type="file"
            accept=".pdf"
            onChange={(e) => handleUpload(e)}
            className="resume-input-hidden"
          />
          <label htmlFor="resume" className="resume-label">
            {candidateForm?.resume ? (
              candidateForm?.resume
            ) : (
              <span>Upload Resume*</span>
            )}
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
          onClick={createCandidate}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CandidateForm;
