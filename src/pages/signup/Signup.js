import React, { useState } from "react";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Logo from "../../images/Tilak_Pathology_PNG_Logo-removebg.png";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassWord] = useState("");

  const navigate = useNavigate();

  const handleOnChange = (param, value) => {
    if (param === "emailId") {
      setEmailId(value);
    }
    if (param === "userName") {
      setUserName(value);
    }
    if (param === "fullName") {
      setFullName(value);
    }
    if (param === "password") {
      setPassWord(value);
    }
  };

  const handleOnClick = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8091/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        emailId,
        userName,
        fullName,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setEmailId("");
        setUserName("");
        setFullName("");
        setPassWord("");
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form">
        <div style={{ display: "flex" }}>
          <h3 className="h2" style={{ fontSmooth: "#1A2027" }}>
            SIGNUP
          </h3>
          <img
            src={Logo}
            style={{
              width: "60px",
              height: "60px",
              marginLeft: "10px",
            }}
            alt="Logo"
          />
        </div>
        <div className="row">
          <div style={{ fontSize: "18px" }}>Email</div>
          <input
            className="input"
            name="emailId"
            type="email"
            placeholder="Enter email..."
            value={emailId}
            onChange={(e) => {
              handleOnChange("emailId", e.target.value);
            }}
          />
        </div>
        <div className="row">
          <div style={{ fontSize: "18px" }}>Username</div>
          <input
            className="input"
            name="userName"
            type="text"
            placeholder="Enter username..."
            value={userName}
            onChange={(e) => {
              handleOnChange("userName", e.target.value);
            }}
          />
        </div>
        <div className="row">
          <div style={{ fontSize: "18px" }}>Full Name</div>
          <input
            className="input"
            name="fullName"
            type="text"
            placeholder="Enter name..."
            value={fullName}
            onChange={(e) => {
              handleOnChange("fullName", e.target.value);
            }}
          />
        </div>
        <div className="row">
          <div style={{ fontSize: "18px" }}>Password</div>
          <input
            className="input"
            name="password"
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => {
              handleOnChange("password", e.target.value);
            }}
          />
        </div>
        <div className="row">
          <Button className="submin-signup" onClick={handleOnClick}>
            SIGNUP
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            marginTop: "10px",
          }}
        >
          <Button onClick={() => navigate("/")}>Already have an account</Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
