import React from "react";
import "./Toggle.css";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Tooltip from "@mui/material/Tooltip";

const Toggle = ({ handleChange, isChecked }) => {
  const tooltipText = isChecked ? "Dark Mode" : "Light Mode";

  return (
    <div className="toggle-container">
      <Tooltip title={tooltipText} placement="top">
        <input
          type="checkbox"
          id="check"
          className="toggle"
          onChange={handleChange}
          checked={isChecked}
        />
      </Tooltip>
      <label htmlFor="check">
        {isChecked ? (
          <Tooltip title={tooltipText} placement="top">
            <DarkModeIcon className="moon" />
          </Tooltip>
        ) : (
          <Tooltip title={tooltipText} placement="top">
            <WbSunnyIcon className="sun" />
          </Tooltip>
        )}
      </label>
    </div>
  );
};

export default Toggle;
