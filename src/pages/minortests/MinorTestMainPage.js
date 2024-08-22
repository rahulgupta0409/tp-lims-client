import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbars from "../../components/navbar/Nav";
import Tables from "../../components/table/Tables";
import { getJwtToken } from "../../utils/token";
import MinorTestAddUpdate from "./MinorTestAddUpdate";
import "./MinorTestMainPage.scss";
import GridExample from "../../components/aggrid/agGrid";

const MinorTestMainPage = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState("");
  const [selectedRow, setSelectedRow] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const createLabTests = async () => {
    try {
      const token = await getJwtToken().then((v) => v);
      const response = await fetch(
        "http://localhost:8091/v1/minortest/addMinorTest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            testName: "RIM",
            testPrice: 129.4,
            minorTestUnit: "nxnxs",
            remarks: "This is a remarks",
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await response.json();

      setItems((prevItems) => [data, ...prevItems]);
    } catch (error) {
      console.error("Error creating minor lab test:", error);
    }
  };

  const deleteLabTest = async (testId) => {
    try {
      const token = await getJwtToken().then((v) => v);
      const response = await fetch(
        `http://localhost:8091/v1/minortest/deleteMinorLabTestBy/${testId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  useEffect(() => {
    fetchMinnorLabTests();
  }, []);

  const handleAddModalOpen = () => setShowModal("addModal");

  const handleAddModalClose = () => {
    setShowModal(false);
  };

  const handleUpdateModalOpen = (row) => {
    setShowModal("updateModal");
    console.log("row", row);
    setSelectedRow(row);
  };

  const handleUpdateModalClose = () => setShowUpdateModal(false);

  const fetchMinnorLabTests = async () => {
    try {
      const token = await getJwtToken().then((v) => v);
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
        data.map((dat, idx) => {
          return { ...dat, rowIdx: idx };
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
    },
    {
      id: "minorTestUnit",
      label: "TEST UNIT",
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
      id: "buttonDelete",
      type: "error",
      align: "right",
    },
  ];

  const actions = [
    {
      label: <DeleteIcon />,
      color: "error",
      onClick: (row) => {
        deleteLabTest(row.testId);
        const data = items.filter((i) => i.testId !== row.testId);
        setItems(data);
      },
    },
  ];

  const onSearch = (e) => {
    const { value } = e.target || e;
    setSearchQuery(value);
  };

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
            <Form className="d-flex">
              <Form.Control
                type="input"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={onSearch}
              />
            </Form>
          </div>
          <div>
            <IconButton variant="secondary" onClick={handleAddModalOpen}>
              <AddBoxIcon fontSize="large" />
            </IconButton>
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
                  {showModal === "addModal" ? "Add Tests" : "Update Modal"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <MinorTestAddUpdate {...selectedRow} modalType={showModal} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleAddModalClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={createLabTests}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <Tables
          columns={columns}
          rows={items.filter((item) =>
            (item.testName || "")
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )}
          actions={actions}
          onDoubleClick={handleUpdateModalOpen}
        />
      </div>
    </div>
  );
};

export default MinorTestMainPage;
