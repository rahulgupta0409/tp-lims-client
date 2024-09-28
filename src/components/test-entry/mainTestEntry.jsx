import React from "react";
import "./mainTestEntry.scss";
import MajorTestReport from "./majorTestReport";
import TestEntry from "./testEntry";
import TestHeader from "./testHeader";

const MainTestEntry = () => {
  return (
    <>
      <div className="main-test-entry-main-container">
        <TestHeader />
        <div className="content">
          <MajorTestReport />
          <TestEntry />
          <TestEntry />
          <TestEntry />
          <TestEntry />
          <MajorTestReport />
          <TestEntry />
          <TestEntry />
        </div>
      </div>
    </>
  );
};

export default MainTestEntry;
