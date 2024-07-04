import React from "react";
import styles from "./type.css";
export default function About(){
    return(
        <div className="aboutpage">
            <div className="about-title">
                <img src="/images/intro/type1_title.png" className="img-width" alt="image"/>
            </div>
            <div className="about-icon">
                <img src="/images/intro/type1_icon.png" className="img-width" alt="image"/>
            </div>
            <div className="about-txt">
                <img src="/images/intro/about_type1.png" className="img-width" alt="image"/>
            </div>
            <div className="aboutpage-btn">
                선택하기
            </div>
        </div>
    );
}