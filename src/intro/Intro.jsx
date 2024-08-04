import React from "react";
import styles from "./intro.css";
export default function Intro(){
    const REST_API_KEY = '3abc01eba80718573dbc9e7098b54ee1';
    const REDIRECT_URI = 'http://localhost:3000/oauth2/callback/kakao';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
   
    const loginHandler = () => {
        window.location.href = link;
    };
    return(
        <div className="intropage">
            <div className="intropage-title">DOUGHDOUGH</div>
            <div>블라블라</div>
            <div className="profile-img"><img src="/images/type/type1_icon.png" className="img-width"/></div>
            <div className="intropage-kakao">
                <div className="intropage-kakao-img" onClick={loginHandler}>
                    <img src="/images/intro/kakao.png" className="img-width" alt="image"/>
                </div>
            </div>
            <div>서비스 둘러보기</div>
        </div>
    );
}