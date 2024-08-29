import React, { useEffect, useRef, useState } from "react";
import "./patiententry.scss";
import Select from "react-select";
import { GET_ALL_MINOR_LAB_TESTS } from "../../apis/MinorTestAPI";
import Navbars from "../../components/navbar/Nav";
import {
  ADD_MAJOR_LAB_TEST,
  GET_ALL_MAJOR_LAB_TESTS,
} from "../../apis/MajorTestAPI";
import { GET_ALL_ORGANIZATIONS } from "../../apis/OrganizationAPI";
import { GET_ALL_DOCTORS } from "../../apis/DoctorAPI";

const PatientEntry = () => {
  const [majorTests, setMajorTests] = useState({
    majorTestName: "",
    minorLabTestList: [],
    majorTestPrice: 0.0,
    majorTestRemarks: "",
  });
  const [labTests, setLabTests] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedLabValue, setSelectedLabValue] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [price, setPrice] = useState(0);
  const [isUpi, setIsUpi] = useState(true);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchDropdown = async () => {
      try {
        const hh = await GET_ALL_MINOR_LAB_TESTS();
        const majorTests = await GET_ALL_MAJOR_LAB_TESTS();
        const org = await GET_ALL_ORGANIZATIONS();
        const doctors = await GET_ALL_DOCTORS();

        setDoctors(
          doctors.map((doc, idx) => ({
            ...doc,
            label: doc.doctorName,
            value: doc.doctorId,
            idx: idx,
          }))
        );

        setOrganization(
          org.map((og, idx) => ({
            ...og,
            label: og.orgName,
            value: og.orgId,
            idx: idx,
          }))
        );

        const minorTestsList = hh.map((h, idx) => ({
          ...h,
          label: h.testName,
          value: h.testId,
          idx: idx,
        }));

        const majorTestsList = majorTests.map((major, idx) => ({
          ...major,
          label: major.majorTestName,
          value: major.majorTestId,
          idx: idx,
        }));
        setLabTests([...minorTestsList, ...majorTestsList]);
      } catch (error) {
        console.error("Error fetching minor tests:", error);
      }
    };
    fetchDropdown();
  }, []);

  const handleOnChange = (param, value) => {
    setMajorTests((prevState) => ({
      ...prevState,
      [param]: param === "majorTestPrice" ? parseFloat(value) : value,
    }));
  };

  const handleOrgChange = (e) => {
    setSelectedOrg(e);
  };

  const handleDocChange = (e) => {
    setSelectedDoctor(e);
  };

  const handleLabTestChange = (e) => {
    setSelectedLabValue(e);
  };
  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  useEffect(() => {
    setPrice(getTestPrice());
  }, [selectedLabValue]);

  const getTestPrice = () => {
    let price = 0;
    selectedLabValue.forEach((e) => {
      price = price + e.testPrice;
    });
    return price;
  };

  const handleOnClick = async (e) => {
    e.preventDefault();

    const data = await ADD_MAJOR_LAB_TEST(
      majorTests.majorTestName,
      price,
      selectedLabValue,
      majorTests.majorTestRemarks
    );
    handleReset();
  };

  //   console.log("selectedLabValue", selectedLabValue);
  //   console.log("selectedOrg", selectedOrg);
  //   console.log("selectedDoctor", selectedDoctor);

  console.log("labTests", labTests);
  return (
    <>
      <Navbars />
      <div className="main-container">
        <div className="majortest-container">
          <form
            ref={formRef}
            className="majortest-form"
            onSubmit={handleOnClick}
          >
            <h2 className="h2">ADD PATIENT</h2>
            <div className="row">
              <div className="span-container">
                <div className="row">
                  <div className="label">Organization</div>
                  <Select
                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                    closeMenuOnSelect={false}
                    name="colors"
                    options={organization}
                    value={selectedOrg}
                    onChange={handleOrgChange}
                    className="custom-input"
                    classNamePrefix="select"
                  />
                </div>
                <div className="checkbox-row">
                  <div className="checkbox-label">Out Sampled</div>
                  <input
                    className="checkbox-input"
                    value={isUpi}
                    type="checkbox"
                    onChange={(e) => {
                      setIsUpi(!isUpi);
                      console.log("upi", isUpi);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="span-container">
                <div className="row">
                  <div className="label">First Name</div>
                  <input
                    className="input"
                    name="firstName"
                    type="text"
                    placeholder="Enter firstname..."
                    onChange={(e) => {
                      handleOnChange("firstName", e.target.value);
                    }}
                  />
                </div>
                <div className="row">
                  <div className="label">Last Name</div>
                  <input
                    className="input"
                    name="lastName"
                    type="text"
                    placeholder="Enter lastname..."
                    onChange={(e) => {
                      handleOnChange("lastName", e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="span-container">
                <div className="row">
                  <div className="label">Age</div>
                  <input
                    className="input"
                    name="age"
                    type="number"
                    placeholder="Enter age..."
                    onChange={(e) => {
                      handleOnChange("age", e.target.value);
                    }}
                  />
                </div>
                <div className="row">
                  <div className="label">Contact</div>
                  <input
                    className="input"
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter phone number..."
                    onChange={(e) => {
                      handleOnChange("phoneNumber", e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="label">Email</div>
              <input
                className="input"
                name="emailId"
                type="text"
                placeholder="Enter email..."
                onChange={(e) => {
                  handleOnChange("emailId", e.target.value);
                }}
              />
            </div>

            <div className="row">
              <div className="label">Referred Doctor</div>
              <Select
                // defaultValue={[colourOptions[2], colourOptions[3]]}
                closeMenuOnSelect={false}
                name="colors"
                options={doctors}
                value={selectedDoctor}
                onChange={handleDocChange}
                className="custom-input"
                classNamePrefix="select"
              />
            </div>

            <div className="row">
              <div className="label">Tests</div>
              <Select
                // defaultValue={[colourOptions[2], colourOptions[3]]}
                closeMenuOnSelect={false}
                isMulti
                name="colors"
                options={labTests}
                value={selectedLabValue}
                onChange={handleLabTestChange}
                className="custom-input"
                classNamePrefix="select"
              />
            </div>

            <div className="row">
              <div className="span-container">
                <div className="row">
                  <div className="label">Total Amount</div>
                  <input
                    className="input"
                    name="totalAmount"
                    type="text"
                    placeholder="Total Amount"
                    onChange={(e) => {
                      handleOnChange("totalAmount", e.target.value);
                    }}
                    disabled
                  />
                </div>
                <div className="checkbox-row">
                  <div className="checkbox-label">UPI</div>
                  <input
                    className="checkbox-input"
                    value={isUpi}
                    type="checkbox"
                    onChange={(e) => {
                      setIsUpi(!isUpi);
                      console.log("upi", isUpi);
                    }}
                  />
                </div>
                <div className="row">
                  <div className="label">Paid Amount</div>
                  <input
                    className="input"
                    name="paidAmount"
                    type="text"
                    placeholder="Paid Amount"
                    onChange={(e) => {
                      handleOnChange("paidAmount", e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="span-container">
                <div className="row">
                  <div className="label">Discount</div>
                  <input
                    className="input"
                    name="discount"
                    type="text"
                    placeholder="Discount"
                    onChange={(e) => {
                      handleOnChange("discount", e.target.value);
                    }}
                  />
                </div>
                <div className="row">
                  <div className="label">Due Amount</div>
                  <input
                    className="input"
                    name="dueAmount"
                    type="text"
                    placeholder="Due"
                    onChange={(e) => {
                      handleOnChange("dueAmount", e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* <div className="row"></div> */}

            <div className="row">
              <button className="submin-majortest" type="submit">
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PatientEntry;
