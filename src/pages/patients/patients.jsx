import React, { useEffect, useState } from "react";
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
} from "../../apis/PatientAPI";
import { Modal } from "react-bootstrap";
import { BsCalendar2DateFill } from "react-icons/bs";
import Avatar from "../../components/avatar/Avatar";
import Search from "../../components/search/search";
import Heading from "../../components/headings/Heading";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [dateTimeValue, setDateTimeValue] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  // useEffect(() => {
  //   const asyncFn = async () => {
  //     try {
  //       const allPatients = await GET_ALL_PATIENTS();
  //       if (allPatients != null) {
  //         setPatients(allPatients);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching minor tests:", error);
  //     }
  //   };
  //   asyncFn();
  // }, []);

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const allPatients = await GET_ALL_PATIENTS_BY_DATE_RANGE(
          dateTimeValue[0]?.startDate,
          dateTimeValue[0]?.endDate
        );
        if (allPatients != null) {
          console.log(allPatients);
          setPatients(allPatients);
        }
      } catch (error) {
        console.error("Error fetching minor tests:", error);
      }
    };
    asyncFn();
  }, [dateTimeValue]);

  console.log("dateTimeValue", dateTimeValue);
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
          <Search />
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
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
                  key={patient?.patientId}
                  label={`Name: ${
                    patient?.firstName + " " + patient?.lastName
                  }`}
                  desc={`Age: ${patient?.age}`}
                  icon={
                    <Avatar
                      userName={patient?.firstName + " " + patient?.lastName}
                    />
                  }
                />
              );
            })
          ) : (
            <div>
              <Heading
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
