import React, { useState, useEffect } from "react";
import Cards from "../../components/card/Card.js";
import "./Minortests.scss";
import Navbars from "../../components/navbar/Nav.js";
import { Modal, Button } from "react-bootstrap";
import { MinorTestAPI } from "../../apis/MinorTestAPI.js";

const Minortests = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMinnorLabTests();
  }, []);

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
      setItems(data);
    } catch (error) {}
  };
  return (
    <div>
      <Navbars />
      <div className="minortest-container">
        {items.map((item) => (
          <Cards
            setSelectedItem={setSelectedItem}
            header={item.testName}
            title={item.remarks}
            text={item.remarks}
            button="More Details"
            date={item.testPrice}
          />
        ))}
      </div>
      <Modal
        show={!!selectedItem}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {selectedItem}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4>
          <p>{selectedItem}</p> */}

          <div className="org-container">
            <form className="org-form">
              <h2 className="h2">{selectedItem}</h2>
              <div className="row">
                <div className="label">Test Name</div>
                <input
                  className="input"
                  name="orgName"
                  type="text"
                  placeholder="Enter organization name..."
                  // onChange={(e) => {
                  //   handleOnChange("orgName", e.target.value);
                  // }}
                />
              </div>
              <div className="row">
                <div className="label">Test Details</div>
                <input
                  className="input"
                  name="orgDetails"
                  type="text"
                  placeholder="Enter organization details..."
                  // onChange={(e) => {
                  //   handleOnChange("orgDetails", e.target.value);
                  // }}
                />
              </div>
              <div className="row">
                <Button className="submin-org">SUBMIT</Button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setSelectedItem("")}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Minortests;
