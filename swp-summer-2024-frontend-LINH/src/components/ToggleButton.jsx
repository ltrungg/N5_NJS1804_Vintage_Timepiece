import React from "react";
import { Button } from "antd";

export default function ToggleButton({ value, name, onChange })  {
  const handleClick = (newValue) => {
    onChange({ target: { name, value: newValue } });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
      
      <Button
        type={value === "yes" ? "primary" : "default"}
        onClick={() => handleClick("yes")}
        style={{ minWidth: "205px" }}  
      >
        Yes
      </Button>
      <Button
        type={value === "no" ? "primary" : "default"}
        onClick={() => handleClick("no")}
        style={{minWidth: "205px" }} 
      >
        No
      </Button>
    </div>
  );
};


