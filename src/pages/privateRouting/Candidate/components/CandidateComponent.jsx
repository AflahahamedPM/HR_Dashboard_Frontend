import React from "react";
import DataTable from "../../../../components/DataTable";
import { useCandidateData } from "../../../../context/CandidateContext";
import Toolbar from "../../../../components/Toolbar";
import DialogModal from "../../../../components/DialogModal";
import { closeIcon } from "../../../../../image";
import CandidateForm from "./CandidateForm";

const CandidateComponent = () => {
  const {
    headers,
    candidateList,
    actions,
    statusOptions,
    updateStatus,
    positionOptions,
    filterForm,
    setFilterForm,
    setKeyword,
    setAddCandidateModalOpen,
    addCandidateModalOpen,
  } = useCandidateData();
  return (
    <>
      <Toolbar
        positionOptions={positionOptions}
        statusOptions={statusOptions}
        filter={filterForm}
        setFilter={setFilterForm}
        onSearch={(searchValue) => setKeyword(searchValue)}
        isCandidatePage={true}
        handleAddCandidate={() => setAddCandidateModalOpen(true)}
      />
      <DataTable
        columns={headers}
        data={candidateList}
        actions={actions}
        statusOptions={statusOptions}
        updateStatus={updateStatus}
        isCandidatePage={true}
      />

      {addCandidateModalOpen && (
        <DialogModal
          isOpen={addCandidateModalOpen}
          reset={() => setAddCandidateModalOpen(false)}
          width={"600px"}
          parent={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "2px",
                backgroundColor: "var(--primary-color)",
                marginTop: "-56px",
                marginLeft: "-24px",
                width: "596px",
              }}
            >
              <div>
                <p style={{ marginLeft: "10px", color: "white" }}>
                  Add Candidate
                </p>
              </div>
              <img
                src={closeIcon}
                height={20}
                width={20}
                alt="closeIcon"
                onClick={() => setAddCandidateModalOpen(false)}
              />
            </div>
          }
        >
          <CandidateForm />
        </DialogModal>
      )}
    </>
  );
};

export default CandidateComponent;
