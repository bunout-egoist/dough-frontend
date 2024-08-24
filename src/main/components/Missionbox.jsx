import React from "react";
import PropTypes from "prop-types";

export default function MissionBox({
  backgroundColor,
  isChecked,
  onCheck,
  missionText,
  status, // New prop to manage mission state
}) {
  // Determine the class names based on the status and isChecked
  const boxClassName = `mainpage-mission-box ${
    status === "now-clicked" ? "mission-now-clicked" : ""
  } ${status === "finished" ? "mission-finished" : ""} ${
    isChecked ? "mission-checked" : ""
  }`;

  const tagClassName = `mission-tag ${isChecked ? "mission-tag-checked" : ""}`;

  return (
    <div className={boxClassName} style={{ backgroundColor }}>
      <div>
        <div className="mission-tag-flex">
          <div className={tagClassName} style={{ color: backgroundColor }}>
            #혼자
          </div>
          <div className={tagClassName} style={{ color: backgroundColor }}>
            #밖에서
          </div>
        </div>
        <div className={`mission-title ${isChecked ? "mission-checked" : ""}`}>
          {missionText}
        </div>
      </div>
      <div className="mainpage-mission-checkbox">
        <input
          type="checkbox"
          className={`mainpage-mission-check ${
            isChecked ? "mission-checkbox-checked" : ""
          }`}
          checked={isChecked}
          onChange={onCheck}
        />
      </div>
    </div>
  );
}

// Define PropTypes for validation
MissionBox.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  missionText: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired, // Add the status prop
};
