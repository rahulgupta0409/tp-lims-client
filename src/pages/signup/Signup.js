import React, { useState } from "react";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";
import { Button, LinearProgress, LinearProgressWithLabel } from "@mui/material";
import Logo from "../../images/Tilak_Pathology_PNG_Logo-removebg.png";
import Heading from "../../components/headings/Heading";
import Modal from "../../components/modals/Modals";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpModal, setIsOtpModal] = useState(false);
  const [otp, setOtp] = useState(0);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const handleValidateClick = async (e) => {
    // e.preventDefault();
    let data;
    const { userId, emailId, username, fullName, password, roles } = userData;
    const response = await fetch(
      `http://localhost:8091/v1/auth/validateOtp?otp=${otp}`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    data = await response.json();
    if (data != null) {
      setIsOtpModal(false);
      if (data.fullName != null) {
        navigate("/");
      }
    }
    console.log("data", data);
  };

  if (isOtpModal) {
    return (
      <>
        <Modal
          isOpen={isOtpModal}
          onClose={() => setIsOtpModal(!isOtpModal)}
          title={`OTP`}
          secondaryAction={`submit`}
          secondaryActionLabel={`submit`}
          // onClose={setIsOtpModal(false)}
          body={
            <>
              {/* <div
                style={{
                  fontFamily: "Product Sans",
                  fontWeight: "600",
                  fontSize: "24px",
                }}
              >
                OTP
              </div> */}
              <input
                style={{
                  outline: "none",
                  width: "50%",
                  marginBottom: "40px",
                  marginTop: "20px",
                  border: "1px solid #ddd",
                  boxShadow: "0 0 5px 2px #cfd9df",
                  padding: "12px 16px",
                  borderRadius: "6px",
                }}
                name="otp"
                type="text"
                placeholder="Enter the OTP..."
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />

              <div>
                <button
                  style={{
                    width: "50%",
                    border: "1px black",
                    backgroundColor: "#007bff",
                    borderRadius: "10px",
                    // margin: "10px",
                    padding: "12px 16px",
                  }}
                  onClick={handleValidateClick}
                >
                  Submit
                </button>
              </div>
            </>
          }
        ></Modal>
      </>
    );
  }

  const handleOnChange = (param, value) => {
    if (param === "emailId") {
      setEmailId(value);
    }
    if (param === "username") {
      setUsername(value);
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
    // e.preventDefault();
    let data;
    const response = await fetch("http://localhost:8091/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        emailId,
        username,
        fullName,
        password,
        confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    data = await response.json();
    console.log("data", data);
    setUserData(data);
    setEmailId("");
    setUsername("");
    setFullName("");
    setPassWord("");
    setConfirmPassword("");
    setIsOtpModal(true);
  };

  return (
    <>
      <LinearProgress variant="determinate" value={62} />
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
              name="username"
              type="text"
              placeholder="Enter username..."
              value={username}
              onChange={(e) => {
                handleOnChange("username", e.target.value);
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
            >{`Already have an account? `}</div>
            <button
              style={{
                background: "none",
                color: "blue",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Product Sans",
                fontSize: "small",
                borderRadius: "30px",
                fontVariant: "normal",
                marginLeft: "3px",
              }}
              onClick={() => navigate("/")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
