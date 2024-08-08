import React, { useState } from "react";
import "./Organization.scss";
import Navbars from "../../components/navbar/Nav";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "react-bootstrap";
import { Input } from "@mui/material";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

const Organization = () => {
  const [orgName, setOrgName] = useState("");
  const [orgDetails, setOrgDetails] = useState("");
  const token = localStorage.getItem("token");

  const handleOnChange = (param, value) => {
    if (param === "orgName") {
      setOrgName(value);
    }
    if (param === "orgDetails") {
      setOrgDetails(value);
    }
  };

  const notify = () =>
    toast.success("Added Successfully!", {
      duration: 4000,
      position: "top-right",
    });

  const handleOnClick = async (e) => {
    //  e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8091/v1/organization/addOrganization",
        {
          method: "POST",
          body: JSON.stringify({
            orgName,
            orgDetails,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setOrgName("");
      setOrgDetails("");
      if (data != null) {
        notify();
        
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div>
      <Navbars />
      <Toaster />

      <div className="org-container">
        <form className="org-form">
          <h2 className="h2">ORGANIZATION</h2>
          <div className="row">
            <div className="label">Organization Name</div>
            <input
              className="input"
              name="orgName"
              type="text"
              placeholder="Enter organization name..."
              onChange={(e) => {
                handleOnChange("orgName", e.target.value);
              }}
            />
          </div>
          <div className="row">
            <div className="label">Details</div>
            <input
              className="input"
              name="orgDetails"
              type="text"
              placeholder="Enter organization details..."
              onChange={(e) => {
                handleOnChange("orgDetails", e.target.value);
              }}
            />
          </div>
          <div className="row">
            <Button className="submin-org" onClick={handleOnClick}>
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Organization;
