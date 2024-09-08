import React, { useEffect, useReducer, useRef, useState } from "react";
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
import { Checkbox } from "@mui/material";

import WheelchairPickupSharpIcon from "@mui/icons-material/WheelchairPickupSharp";
import EmojiPeopleSharpIcon from "@mui/icons-material/EmojiPeopleSharp";
import { ADD_NEW_PATIENT } from "../../apis/PatientAPI";

const initialState = {
  labTests: [],
  organization: [],
  doctors: [],
  selectedLabValue: [],
  selectedDoctor: [],
  selectedOrg: [],
  isUpi: false,
  isOutSampled: false,
  dueAmount: 0.0,
  paidAmount: 0.0,
  discount: 0.0,
  totalAmount: 0.0,
  firstName: "",
  lastName: "",
  age: 0,
  phoneNumber: "",
  emailId: "",
};

const diksha = (state, action) => {
  switch (action.type) {
    case "state":
      if (action.name === "paidAmount" && state.discount === 0) {
        return {
          ...state,
          paidAmount: action.value,
          dueAmount: state.totalAmount - action.value,
        };
      } else if (action.name === "discount" && state.paidAmount === 0) {
        return {
          ...state,
          discount: action.value,
          dueAmount: state.totalAmount - action.value,
        };
      } else if (action.name === "discount" && state.paidAmount !== 0) {
        return {
          ...state,
          discount: action.value,
          dueAmount: state.totalAmount - action.value - state.paidAmount,
        };
      } else if (action.name === "paidAmount" && state.discount !== 0) {
        return {
          ...state,
          discount: action.value,
          dueAmount: state.totalAmount - action.value - state.discount,
        };
      } else return { ...state, [action.name]: action.value };

    default:
      break;
  }
};

const PatientEntry = () => {
  const [error, setError] = useState({});
  const [state, setState] = useReducer(diksha, initialState);

  const {
    labTests = [],
    organization = [],
    doctors = [],
    selectedLabValue,
    selectedDoctor = [],
    selectedOrg = [],
    isUpi,
    dueAmount,
    paidAmount,
    discount,
    isOutSampled,
    totalAmount,
    firstName,
    lastName,
    age,
    phoneNumber,
    emailId,
  } = state;

  const formRef = useRef(null);

  useEffect(() => {
    const fetchDropdown = async () => {
      try {
        const hh = await GET_ALL_MINOR_LAB_TESTS();
        const majorTests = await GET_ALL_MAJOR_LAB_TESTS();
        const org = await GET_ALL_ORGANIZATIONS();
        const doctors = await GET_ALL_DOCTORS();

        setState({
          type: "state",
          name: "doctors",
          value: doctors.map((doc, idx) => ({
            ...doc,
            label: doc.doctorName,
            value: doc.doctorId,
            idx: idx,
          })),
        });

        setState({
          type: "state",
          name: "organization",
          value: org.map((og, idx) => ({
            ...og,
            label: og.orgName,
            value: og.orgId,
            idx: idx,
          })),
        });

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
        setState({
          type: "state",
          name: "labTests",
          value: [...minorTestsList, ...majorTestsList],
        });
      } catch (error) {
        console.error("Error fetching minor tests:", error);
      }
    };
    fetchDropdown();
  }, []);

  const handleOnChange = (param, value) => {
    setState({
      type: "state",
      name: param,
      value: value,
    });
  };

  const handleOrgChange = (e) => {
    setState({
      type: "state",
      name: "selectedOrg",
      value: e,
    });
  };

  const handleDocChange = (e) => {
    setState({
      type: "state",
      name: "selectedDoctor",
      value: e,
    });
  };

  const handleLabTestChange = (e) => {
    setState({
      type: "state",
      name: "selectedLabValue",
      value: e,
    });
  };
  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  useEffect(() => {
    setState({
      type: "state",
      name: "totalAmount",
      value: getTestPrice(),
    });
  }, [selectedLabValue]);

  const getTestPrice = () => {
    let price = 0;
    (selectedLabValue || []).forEach((e) => {
      price = price + (e.testPrice || e.majorTestPrice);
    });
    return price;
  };

  const addPatient = async (e) => {
    // e.preventDefault();
    const orgId = selectedOrg.orgId;
    const doctorId = selectedDoctor.doctorId;
    const labTestIds = [];
    await selectedLabValue.forEach((test) =>
      labTestIds.push(test.testId || test.majorTestId)
    );
    const addpaitent = await ADD_NEW_PATIENT({
      ...state,
      orgId,
      doctorId,
      labTestIds,
    });
  };
  console.log("isUpi", isUpi);
  console.log("isOutSampled", isOutSampled);
  return (
    <>
      <Navbars />

      <div className="main-container">
        <div className="majortest-container">
          <div ref={formRef} className="majortest-form">
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
                  <div className="checkbox-label"></div>
                  <Checkbox
                    icon={<WheelchairPickupSharpIcon fontSize="large" />}
                    checkedIcon={<EmojiPeopleSharpIcon fontSize="large" />}
                    onChange={(e) =>
                      handleOnChange("isOutSampled", !isOutSampled)
                    }
                    value={isOutSampled}
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
                    value={firstName}
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
                placeholder="Select Referred Doctor..."
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
                    value={totalAmount}
                    placeholder="Total Amount"
                    onChange={(e) => {
                      handleOnChange("totalAmount", e.target.value);
                    }}
                    disabled
                  />
                </div>
                <div className="checkbox-row">
                  <div className="checkbox-label">UPI</div>
                  <Checkbox
                    checked={isUpi}
                    onChange={(e) => handleOnChange("isUpi", !isUpi)}
                  />
                  {/* <input
                    className="checkbox-input"
                    value={isUpi}
                    type="checkbox"
                    onChange={(e) => {
                      setIsUpi(!isUpi);
                      console.log("upi", isUpi);
                    }}
                  /> */}
                </div>
                <div className="row">
                  <div className="label">Paid Amount</div>
                  <input
                    className="input"
                    name="paidAmount"
                    type="text"
                    placeholder="Paid Amount"
                    onChange={(e) =>
                      setState({
                        type: "state",
                        name: "paidAmount",
                        value: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setState({
                        type: "state",
                        name: "discount",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="row">
                  <div className="label">Due Amount</div>
                  <input
                    className="input"
                    name="dueAmount"
                    type="text"
                    placeholder="Due"
                    value={dueAmount}
                    onChange={(e) => {
                      handleOnChange("dueAmount", e.target.value);
                    }}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* <div className="row"></div> */}

            <div className="row">
              <button className="submin-majortest" onClick={addPatient}>
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientEntry;
