import React from "react";
import "./majorTestReport.scss";
import TestEntry from "./testEntry";
import Heading from "../headings/Heading";
import { Divider } from "@mui/material";

const MajorTestReport = ({
  majorTestName = "Bilrubin",
  isMajorLabTest,
  minorLabTestList = [],
}) => {
  return (
    <div className="major-test-report-main-container">
      <Heading title={`${majorTestName}`} />
      {/* <Divider orientation="horizontal" variant="full-width" /> */}
      {isMajorLabTest &&
        minorLabTestList.map((minorLabTest) => <TestEntry {...minorLabTest} />)}
    </div>
  );
};

export default MajorTestReport;
