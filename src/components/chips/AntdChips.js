import React from "react";

import { Select, Tag } from "antd";
const options = [
  {
    value: "admin",
  },
  {
    value: "user",
  },
  //   {
  //     value: "viewer",
  //   },
  //   {
  //     value: "cyan",
  //   },
];
const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color="cyan"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginInlineEnd: 4,
      }}
    >
      {label}
    </Tag>
  );
};

const AntdChips = () => {
  return (
    <Select
      mode="multiple"
      tagRender={tagRender}
      defaultValue={["gold", "cyan"]}
      style={{
        width: "100%",
      }}
      options={options}
    />
  );
};

export default AntdChips;
