import React from "react";
import "./button.scss";

const CustomButton = ({ type, onClick, label }) => {
  return (
    <div className="btn-row">
      <button className="submit-btn" type={type} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default CustomButton;
