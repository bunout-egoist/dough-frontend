import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../tutorial.css";
export default function Finish() {
    const navigate = useNavigate();
    const clickSign=() =>{
        navigate('/');
    }
    return (
        <div className="finish-area">
            <div className="gif-area">
               <div className="pos-rel">
                <img src="/images/tutorial/finish.gif" className="finish-gif finish-gif-1"/>
                <img src="/images/tutorial/finish.gif" className="finish-gif finish-gif-2"/>
               </div>
            </div>
            <div className="finish-box">
            <div>
                <div className="finish-title">튜토리얼 완료 !</div>
                <div className="finish-txt">
                    축하합니다 ! <br/>
                    튜토리얼을 완수했어요
                    <br/><br/>
                    켜켜이 모인 퀘스트들은<br/>
                    번아웃을 극복하는 힘이 될 거예요.<br/>
                    <br/>
                    나만의 번아웃 유형선택을 하고<br/>
                    맞춤 퀘스트를 받아보아요.<br/>
                </div>
            </div>
            <div className="finish-btn"><button onClick={clickSign}>회원가입 하러가기</button></div>
        </div>
        </div>
    );
}