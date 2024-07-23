import React from "react";
import styles from "./intro.css";
export default function Intro(){
    return(
        <div className="intropage">
            <div className="intropage-title">DOUGHDOUGH</div>
            <div>블라블라</div>
            <div className="profile-img"><img src="/images/type/type1_icon.png" className="img-width"/></div>
            <div className="intropage-kakao">
                <div className="intropage-kakao-img">
                <img src="/images/intro/kakao.png" className="img-width" alt="image"/>
                </div>
            </div>
            <div>서비스 둘러보기</div>
        </div>
    );
}