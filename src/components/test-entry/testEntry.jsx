import React from "react";
import "./testEntry.scss";

import TestInput from "./testInput";

const TestEntry = ({
  idx = 1,
  testName,
  value,
  range = "20-30",
  state = "This is a test for the patient where patient have to be very carefull. The test should be done in doctor's precriptions. Please make sure doctor will see at the time to sampling",
  unit,
  onDragStart,
  onClick,
  isAdmin = false,
  patientId,
  testId,
}) => {
  return (
    <div className="test-entry-container" key={idx}>
      <div className="test-entry-testName">{testName}</div>
      <div className="test-entry-value">
        <TestInput initialState={value} patientId={patientId} testId={testId} />
      </div>
      {isAdmin === false ? (
        <>
          <div className="test-entry-range">
            <TestInput
              initialState={`${range} in unit ${unit ? unit : ""}`}
              disabled={true}
            />
          </div>
          <div className="test-entry-remarks">
            <TestInput initialState={state} disabled={true} />
          </div>
        </>
      ) : (
        <>
          <div className="test-entry-range">
            <TestInput initialState={`${range} in unit ${unit}`} />
          </div>
          <div className="test-entry-remarks">
            <TestInput initialState={state} />
          </div>
        </>
      )}
    </div>
  );
};

export default TestEntry;
