import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleOnChange = (param, value) => {
    if (param === "userName") {
      setUserName(value);
    }
    if (param === "password") {
      setPassword(value);
    }
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8091/v1/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          userName,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("loginSuccess", "true");
        setUserName("");
        setPassword("");
        navigate("/home");
      } else {
        console.error("Login failed: No token received");
      }
      // if (response.status != 200) {
      //   return <div>"error"</div>;
      // }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div>
      <div className="login-container">
        <form className="login-form">
          <h2 className="h2">LOGIN</h2>
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
            <button
              className="submin-login"
              type="submit"
              onClick={handleOnClick}
            >
              LOGIN
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              marginTop: "20px",
            }}
          >
            <Button onClick={() => navigate("/signup")}>Signup</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
