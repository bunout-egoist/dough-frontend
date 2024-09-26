import React from "react";
import styles from "./pop.css";
export default function IntroPop({ onClose }){
    return(
        <div className="popup-bg">
            <div className="popup-box">
                <div className="popup-content"><img src="/images/popup/intro.png" className="img-width"/></div>
                <div className="popup-btn" onClick={onClose}>확인</div>
            </div>
        </div>
    );
}