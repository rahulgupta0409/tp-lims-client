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
import { Avatar, Checkbox, Tooltip } from "@mui/material";
import { AiFillFacebook } from "react-icons/ai";
import WheelchairPickupSharpIcon from "@mui/icons-material/WheelchairPickupSharp";
import EmojiPeopleSharpIcon from "@mui/icons-material/EmojiPeopleSharp";
import { ADD_NEW_PATIENT } from "../../apis/PatientAPI";
import BasicButton from "../../components/buttons/BasicButton";
import Input from "../../components/input/Input";
import Navbar from "../../components/navbar/Navbar";
import { FcMoneyTransfer } from "react-icons/fc";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaHospitalUser } from "react-icons/fa";
import Heading from "../../components/headings/Heading";
import UPIColor from "../../images/UPI-Color.png";
// import Avatar from "../../components/avatar/Avatar";

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
  gender: "",
};

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Transgender", label: "Trans" },
];

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
    gender,
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

  const handleGenderChange = (e) => {
    setState({
      type: "state",
      name: "gender",
      value: e.value,
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
    // const data = await addPatient;
    // if (data != null) {
    //   handleReset();
    // }
  };
  console.log("state", state);

  return (
    <>
      <Navbars />

      <div className="patient-entry-container">
        <div ref={formRef} className="patient-entry-form-container">
          <Heading
            title="Register Patient"
            subtitle="Your Diagnosis Starts Here!"
            center
          />
          <div style={{ marginTop: "30px" }}></div>
          <div className="patient-row">
            <div className="span-container">
              <div className="patient-row">
                <div className="patient-entry-label">Organization</div>
                <Select
                  closeMenuOnSelect={true}
                  name="colors"
                  options={organization}
                  value={selectedOrg}
                  onChange={handleOrgChange}
                  className="my-select"
                  classNamePrefix="my-select"
                />
              </div>
              <div className="checkbox-row">
                <div className="checkbox-label"></div>
                <Tooltip
                  describeChild
                  title="If the patient collected the samples by themselves."
                >
                  <Checkbox
                    icon={<FaHospitalUser size={50} />}
                    checkedIcon={<FaHospitalUser size={50} color="red" />}
                    onChange={(e) =>
                      handleOnChange("isOutSampled", !isOutSampled)
                    }
                    value={isOutSampled}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="patient-row">
            <div className="span-container">
              <div className="patient-row">
                <div className="patient-entry-label">First Name</div>
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
              <div className="patient-row">
                <div className="patient-entry-label">Last Name</div>
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

          <div className="patient-row">
            <div className="span-container">
              <div className="patient-row">
                <div className="patient-entry-label">Age</div>
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
              <div className="patient-row">
                <div className="patient-entry-label">Contact</div>
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

          <div className="patient-row">
            <div className="span-container">
              <div className="patient-row">
                <div className="patient-entry-label">Gender</div>
                <Select
                  closeMenuOnSelect={true}
                  name="colors"
                  options={genderOptions}
                  value={gender.value}
                  onChange={handleGenderChange}
                  className="my-select"
                  classNamePrefix="my-select"
                />
              </div>
              <div className="patient-row">
                <div className="patient-entry-label">Email</div>
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
            </div>
          </div>

          <div className="patient-row">
            <div className="patient-entry-label">Referred Doctor</div>
            <Select
              closeMenuOnSelect={true}
              name="colors"
              options={doctors}
              value={selectedDoctor}
              onChange={handleDocChange}
              className="my-select"
              classNamePrefix="my-select"
            />
          </div>

          <div className="patient-row">
            <div className="patient-entry-label">Tests</div>
            <Select
              closeMenuOnSelect={false}
              isMulti
              name="colors"
              options={labTests}
              value={selectedLabValue}
              onChange={handleLabTestChange}
              className="my-select"
              classNamePrefix="my-select"
            />
          </div>

          <div className="patient-row">
            <div className="span-container">
              <div className="patient-row">
                <div className="patient-entry-label">Total Amount</div>
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
                <div className="checkbox-label"></div>
                {/* <Checkbox
                    checked={isUpi}
                    onChange={(e) => handleOnChange("isUpi", !isUpi)}
                  /> */}

                <Tooltip
                  describeChild
                  title="If the patient is paying through UPI."
                >
                  <Checkbox
                    icon={<FcMoneyTransfer size={50} />}
                    checkedIcon={<GiTakeMyMoney size={50} color="red" />}
                    onChange={(e) => handleOnChange("isUpi", !isUpi)}
                    value={isUpi}
                  />
                </Tooltip>
              </div>
              <div className="patient-row">
                <div className="patient-entry-label">Paid Amount</div>
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

          <div className="patient-row">
            <div className="span-container">
              <div className="patient-row">
                <div className="patient-entry-label">Discount</div>
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
              <div className="patient-row">
                <div className="patient-entry-label">Due Amount</div>
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

          <div className="patient-row">
            <BasicButton onClick={addPatient} label="Add Patient" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientEntry;
