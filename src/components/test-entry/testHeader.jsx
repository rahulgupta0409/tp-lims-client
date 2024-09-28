import React from "react";
import "./testHeader.scss";
import Heading from "../headings/Heading";

const TestHeader = ({
  testName = "Test Name",
  value = "Value",
  range = "Range Unit",
  remark = "Remark",
}) => {
  return (
    <div className="test-header-container">
      <tr>
        <th>
          <Heading title={testName} />
        </th>
        <th>
          <Heading title={value} />
        </th>
        <th>
          <Heading title={range} />
        </th>
        <th>
          <Heading title={remark} />
        </th>
      </tr>
    </div>
  );
};

export default TestHeader;
