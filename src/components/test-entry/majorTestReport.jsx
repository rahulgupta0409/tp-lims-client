import React from "react";
import "./majorTestReport.scss";
import TestEntry from "./testEntry";
import Heading from "../headings/Heading";
import { Divider } from "@mui/material";

const MajorTestReport = ({ majorTestName = "Bilrubin" }) => {
  return (
    <div className="major-test-report-main-container">
      <Heading title={`${majorTestName}`} />
      {/* <Divider orientation="horizontal" variant="full-width" /> */}

      <TestEntry />
      <TestEntry />
      <TestEntry />
      <TestEntry />
    </div>
  );
};

export default MajorTestReport;
