import React from "react";
import "./mainTestEntry.scss";
import MajorTestReport from "./majorTestReport";
import TestEntry from "./testEntry";
import TestHeader from "./testHeader";
import Navbars from "../navbar/Nav";
import Search from "../search/search";
import { useLocation } from "react-router-dom";

const MainTestEntry = () => {
  const location = useLocation();
  const { patient } = location.state || {};
  console.log("patient", patient);
  return (
    <>
      <Navbars />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <div>
          <Search />
        </div>
      </div>

      <div className="main-test-entry-main-container">
        <TestHeader />

        <div className="content">
          {/* <MajorTestReport />
          <TestEntry />
          <TestEntry />
          <TestEntry />
          <TestEntry />
          <MajorTestReport />
          <TestEntry />
          <TestEntry /> */}
          {patient.tests.map((test) => {
            if (test.isMajorLabTest) {
              <MajorTestReport majorTestName={test.testName} />;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default MainTestEntry;
