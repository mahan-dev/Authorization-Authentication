import React from "react";

const DashboardInput = ({ name, changeHandler, placeholder, type, value }) => {
  return (
    <input
    style={{
        color: "black"
    }}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={changeHandler}
    />
  );
};

export default DashboardInput;
