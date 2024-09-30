import React, { useState } from "react";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Logo from "../../images/Tilak_Pathology_PNG_Logo-removebg.png";
import Heading from "../../components/headings/Heading";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    if (param === "confirmPassword") {
      setConfirmPassword(value);
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
        confirmPassword,
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
        setConfirmPassword("");
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div style={{ display: "flex", gap: "4px" }}>
          <Heading
            title="Welcome to Tilak"
            subtitle="Please create an account from here!"
            center
          />
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
        <div className="signup-row">
          <div className="signup-label">Email</div>
          <input
            className="signup-input"
            name="emailId"
            type="email"
            placeholder="Enter email..."
            value={emailId}
            onChange={(e) => {
              handleOnChange("emailId", e.target.value);
            }}
          />
        </div>
        <div className="signup-row">
          <div className="signup-label">Username</div>
          <input
            className="signup-input"
            name="userName"
            type="text"
            placeholder="Enter username..."
            value={userName}
            onChange={(e) => {
              handleOnChange("userName", e.target.value);
            }}
          />
        </div>
        <div className="signup-row">
          <div className="signup-label">Full Name</div>
          <input
            className="signup-input"
            name="fullName"
            type="text"
            placeholder="Enter name..."
            value={fullName}
            onChange={(e) => {
              handleOnChange("fullName", e.target.value);
            }}
          />
        </div>
        <div className="signup-row">
          <div className="signup-label">Password</div>
          <input
            className="signup-input"
            name="password"
            type="text"
            placeholder="Choose a password..."
            value={password}
            onChange={(e) => {
              handleOnChange("password", e.target.value);
            }}
          />
        </div>
        <div className="signup-row">
          <div className="signup-label">Confirm Password</div>
          <input
            className="signup-input"
            name="confirmPassword"
            type="text"
            placeholder="Confirm Password..."
            value={confirmPassword}
            onChange={(e) => {
              handleOnChange("confirmPassword", e.target.value);
            }}
          />
        </div>
        <div className="signup-row">
          <Button className="submin-signup" onClick={handleOnClick}>
            SIGNUP
          </Button>
        </div>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "start",
            marginTop: "10px",
          }}
        >
          <Button onClick={() => navigate("/")}>Already have an account</Button>
        </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            width: "100%",
          }}
        >
          <div
            style={{ fontFamily: "Product Sans" }}
          >{`Already have an account?`}</div>
          <Button
            sx={{
              background: "none",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Product Sans",
              fontSize: "small",
              borderRadius: "30px",
              fontVariant: "normal",
            }}
            onClick={() => navigate("/")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
