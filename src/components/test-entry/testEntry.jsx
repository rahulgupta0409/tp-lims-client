import React from "react";
import "./testEntry.scss";

import TestInput from "./testInput";

const TestEntry = ({
  idx = 1,
  name = "CBC",
  value = 20,
  range = "20-30",
  state = "This is a test for the patient where patient have to be very carefull. The test should be done in doctor's precriptions. Please make sure doctor will see at the time to sampling",
  unit = "mm",
  onDragStart,
  onClick,
  isAdmin = false,
}) => {
  return (
    <div className="test-entry-container" key={idx}>
      <div className="test-entry-name">{name}</div>
      <div className="test-entry-value">
        <TestInput initialState={value} />
      </div>
      {isAdmin === false ? (
        <>
          <div className="test-entry-range">
            <TestInput
              initialState={`${range} in unit ${unit}`}
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
