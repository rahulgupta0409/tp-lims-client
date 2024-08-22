import React, { useState } from "react";
import "./MinorTestAddUpdate.scss";
import Navbars from "../../components/navbar/Nav";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "react-bootstrap";
import { TextField } from "@mui/material";

const MinorTestAddUpdate = (props) => {
  const {
    testName: testN = "",
    testPrice: testP = 0,
    minorTestUnit: testUnit = "",
    remarks: remark = "",
    modalType,
  } = props;
  const [testName, setTestName] = useState(testN);
  const [testPrice, setTestPrice] = useState(testP);
  const [minorTestUnit, setMinorTestUnit] = useState(testUnit);
  const [remarks, setRemarks] = useState(remark);
  const token = localStorage.getItem("token");

  const handleOnChange = (e) => {
    const { name: param, value } = e.target || e;
    if (param === "testName") {
      setTestName(value);
    }
    if (param === "testPrice") {
      setTestPrice(parseFloat(value));
    }
    if (param === "minorTestUnit") {
      setMinorTestUnit(value);
    }
    if (param === "remarks") {
      setRemarks(value);
    }
  };

  const notify = () =>
    toast.success("Added Successfully!", {
      duration: 4000,
      position: "center",
    });

  const handleOnClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8091/v1/minortest/addMinorTest",
        {
          method: "POST",
          body: JSON.stringify({
            testName,
            testPrice,
            minorTestUnit,
            remarks,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data != null) {
        setTestName("");
        setTestPrice("");
        setRemarks("");
        setMinorTestUnit("");
        notify();
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div>
      {/* <Navbars /> */}
      <Toaster />

      <div className="org-form">
        <div className="row">
          <TextField
            label="Test Name"
            name="testName"
            type="text"
            placeholder="Enter test name..."
            id="outlined-start-adornment"
            sx={{ m: 1 }}
            size="normal"
            value={testName}
            onChange={handleOnChange}
          />
        </div>
        <div className="row">
          <TextField
            label="Test Price"
            name="testPrice"
            type="number"
            placeholder="Enter test price..."
            id="outlined-start-adornment"
            sx={{ m: 1 }}
            value={testPrice}
            size="normal"
            onChange={handleOnChange}
          />
        </div>
        <div className="row">
          <TextField
            label="Test Unit"
            name="minorTestUnit"
            type="text"
            placeholder="Enter test unit..."
            id="outlined-start-adornment"
            sx={{ m: 1 }}
            value={minorTestUnit}
            size="normal"
            onChange={handleOnChange}
          />
        </div>
        <div className="row">
          <TextField
            label="Remarks"
            name="remarks"
            value={remarks}
            placeholder="Enter remarks..."
            id="outlined-start-adornment"
            sx={{ m: 1 }}
            size="normal"
            onChange={handleOnChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MinorTestAddUpdate;
