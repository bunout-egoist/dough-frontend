import React from "react";
import { useState } from "react";
export default function MissionBox({backgroundColor}){
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return(
        <div className={`mainpage-mission-box ${isChecked ? "mission-checked" : ""}`} style={{ backgroundColor }}>
            <div>
                <div className="mission-tag-flex">
                    <div className={`mission-tag ${isChecked ? "mission-tag-checked" : ""}`} style={{ color : backgroundColor }}>#혼자</div>
                    <div className={`mission-tag ${isChecked ? "mission-tag-checked" : ""}`} style={{ color : backgroundColor }}>#밖에서</div>
                </div>
                <div className={`mission-title ${isChecked ? "mission-checked" : ""}`} >노래 들으면서 10분 산책하기</div>
            </div>
            <div className="mainpage-mission-checkbox"  
                checked={isChecked}
                onChange={handleCheckboxChange}><input type="checkbox" className={`mainpage-mission-check ${isChecked ? "mission-checkbox-checked" : ""}`}/></div>
        </div>
    );
}