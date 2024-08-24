import * as React from "react";

const ListCellRenderer = (props) => {
  const { value } = props;
  console.log("value", props);
  if (!value || !Array.isArray(value)) {
    return null;
  }

  return (
    <ul>
      {value.map((item, index) => (
        <li key={index}>
          {item.key}: {item.value}
        </li>
      ))}
    </ul>
  );
};
export default ListCellRenderer;
