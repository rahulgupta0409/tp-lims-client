import React, { useState } from "react";
import "./testInput.scss";
import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TestInput = ({ initialState }) => {
  const [state, setState] = useState(initialState);

  const handleOnChange = (e) => {
    setState(e.target.value);
  };
  if (state == initialState) {
    return (
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Tooltip title={state} arrow>
          <input
            type="text"
            className="test-input"
            value={state}
            onChange={handleOnChange}
          />
        </Tooltip>
        <Tooltip title={`Default Value of the field.`} arrow>
          <CheckCircleOutlineIcon sx={{ color: "red" }} />
        </Tooltip>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <Tooltip title={state} arrow>
        <input
          type="text"
          className="test-input"
          value={state}
          onChange={handleOnChange}
        />
      </Tooltip>
      {state.length == 0 ? (
        <Tooltip title={`Default Value of the field.`} arrow>
          <CheckCircleOutlineIcon sx={{ color: "royalblue" }} />
        </Tooltip>
      ) : (
        <Tooltip title={`Default Value of the field.`} arrow>
          <CheckCircleIcon sx={{ color: "green" }} />
        </Tooltip>
      )}
    </div>
  );
};

TestInput.propTypes = {
  initialState: PropTypes.string,
};

export default TestInput;
