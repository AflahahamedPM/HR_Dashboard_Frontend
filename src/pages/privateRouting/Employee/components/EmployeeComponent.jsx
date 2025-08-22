import React from "react";
import Toolbar from "../../../../components/Toolbar";
import DataTable from "../../../../components/DataTable";
import { useEmployeeData } from "../../../../context/EmployeeContext";
import DialogModal from "../../../../components/DialogModal";
import { closeIcon } from "../../../../../image";
import EmplyeeForm from "./EmplyeeForm";

const EmployeeComponent = () => {
  const {
    headers,
    employeeList,
    actions,
    positionOptions,
    filterForm,
    setFilterForm,
    setKeyword,
    editEmployeeModalOpen,
    setEditEmployeeModalOpen,
  } = useEmployeeData();

  return (
    <>
      <Toolbar
        positionOptions={positionOptions}
        filter={filterForm}
        setFilter={setFilterForm}
        onSearch={(searchValue) => setKeyword(searchValue)}
      />
      <DataTable columns={headers} data={employeeList} actions={actions} />

      {editEmployeeModalOpen && (
        <DialogModal
          isOpen={editEmployeeModalOpen}
          reset={() => setEditEmployeeModalOpen(false)}
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
                  Edit Employee Details
                </p>
              </div>
              <img
                src={closeIcon}
                height={20}
                width={20}
                alt="closeIcon"
                onClick={() => setEditEmployeeModalOpen(false)}
              />
            </div>
          }
        >
          <EmplyeeForm />
        </DialogModal>
      )}
    </>
  );
};

export default EmployeeComponent;
