import React, { useState } from "react";
import { Chip } from "@mui/material";
import { GrInProgress } from "react-icons/gr";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { FaUserDoctor } from "react-icons/fa6";
import "./progressBar.scss";

const PatientProgressBar = ({ progress }) => {
  const [inProgress, setInProgress] = useState(false);
  const [reporting, setsetReporting] = useState(false);
  const [doctorApproval, setDoctorApproval] = useState(false);

  const handleInProgressClick = () => {
    setInProgress(!inProgress);
  };
  const handleReportingClick = () => {
    setsetReporting(!reporting);
  };
  const handleDoctorApprovalClick = () => {
    setDoctorApproval(!doctorApproval);
  };
  return (
    <>
      <div className="patient-progress-main-container">
        {progress > 10 ? (
          <div>
            {inProgress ? (
              <Chip
                size="small"
                color="primary"
                style={{ cursor: "pointer" }}
                avatar={
                  <DoneAllIcon style={{ borderRadius: "20px" }} size={1} />
                }
                label="Inprogress"
                onClick={handleInProgressClick}
              />
            ) : (
              <Chip
                size="small"
                color="primary"
                variant="outlined"
                style={{ cursor: "pointer" }}
                avatar={<DoneIcon style={{ borderRadius: "20px" }} size={1} />}
                label="Inprogress"
                onClick={handleInProgressClick}
              />
            )}
          </div>
        ) : (
          <div></div>
        )}
        <div>
          {reporting ? (
            <Chip
              size="small"
              color="warning"
              style={{ cursor: "pointer" }}
              avatar={<DoneAllIcon style={{ borderRadius: "20px" }} size={1} />}
              label="Reported"
              onClick={handleReportingClick}
            />
          ) : (
            <Chip
              size="small"
              color="warning"
              variant="outlined"
              style={{ cursor: "pointer" }}
              avatar={
                <HourglassTopIcon
                  style={{ borderRadius: "20px", backgroundColor: "warning" }}
                  size={1}
                />
              }
              label="Reporting..."
              onClick={handleReportingClick}
            />
          )}
        </div>
        <div>
          {doctorApproval ? (
            <Chip
              size="small"
              color="success"
              style={{ cursor: "pointer" }}
              avatar={
                <FaUserDoctor style={{ borderRadius: "20px" }} size={1} />
              }
              label="Doctor Approved"
              onClick={handleDoctorApprovalClick}
            />
          ) : (
            <Chip
              size="small"
              color="success"
              variant="outlined"
              style={{ cursor: "pointer" }}
              avatar={
                <FaUserDoctor
                  style={{ borderRadius: "20px", backgroundColor: "warning" }}
                  size={1}
                />
              }
              label="Doctor's Approval"
              onClick={handleDoctorApprovalClick}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PatientProgressBar;
