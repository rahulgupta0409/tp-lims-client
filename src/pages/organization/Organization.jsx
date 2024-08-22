import React, { useRef, useState } from "react";
import Navbars from "../../components/navbar/Nav";
import toast, { Toaster } from "react-hot-toast";
import "./Organization.scss";

const Organization = () => {
  const [orgName, setOrgName] = useState("");
  const [orgDetails, setOrgDetails] = useState("");
  const token = localStorage.getItem("token");

  const formRef = useRef(null);

  const handleOnChange = (param, value) => {
    if (param === "orgName") {
      setOrgName(value);
    }
    if (param === "orgDetails") {
      setOrgDetails(value);
    }
  };

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const notify = () =>
    toast.success("Added Successfully!", {
      duration: 4000,
      position: "top-right",
    });

  const handleOnClick = async (e) => {
    e.preventDefault();
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
      handleReset();
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
        <form ref={formRef} className="org-form" onSubmit={handleOnClick}>
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
            <button
              className="submin-majortest"
              type="submit"
              //onClick={handleOnClick}
            >
              ADD ORG
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Organization;
