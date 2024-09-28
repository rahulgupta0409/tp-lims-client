import React from "react";
import "./majorTestReport.scss";
import TestEntry from "./testEntry";
import Heading from "../headings/Heading";

const MajorTestReport = ({ majorTestName = "Bilrubin" }) => {
  return (
    <div className="major-test-report-main-container">
      <Heading title={`${majorTestName}`} />

      <TestEntry />
      <TestEntry />
      <TestEntry />
      <TestEntry />
    </div>
  );
};

export default MajorTestReport;
