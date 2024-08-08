import React, { useState, useEffect } from "react";
import Cards from "../../components/card/Card.js";
import toast, { Toaster } from "react-hot-toast";
import Navbars from "../../components/navbar/Nav.js";

const Home = () => {
  const [showAlert, setShowAlert] = useState(false);

  const notify = () =>
    toast.success("Successfully Loggedin!", {
      duration: 4000,
      position: "top-center",

      // Styling
      style: {},
      className: "",

      // Custom Icon
      icon: "👏",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });

  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");
    if (loginSuccess === "true") {
      setShowAlert(true);
      notify();
    }

    setTimeout(() => {
      localStorage.removeItem("loginSuccess");
      setShowAlert(false);
    }, 5000);
  }, []);

  return (
    <div>
      <Navbars />
      {<Toaster />}
      <Cards
        header="Tilak Pathology"
        title="Special title treatment"
        text="With supporting text below as a natural lead-in to additional
              content."
        button="PATIENT"
        date="2 days ago"
      />
    </div>
  );
};

export default Home;
