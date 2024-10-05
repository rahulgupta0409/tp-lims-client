import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import useFetch from "../../custom-hooks/useFetch";
import { setCookie } from "../../utils/cookies";
import Heading from "../../components/headings/Heading";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleOnChange = (param, value) => {
    if (param === "username") {
      setUsername(value);
    }
    if (param === "password") {
      setPassword(value);
    }
  };

  const handleOnClick = async (e) => {
    e.preventDefault();

    // const { data, error, loading } = useFetch(
    //   "http://localhost:8091/v1/auth/signin",
    //   "POST",
    //   {
    //     userName,
    //     password,
    //   }
    // );

    // if (data != null) {
    //   localStorage.setItem("token", data.token);
    //   localStorage.setItem("loginSuccess", "true");
    //   setUserName("");
    //   setPassword("");
    //   navigate("/home");
    // }

    try {
      const response = await fetch("http://localhost:8091/v1/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          username,
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
        localStorage.setItem("token", data.token, { expires: 1 });
        localStorage.setItem("loginSuccess", "true");
        setCookie("__rT", data.refreshToken, { expires: 7 });
        setCookie("user", data.user.fullName);
        setUsername("");
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
        <div className="login-form-container">
          {/* <h2 className="h2">LOGIN</h2> */}
          <Heading
            title="Welcome Back"
            subtitle="Login to your Account!"
            center
          />
          <div className="row">
            <div className="label">Username</div>
            <input
              className="input"
              name="username"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                handleOnChange("username", e.target.value);
              }}
            />
          </div>
          <div className="row">
            <div className="label">Password</div>
            <input
              className="input"
              name="password"
              type="text"
              placeholder="Password"
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
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <div
              style={{ fontFamily: "Product Sans" }}
            >{`Don't have account?`}</div>
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
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
