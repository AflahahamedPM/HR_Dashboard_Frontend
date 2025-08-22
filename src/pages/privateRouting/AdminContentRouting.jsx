import { Box, CircularProgress } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Candidate = lazy(() => import("./Candidate"));
const Employee = lazy(() => import("./Employee"));
const Attendance = lazy(() => import("./Attendance"));
const Leave = lazy(() => import("./Leave"));

const AdminContentRouting = () => {
  return (
    <Suspense
      fallback={
        <div className="circular-progress">
          <CircularProgress />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="candidate" replace />} />
        <Route path="candidate" element={<Candidate />} />
        <Route path="employees" element={<Employee />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="leave" element={<Leave />} />
      </Routes>
    </Suspense>
  );
};

export default AdminContentRouting;
