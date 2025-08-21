import React from "react";
import DataTable from "../../../../components/DataTable";
import { useCandidateData } from "../../../../context/CandidateContext";
import Toolbar from "../../../../components/Toolbar";
import DialogModal from "../../../../components/DialogModal";
import { closeIcon } from "../../../../../image";

const CandidateComponent = () => {
  const {
    headers,
    data,
    actions,
    statusOptions,
    updateStatus,
    positionOptions,
    filterForm,
    setFilterForm,
    setKeyword,
    setAddCandidateModalOpen,
    addCandidateModalOpen,
    closeCandidateModalRef,
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
        data={data}
        actions={actions}
        statusOptions={statusOptions}
        updateStatus={updateStatus}
      />

      {addCandidateModalOpen && (
        <DialogModal
          isOpen={addCandidateModalOpen}
          reset={() => setAddCandidateModalOpen(false)}
          hasCloseButton={true}
          ref={closeCandidateModalRef}
          width={"600px"}
          parent={
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <img
                src={closeIcon}
                height={20}
                width={20}
                alt="closeIcon"
                // className={classes.closeIcon}
                onClick={() => setAddCandidateModalOpen(false)}
              />
            </div>
          }
        ></DialogModal>
      )}
    </>
  );
};

export default CandidateComponent;
