import React, { useEffect, useRef, useState } from "react";
import "./majortests.scss";
import Select from "react-select";
import { getMinorTests } from "../../apis/MinorTestAPI";
import { getJwtToken } from "../../utils/token";
import Navbars from "../../components/navbar/Nav";

const Majortests = () => {
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

  // useEffect(async () => {
  //   const hh = await getMinorTests().then((v) => v);
  //   setMinorLabTests(
  //     hh.map((h, idx) => {
  //       return { ...h, label: h.testName, value: h.testName, idx: idx };
  //     })
  //   );
  // }, []);

  useEffect(() => {
    const fetchMinorTests = async () => {
      try {
        const hh = await getMinorTests();
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

    try {
      const token = await getJwtToken().then((v) => v);
      const response = await fetch(
        "http://localhost:8091/v1/majortest/addMajorLabTest",
        {
          method: "POST",
          body: JSON.stringify({
            majorTestName: majorTests.majorTestName,
            majorTestPrice: price,
            minorLabTestList: selectValue,
            majorTestRemarks: majorTests.majorTestRemarks,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleReset();

      const data = await response.json();
      // if (data != null) {
      //   setMajorTests({
      //     majorTestName: "",
      //     minorLabTestList: [],
      //     majorTestPrice: 0.0,
      //     majorTestRemarks: "",
      //   });
      // }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  console.log("selectedValue", selectValue);
  return (
    <div>
      <Navbars />
      <div className="majortest-container">
        <form ref={formRef} className="majortest-form" onSubmit={handleOnClick}>
          <h2 className="h2">ADD MAJOR TEST</h2>
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
            <button
              className="submin-majortest"
              type="submit"
              //onClick={handleOnClick}
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Majortests;
