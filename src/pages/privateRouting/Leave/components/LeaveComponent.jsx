import React from "react";
import Toolbar from "../../../../components/Toolbar";
import DataTable from "../../../../components/DataTable";
import { useLeaveData } from "../../../../context/LeaveContext";
import DialogModal from "../../../../components/DialogModal";
import { closeIcon } from "../../../../../image";
import LeaveForm from "./LeaveForm";
import LeaveCalender from "./LeaveCalender";

const LeaveComponent = () => {
  const {
    headers,
    statusOptions,
    filterForm,
    setFilterForm,
    setKeyword,
    leaveList,
    setAddLeaveModalOpen,
    addLeaveModalOpen,
    updateLeaveStatus,
  } = useLeaveData();
  return (
    <>
      <Toolbar
        statusOptions={statusOptions}
        filter={filterForm}
        setFilter={setFilterForm}
        onSearch={(searchValue) => setKeyword(searchValue)}
        isLeavePage={true}
        handleAddLeave={() => setAddLeaveModalOpen(true)}
      />
      <div className="table-container">
        <DataTable
          columns={headers}
          data={leaveList}
          isLeavePage={true}
          statusOptions={statusOptions}
          updateStatus={updateLeaveStatus}
        />
        <LeaveCalender />
      </div>

      {addLeaveModalOpen && (
        <DialogModal
          isOpen={addLeaveModalOpen}
          reset={() => setAddLeaveModalOpen(false)}
          width={"600px"}
          parent={
            <div className="leave-modal">
              <div>
                <p className="leave-modal-text">Add New Leave</p>
              </div>
              <img
                src={closeIcon}
                height={20}
                width={20}
                alt="closeIcon"
                onClick={() => setAddLeaveModalOpen(false)}
              />
            </div>
          }
        >
          <LeaveForm />
        </DialogModal>
      )}
    </>
  );
};

export default LeaveComponent;
