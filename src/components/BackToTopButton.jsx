import { Tooltip } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buttonStyle = {
    position: "fixed",
    width: "4vmax",
    height: "4vmax",
    right: "2vmax",
    bottom: "2vmax",
    fontSize: "50vmax",
    cursor: "pointer",
    zIndex: "999",
    borderRadius: "5vmax",
    backgroundColor: isHovered ? "lightGrey" : "white",
    transition: "background-color 0.3s",
    transform: isHovered ? "translateY(-0.5vmax)" : "",
  };

  return (
    <Fragment>
      {
        backToTopButton && (
          // <Tooltip title="Click here to go to the top">
          <FaArrowCircleUp
            onClick={scrollUp}
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        )
        // </Tooltip>
      }
    </Fragment>
  );
};

export default BackToTopButton;
