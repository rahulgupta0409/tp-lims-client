import React from "react";
import PropTypes from "prop-types";

const Heading = ({ title, subtitle, center, style }) => {
  return (
    <div style={style}>
      <div className={center ? "text-center" : "text-start"}>
        <div className="text-2xl font-bold">{title}</div>
        <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
      </div>
    </div>
  );
};

Heading.propTypes = {
  center: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Heading;
