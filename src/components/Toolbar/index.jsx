import React from "react";
import "./style.css";
import { Button, Input } from "@fluentui/react-components";
import { Search20Regular, Search24Regular } from "@fluentui/react-icons";

const Toolbar = ({
  positionOptions = [],
  statusOptions = [],
  filter,
  setFilter,
  onSearch,
  isCandidatePage,
  handleAddCandidate,
  isLeavePage,
  handleAddLeave,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "12px",
        width: "100%",
      }}
    >
      <div style={{ gap: "12px", display: "flex", alignItems: "center" }}>
        {statusOptions.length > 0 && (
          <select
            value={filter?.status || ""}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                status: e.target.value,
              }))
            }
            style={{
              padding: "8px 22px",
              borderRadius: "45px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          >
            <option disabled value="">
              Status
            </option>
            {statusOptions.map((option, idx) => (
              <option className="custom-option" key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {positionOptions.length > 0 && (
          <select
            value={filter?.position || ""}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                position: e.target.value,
              }))
            }
            style={{
              padding: "8px 22px",
              borderRadius: "45px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          >
            <option disabled value="">
              Position
            </option>
            {positionOptions.map((option, idx) => (
              <option className="custom-option" key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <Input
          placeholder="Search"
          contentBefore={<Search20Regular style={{ color: "#888" }} />}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            borderRadius: "24px",
            border: "1px solid #ccc",
            padding: "4px 12px",
            width: "220px",
            height: "22px",
          }}
        />
        {(isCandidatePage || isLeavePage) && (
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              "&:hover": {
                backgroundColor: "var(--primary-color)",
              },
              textTransform: "none",
              padding: "8px 20px",
              color: "white",
              borderRadius: "40px",
            }}
            onClick={isLeavePage ? handleAddLeave : handleAddCandidate}
          >
            {isLeavePage ? "Add Leave" : "Add Candidate"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
