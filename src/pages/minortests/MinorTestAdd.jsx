import React, { useState } from "react";
import "./MinorTestAdd.scss";
import Navbars from "../../components/navbar/Nav";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "react-bootstrap";

const MinorTestAdd = () => {
  const [testName, setTestName] = useState("");
  const [testPrice, setTestPrice] = useState(0.0);
  const [remarks, setRemarks] = useState("");
  const token = localStorage.getItem("token");

  const handleOnChange = (param, value) => {
    if (param === "testName") {
      setTestName(value);
    }
    if (param === "testPrice") {
      setTestPrice(parseFloat(value));
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

      <div className="org-container">
        <form className="org-form">
          <h2 className="h2">MINOR TEST ADD</h2>
          <div className="row">
            <div className="label">Test Name</div>
            <input
              className="input"
              name="testName"
              type="text"
              placeholder="Enter test name..."
              value={testName} 
              onChange={(e) => handleOnChange("testName", e.target.value)}
            />
          </div>
          <div className="row">
            <div className="label">Test Price</div>
            <input
              className="input"
              name="testPrice"
              type="number"
              step="0.01" 
              placeholder="Enter test price..."
              value={testPrice} 
              onChange={(e) => handleOnChange("testPrice", e.target.value)}
            />
          </div>
          <div className="row">
            <div className="label">Remarks</div>
            <input
              className="input"
              name="remarks"
              type="text"
              placeholder="Enter remarks..."
              value={remarks} 
              onChange={(e) => handleOnChange("remarks", e.target.value)}
            />
          </div>
          <div className="row">
            <Button className="submit-org" onClick={handleOnClick}>
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MinorTestAdd;
