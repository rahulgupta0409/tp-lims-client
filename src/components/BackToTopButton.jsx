import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);

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
  return (
    <div>
      {backToTopButton && (
        <Tooltip describeChild title="Click here to go to the top">
          <FaArrowCircleUp
            onClick={scrollUp}
            style={{
              position: "fixed",
              width: "50px",
              height: "50px",
              right: "50px",
              bottom: "50px",
              fontSize: "50px",
              cursor: "pointer",
              zIndex: "999",
            }}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default BackToTopButton;
