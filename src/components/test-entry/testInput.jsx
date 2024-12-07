import React, { useState } from "react";
import "./testInput.scss";
import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { UPDATE_TEST_OF_PATIENT } from "../../apis/PatientAPI";
import { useDispatch } from "react-redux";
import { setPatientTestDetail, updatePatientTestDetails } from "../../actions";

const TestInput = ({ initialState, disabled = false, patientId, testId }) => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  console.log("state", state);
  const handleOnChange = (e) => {
    setState(e.target.value);
  };

  const handleBlur = async () => {
    // const data = await UPDATE_TEST_OF_PATIENT(
    //   "3b44a9d4-784a-4c1f-a4e9-035fc758eb304-745e-41ab-84ca-eefc2046d84d",
    //   "1cb369e0-8286-4b53-a09f-51e9f957bf665-2810-470d-b3f7-18fea6aeec8d",
    //   state
    // );
    dispatch(updatePatientTestDetails(patientId, testId, state));
    dispatch(setPatientTestDetail({ patientId, testId, value: state }));
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
            disabled={disabled}
            onBlur={handleBlur}
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
          disabled={disabled}
          onBlur={handleBlur}
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
