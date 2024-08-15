import React from "react";

export default function MissionBox({ backgroundColor, isChecked, onCheck, missionText}) {
    return (
        <div
            className={`mainpage-mission-box ${isChecked ? "mission-checked" : ""}`}
            style={{ backgroundColor }}
        >
            <div>
                <div className="mission-tag-flex">
                    <div
                        className={`mission-tag ${isChecked ? "mission-tag-checked" : ""}`}
                        style={{ color: backgroundColor }}
                    >
                        #혼자
                    </div>
                    <div
                        className={`mission-tag ${isChecked ? "mission-tag-checked" : ""}`}
                        style={{ color: backgroundColor }}
                    >
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
                    className={`mainpage-mission-check ${isChecked ? "mission-checkbox-checked" : ""}`}
                    checked={isChecked}
                    onChange={onCheck}
                />
            </div>
        </div>
    );
}
