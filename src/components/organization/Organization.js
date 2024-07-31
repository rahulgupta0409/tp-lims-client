import React, { useState } from "react";
import "./Organization.scss";

const Organization = () => {
  const [orgName, setOrgName] = useState("");
  const [orgDetails, setOrgDetails] = useState("");

  const handleOnChange = (param, value) => {
    if (param === "orgName") {
      setOrgName(value);
    }
    if (param === "orgDetails") {
      setOrgDetails(value);
    }
  };
  return (
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
          <button className="submin-org">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default Organization;
