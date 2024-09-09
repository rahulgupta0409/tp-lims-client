import React from "react";
import PropTypes from "prop-types";

const MenuItem = ({ onClick, label, icon }) => {
  return (
    <div
      className=" px-3 py-2 hover:bg-neutral-100 transition font-semibold"
      onClick={onClick}
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {label}
        {icon}
      </div>
    </div>
  );
};

MenuItem.prototype = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default MenuItem;
