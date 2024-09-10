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
// import Logo from "../../images/Tilak_Pathology_PNG_Logo-removebg.png";
import { getCookie, removeCookie } from "../../utils/cookies";
import UserMenu from "./UserMenu";
import Logo from "./Logo";

function Navbars() {
  const navigate = useNavigate();
  let createdBy = getCookie("user");

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
              {/* <img
                src={Logo}
                style={{
                  width: "60px",
                  height: "60px",
                  marginLeft: "10px",
                }}
                alt="Logo"
              /> */}
              <Logo />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <div
                  className="hidden md:block text-lg font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                  onClick={() => navigate("/home")}
                >
                  Home
                </div>

                <div
                  className="hidden md:block text-lg font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                  onClick={() => navigate("/patient")}
                >
                  Patients
                </div>

                <div className="hidden md:block text-lg font-semibold py-2 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
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
                </div>
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

                {/* <Button variant="danger" onClick={handleLogout}>
                  LOGOUT
                </Button> */}
                <UserMenu currentUser={createdBy} />
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
