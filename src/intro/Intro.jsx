import React from "react";
import styles from "./intro.css";
import { Route } from "react-router-dom";
import Redirection from "./Redirection";
export default function Intro(){
    const REST_API_KEY = '3abc01eba80718573dbc9e7098b54ee1';
    const REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/kakao';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const code = new URL(dococument.location.toString()).searchParams.get('code');
    const loginHandler = () => {
        window.location.href = link;
    };
    return(
        <div className="intropage">
            <Route exact path="/login/oauth2/code/kakao" element={<Redirection/>}/>
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