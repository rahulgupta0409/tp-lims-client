import React, { useEffect, useRef, useState } from "react";
import "./patiententry.scss";
import Select from "react-select";
import { GET_ALL_MINOR_LAB_TESTS } from "../../apis/MinorTestAPI";
import { getJwtToken } from "../../utils/token";
import Navbars from "../../components/navbar/Nav";
import { ADD_MAJOR_LAB_TEST } from "../../apis/MajorTestAPI";

const PatientEntry = () => {
  const [majorTests, setMajorTests] = useState({
    majorTestName: "",
    minorLabTestList: [],
    majorTestPrice: 0.0,
    majorTestRemarks: "",
  });
  const [minorLabTests, setMinorLabTests] = useState([]);
  const [selectValue, setSelectValue] = useState([]);
  const [price, setPrice] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchMinorTests = async () => {
      try {
        const hh = await GET_ALL_MINOR_LAB_TESTS();
        setMinorLabTests(
          hh.map((h, idx) => ({
            ...h,
            label: h.testName,
            value: h.testName,
            idx: idx,
          }))
        );
      } catch (error) {
        console.error("Error fetching minor tests:", error);
      }
    };
    fetchMinorTests();
  }, []);

  const handleOnChange = (param, value) => {
    setMajorTests((prevState) => ({
      ...prevState,
      [param]: param === "majorTestPrice" ? parseFloat(value) : value,
    }));
  };

  const handleChange = (e) => {
    setSelectValue(e);
  };
  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  useEffect(() => {
    setPrice(getTestPrice());
  }, [selectValue]);

  const getTestPrice = () => {
    let price = 0;
    selectValue.forEach((e) => {
      price = price + e.testPrice;
    });
    return price;
  };

  const handleOnClick = async (e) => {
    e.preventDefault();

    const data = await ADD_MAJOR_LAB_TEST(
      majorTests.majorTestName,
      price,
      selectValue,
      majorTests.majorTestRemarks
    );
    handleReset();
  };

  console.log("selectedValue", selectValue);
  return (
    <div className="main-container">
      <Navbars />
      <div className="majortest-container">
        <form ref={formRef} className="majortest-form" onSubmit={handleOnClick}>
          <h2 className="h2">ADD MAJOR TEST</h2>
          <div className="row">
            <div className="label">Minor Tests</div>
            <Select
              // defaultValue={[colourOptions[2], colourOptions[3]]}
              closeMenuOnSelect={false}
              isMulti
              name="colors"
              options={minorLabTests}
              value={selectValue}
              onChange={handleChange}
              className="custom-input"
              classNamePrefix="select"
            />
          </div>
          <div className="row">
            <div className="label">Test Name</div>
            <input
              className="input"
              name="majorTestName"
              type="text"
              placeholder="Enter test name..."
              onChange={(e) => {
                handleOnChange("majorTestName", e.target.value);
              }}
            />
          </div>
          <div className="row">
            <div className="label">Minor Tests</div>
            <Select
              // defaultValue={[colourOptions[2], colourOptions[3]]}
              closeMenuOnSelect={false}
              isMulti
              name="colors"
              options={minorLabTests}
              value={selectValue}
              onChange={handleChange}
              className="custom-input"
              classNamePrefix="select"
            />
          </div>
          <div className="row">
            <div className="label">TestPrice</div>
            <input
              className="input"
              name="majorTestPrice"
              type="text"
              placeholder="Enter test price..."
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="row">
            <div className="label">Remarks</div>
            <input
              className="input"
              name="majorTestRemarks"
              type="text"
              placeholder="Enter test remarks..."
              onChange={(e) => {
                handleOnChange("majorTestRemarks", e.target.value);
              }}
            />
          </div>
          <div className="row">
            <button className="submin-majortest" type="submit">
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientEntry;
