import React from "react";

export default function Signout(){
    return(
        <div className="signout-page">
            <div className="signout-pos">
                <div className="signout-box">
                    <div><img src="/images/setting/signout.png" className="img-width"/></div>
                    <div className="signout-btn">탈퇴하기</div>
                    <div className="signout-exit">취소</div>
                </div>
            </div>
        </div>
    );    
}