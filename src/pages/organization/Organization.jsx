import React, { useRef, useState } from "react";
import Navbars from "../../components/navbar/Nav";
import toast, { Toaster } from "react-hot-toast";
import "./Organization.scss";
import Container from "../../components/container/Container";
import Input from "../../components/input/Input";
import BasicButton from "../../components/buttons/BasicButton";
import Heading from "../../components/headings/Heading";

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
      position: "bottom-right",
    });

  const handleAddOrgOnClick = async (e) => {
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
        handleReset();
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
        <div ref={formRef} className="org-form">
          <div className="row">
            <Heading
              title="Register Organization"
              subtitle="Org makes thing happen!"
              center
            />
          </div>
          <hr />

          <div className="row">
            <Input
              id="orgName"
              label="Organization Name"
              value={orgName}
              onChange={(e) => {
                handleOnChange("orgName", e.target.value);
              }}
            />
          </div>
          <div className="row">
            <Input
              id="orgDetails"
              label="Details"
              value={orgDetails}
              onChange={(e) => {
                handleOnChange("orgDetails", e.target.value);
              }}
            />
          </div>
          <hr />
          <div className="row">
            <BasicButton onClick={handleAddOrgOnClick} label="ADD ORG" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organization;
