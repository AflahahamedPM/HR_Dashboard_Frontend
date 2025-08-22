import React from "react";
import Toolbar from "../../../../components/Toolbar";
import DataTable from "../../../../components/DataTable";
import { useAttendanceData } from "../../../../context/AttendanceContext";

const AttendanceComponent = () => {
  const {
    statusOptions,
    filterForm,
    setFilterForm,
    setKeyword,
    headers,
    data,
    updateStatus,
    employeeList
  } = useAttendanceData();
  return (
    <>
      <Toolbar
        statusOptions={statusOptions}
        filter={filterForm}
        setFilter={setFilterForm}
        onSearch={(searchValue) => setKeyword(searchValue)}
      />
      <DataTable
        columns={headers}
        data={employeeList}
        statusOptions={statusOptions}
        updateStatus={updateStatus}
      />
    </>
  );
};

export default AttendanceComponent;
