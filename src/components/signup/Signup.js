import React, { useState } from "react";
import "./Signup.scss";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassWord] = useState("");

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

  const handleOnClick = async () => {
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
    }).then((res) => res.json());
  };

  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2 className="h2">SIGNUP</h2>
        <div className="row">
          <div className="label">Email</div>
          <input
            className="input"
            name="emailId"
            type="text"
            placeholder="Enter email..."
            onChange={(e) => {
              handleOnChange("emailId", e.target.value);
            }}
          />
        </div>
        <div className="row">
          <div className="label">Username</div>
          <input
            className="input"
            name="userName"
            type="text"
            placeholder="Enter username..."
            onChange={(e) => {
              handleOnChange("userName", e.target.value);
            }}
          />
        </div>
        <div className="row">
          <div className="label">Name</div>
          <input
            className="input"
            name="fullName"
            type="text"
            placeholder="Enter name..."
            onChange={(e) => {
              handleOnChange("fullName", e.target.value);
            }}
          />
        </div>
        <div className="row">
          <div className="label">Password</div>
          <input
            className="input"
            name="password"
            type="text"
            placeholder="Enter password..."
            onChange={(e) => {
              handleOnChange("password", e.target.value);
            }}
          />
        </div>
        <div className="row">
          <button className="submin-signup" onClick={handleOnClick}>
            SIGNUP
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
