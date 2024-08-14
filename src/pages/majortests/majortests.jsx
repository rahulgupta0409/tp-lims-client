import React, { useState } from "react";
import "./majortests.scss"

const Majortests = () => {
  const [majorTests, setMajorTests] = useState({
    majorTestName: "",
    minorLabTestList: [],
    majorTestPrice: 0.0,
    majorTestRemarks: "",
  });


  const handleOnChange = (param, value) => {
    setMajorTests(prevState => ({
      ...prevState,
      [param]: param === 'majorTestPrice' ? parseFloat(value) : value
    }));
    // console.log(majorTests)
  };

  return (
    <div>
      <div className="majortest-container">
        <form className="majortest-form">
          <h2 className="h2">ADD MAJOR TEST</h2>
          <div className="row">
            <div className="label">Test Name</div>
            <input
              className="input"
              name="majorTestName"
              type="text"
              placeholder="Enter test name..."
              onChange={(e) => {
                handleOnChange("majorTestName", e.target.value);
              }}
            />
          </div>
          <div className="row">
            <div className="label">TestPrice</div>
            <input
              className="input"
              name="majorTestPrice"
              type="text"
              placeholder="Enter test price..."
              onChange={(e) => {
                handleOnChange("majorTestPrice", e.target.value);
              }}
            />
          </div>
          <div className="row">
            <div className="label">Remarks</div>
            <input
              className="input"
              name="majorTestRemarks"
              type="text"
              placeholder="Enter test remarks..."
              onChange={(e) => {
                handleOnChange("majorTestRemarks", e.target.value);
              }}
            />
          </div>
          <div className="row">
            <button
              className="submin-majortest"
              type="submit"
              // onClick={handleOnClick}
            >
              ADD
            </button>
          </div>
        
        </form>
      </div>
    </div>
  )
};

export default Majortests;
