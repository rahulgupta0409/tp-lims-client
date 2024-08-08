import React, { useState, useEffect } from "react";
import Navbars from "../../components/navbar/Nav";
import "./MinorTestMainPage.scss";
import Tables from "../../components/table/Tables";
import { Input } from "antd";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import Organization from "../organization/Organization";
import MinorTestAdd from "./MinorTestAdd";

const MinorTestMainPage = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMinnorLabTests();
  }, []);

  const handleAddModalOpen = () => setShowModal(true);

  const handleAddModalClose = () => setShowModal(false);

  const fetchMinnorLabTests = async () => {
    try {
      const response = await fetch(
        "http://localhost:8091/v1/minortest/getAllMinorTests",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setItems(
        data.map((dat) => {
          return { ...dat, update: "update" };
        })
      );
    } catch (error) {
      console.error("Error fetching minor lab tests:", error);
    }
  };

  const columns = [
    { id: "testName", label: "TEST NAME", minWidth: 100 },
    {
      id: "testPrice",
      label: "TEST PRICE",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "remarks",
      label: "REMARKS",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "update",
      align: "right",
      format: (value) => <Button>{value}</Button>,
    },
  ];

  return (
    <div>
      <Navbars />
      <div
        className="minortest-main-page-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
            margin: "12px",
          }}
        >
          <div>
            <Input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search"
              // Add an onChange handler if needed
              // onChange={(e) => setQuery(e.target.value)}
              onClick={fetchMinnorLabTests}
            />
          </div>
          <div>
            <Button variant="primary" onClick={handleAddModalOpen}>
              Add
            </Button>
            <Modal
              show={showModal}
              onHide={handleAddModalClose}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              style={{ backgroundColor: "dark" }}
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Add Tests
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <MinorTestAdd />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleAddModalClose}>
                  Close
                </Button>
                <Button variant="primary">Submit</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <Tables columns={columns} rows={items} />
      </div>
    </div>
  );
};

export default MinorTestMainPage;
