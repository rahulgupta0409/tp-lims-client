import React, { useState } from "react";
import "./PatientsEntryForm.scss";
import Navbars from "./navbar/Nav";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const PatientsEntryForm = () => {
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
    // await fetch("http://localhost:8091/v1/auth/signup", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     emailId,
    //     userName,
    //     fullName,
    //     password,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((res) => res.json());
  };
  return (
    <div>
      <Navbars />
      <div className="signup-container">
        <form className="signup-form">
          <h2 className="h2">PATIENT ENTRY</h2>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Row>
          </Form>
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
    </div>
  );
};

export default PatientsEntryForm;
