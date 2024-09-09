import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const Inpu = ({
  className = "",
  name = "",
  type = "text",
  placeholder = "",
  onChange,
  disabled = false,
  title = "",
  ...restProps
}) => {
  return (
    <div className="input-row">
      <div className="label">{title}</div>
      <input
        {...restProps}
        className={className}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default Inpu;

Inpu.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};
