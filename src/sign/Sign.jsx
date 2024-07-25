import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./sign.css";
export default function Sign(){
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [isToggle, setIsToggle] = useState(false)
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const handleToggleChange = () => {
        setIsToggle(!isToggle);
    };
    const handleButtonClick=()=>{
        if (isChecked) {
            navigate('/sign/info')
        }
    }
    return(
        <div className="signpage">
            <div className="signpage-title">서비스 이용을 위해<br/>아래 <span className="bold-txt">항목에 동의</span>해주세요.</div>
            <div className="signpage-check-area">
                <div className="sign-checkbox">
                    <input
                        type="checkbox"
                        id="privacy-agreement"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="privacy-agreement"></label>
                </div>
                <div>[필수] 개인정보 수집 및 이용목적 동의</div>
                <div className="notice-open-btn"  onClick={handleToggleChange}><img src="/images/toggle.png" /></div>
            </div>
            <div className={`notice-box ${isToggle ? "show-notice" : ""}`}>
                <img src="/images/intro/sign-notice.png" className="img-width"/>
            </div>
            <div className="signpage-btn-area">
                <div onClick={handleButtonClick} className={`signpage-btn ${isChecked ? "btn-active" : ""}`}>
                    동의하고 시작하기
                </div>
            </div>
        </div>
    );
}