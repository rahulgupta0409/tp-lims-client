import React from "react";
import "./Nav.scss";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AccountMenu from "../accountmenu/AccountMenu";
import Logo from "../../images/Tilak_Pathology_PNG_Logo-removebg.png";
import { removeCookie } from "../../utils/cookies";

function Navbars() {
  const navigate = useNavigate();

  const handleOnClickMinorTest = (e) => {
    navigate("/minortests");
  };
  const handleLogout = (e) => {
    e.preventDefault();
    removeCookie("__rT");
    localStorage.removeItem("token");

    navigate("/");
  };

  const handleOnClickOrganization = (e) => {
    e.preventDefault();
    navigate("/organization");
  };

  const handleOnClickMajorTest = (e) => {
    e.preventDefault();
    navigate("/helper");
  };
  return (
    <>
      <div className="navbar-container">
        <Navbar expand="lg">
          <Container fluid>
            <Navbar.Brand
              onClick={() => {
                if (localStorage.getItem("token")) {
                  return navigate("/home");
                } else {
                  navigate("/");
                }
              }}
            >
              <img
                src={Logo}
                style={{
                  width: "60px",
                  height: "60px",
                  marginLeft: "10px",
                }}
                alt="Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
                <Nav.Link onClick={() => navigate("/patient")}>
                  Patients
                </Nav.Link>
                <NavDropdown title="Other" id="navbarScrollingDropdown">
                  <NavDropdown.Item onClick={handleOnClickMajorTest}>
                    Major Tests
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleOnClickMinorTest}>
                    Minor Tests
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    // href="/organization"
                    onClick={handleOnClickOrganization}
                  >
                    Add Organization
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
              </Nav>
              <Form className="d-flex">
                {/* <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              /> */}

                <Button variant="danger" onClick={handleLogout}>
                  LOGOUT
                </Button>
                {/* <div className="account-menu-nav-container">
                <AccountMenu />
              </div> */}
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default Navbars;
