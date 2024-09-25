import React from "react";
import "./Stack.scss";
import SvgIcon from "@mui/material/SvgIcon";
import { LinearProgress, Tooltip } from "@mui/material";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Stack = ({
  id,
  icon,
  className,
  desc,
  label,
  idx,
  value = 50,
  component,
  entity,
}) => {
  return (
    <div className="custom-stack" key={idx}>
      <div className="stack-id-value">{id}</div>
      <div className="stack-icon">{icon}</div>
      <div className="stack-details">
        <span className="stack-label">{label}</span>
        <span className="stack-desc">{desc}</span>
      </div>
      <div className="stack-entity-child">{entity}</div>
      <div className="stack-first-child">{component}</div>
      <div className="stack-progress">
        <Tooltip
          describeChild
          placement="top"
          arrow
          title={`${value}% completed`}
          enterDelay={1000}
        >
          <LinearProgress
            color={
              value > 90
                ? "success"
                : value > 70
                ? "primary"
                : value > 40
                ? "warning"
                : "error"
            }
            variant="determinate"
            value={value}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Stack;
