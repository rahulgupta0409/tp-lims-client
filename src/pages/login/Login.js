import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import useFetch from "../../custom-hooks/useFetch";
import { setCookie } from "../../utils/cookies";
import Heading from "../../components/headings/Heading";
import Input from "../../components/input/Input";
import CustomButton from "../../components/buttons/button";
import LoginContainer from "../../components/container/loginContainer";
import Container from "../../components/container/Container";

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
    // e.preventDefault();
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
    <>
      <Container>
        <LoginContainer>
          <Heading
            title="Welcome Back"
            subtitle="Login to your Account!"
            center
          />

          <Input
            label="UserName"
            name="username"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              handleOnChange("username", e.target.value);
            }}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              handleOnChange("password", e.target.value);
            }}
          />
          <CustomButton type="submit" label="LOGIN" onClick={handleOnClick} />
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
        </LoginContainer>
      </Container>
    </>
  );
};

export default Login;
