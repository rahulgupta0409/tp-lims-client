import React, { useEffect, useLayoutEffect, useState } from "react";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import Stack from "../../components/stack/Stack";
import Navbars from "../../components/navbar/Nav";
import "./patients.scss";
import {
  GET_ALL_PATIENTS,
  GET_ALL_PATIENTS_BY_DATE_RANGE,
  GET_ALL_PATIENTS_BY_SEARCH,
} from "../../apis/PatientAPI";
import { Modal } from "react-bootstrap";
import { BsCalendar2DateFill } from "react-icons/bs";
// import Avatar from "../../components/avatar/Avatar";
import Search from "../../components/search/search";
import Heading from "../../components/headings/Heading";
import { Avatar, Chip, Tooltip } from "@mui/material";
import { GrInProgress } from "react-icons/gr";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PatientProgressBar from "../../components/progressbars/progressBar";
import { GET_REPORT_PROGRESS_BY_PATIENT_IDS } from "../../apis/ReportProgress";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { convertTimestampToDate } from "../../utils/date/dateConvertor";
import MainTestEntry from "../../components/test-entry/mainTestEntry";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [dateTimeValue, setDateTimeValue] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [patientIds, setPatientIds] = useState([]);
  const [reportProgress, setReportProgress] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");

  const reverseString = (str) => [...str].reverse().join("");

  useEffect(() => {
    const asyncFn = async () => {
      if (patientIds.length > 0) {
        try {
          const reportProgress = await GET_REPORT_PROGRESS_BY_PATIENT_IDS(
            patientIds
          );
          if (reportProgress != null) {
            setReportProgress(reportProgress);
            console.log("reportProgress", reportProgress);
          }
        } catch (error) {
          console.error("Error fetching report progress:", error);
        }
      }
    };
    asyncFn();
  }, [patientIds]);

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const searchResult = await GET_ALL_PATIENTS_BY_SEARCH(query);
        if (searchResult != null) {
          setPatients(searchResult);
        }
      } catch (error) {
        console.error("Error fetching report progress:", error);
      }
    };
    asyncFn();
  }, [query]);

  useEffect(() => {
    const asyncFn = async () => {
      if (query.length === 0) {
        try {
          const allPatients = await GET_ALL_PATIENTS_BY_DATE_RANGE(
            dateTimeValue[0]?.startDate,
            dateTimeValue[0]?.endDate
          );
          if (allPatients != null) {
            console.log(allPatients);
            setPatients(allPatients);
            const Ids = allPatients.map((patient) => patient.patientId);
            setPatientIds(Ids);
          }
        } catch (error) {
          console.error("Error fetching minor tests:", error);
        }
      }
    };
    asyncFn();
  }, [dateTimeValue, query]);

  console.log("patientIds", patientIds);
  return (
    <>
      <Navbars />

      <div className="search-calender-main-container">
        <div
          style={{
            backgroundColor: "#f2f4f6",
            width: "20%",
            borderRadius: "30px",
            padding: "5px",
          }}
        >
          <Heading title="Patients" subtitle="All patients are here!" center />
        </div>
        <div style={{ width: "40%" }}>
          <Search
            component={
              <input
                style={{
                  width: "100%",
                  height: "100%",
                  outline: "none",
                  fontWeight: "bold",
                }}
                type="text"
                onChange={(e) => setQuery(e.target.value)}
              />
            }
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#f2f4f6",
            width: "25%",
            borderRadius: "30px",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => setShowModal(true)}
        >
          {dateTimeValue[0]?.startDate.toString().substring(0, 11) +
            " - " +
            dateTimeValue[0]?.endDate.toString().substring(0, 11)}

          <BsCalendar2DateFill style={{ cursor: "pointer" }} size={50} />
        </div>
      </div>
      <Modal
        sx={{ width: "2000px" }}
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <DateRangePicker
            onChange={(item) => setDateTimeValue([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={dateTimeValue}
            direction="horizontal"
            preventSnapRefocus={true}
            calendarFocus="backwards"
          />
        </Modal.Body>
      </Modal>

      <div
        style={{
          height: "100%",
          backgroundColor: "#fafafa",
          padding: "25px 5px",
          borderRadius: "10px",
          margin: "0 7px",
        }}
      >
        <div className="patient-list-container">
          {patients.length > 0 ? (
            patients.map((patient) => {
              return (
                <Stack
                  id={patient?.patientLabId}
                  key={patient?.patientId}
                  label={`${patient?.firstName + " " + patient?.lastName}`}
                  desc={
                    patient?.age || patient?.gender
                      ? `${patient?.age} Y/ ${patient?.gender}`
                      : ``
                  }
                  component={<PatientProgressBar progress={51} />}
                  value={reportProgress
                    .filter((p) => patient.patientId == p.patientId)
                    .map((pro) => pro.progress)}
                  entity={
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {/* <span>
                        {patient?.dueAmount > 0
                          ? `Due Amount: ${patient?.dueAmount} INR`
                          : ``}
                      </span> */}
                      <span>
                        {patient?.createdDate.length > 0
                          ? convertTimestampToDate(patient.createdDate)
                          : ``}
                      </span>
                    </div>
                  }
                  icon={
                    patient?.dueAmount > 0 ? (
                      <Tooltip
                        describeChild
                        placement="top"
                        arrow
                        title={`Patient has a pending Due Amount: Rs. ${patient?.dueAmount}`}
                        enterDelay={1000}
                      >
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>
                          {patient?.firstName.substring(0, 1) +
                            patient?.lastName.substring(0, 1)}
                        </Avatar>
                      </Tooltip>
                    ) : (
                      <Avatar sx={{ bgcolor: deepOrange[500] }}>
                        {patient?.firstName.substring(0, 1) +
                          patient?.lastName.substring(0, 1)}
                      </Avatar>
                    )
                  }
                />
              );
            })
          ) : (
            <div>
              <Heading
                style={{ padding: "100px" }}
                title="No Result Found!"
                subtitle="No patients were tested."
                center
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Patients;
