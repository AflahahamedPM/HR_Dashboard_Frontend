import React from "react";
import useServices from "./hooks/useServices";
import { CandidateDataProvider } from "../../../context/CandidateContext";
import CandidateComponent from "./components/CandidateComponent";

const Candidate = () => {
  const data = useServices();
  return (
    <CandidateDataProvider value={{ ...data }}>
      <CandidateComponent />
    </CandidateDataProvider>
  );
};

export default Candidate;
