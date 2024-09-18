import React, { useEffect } from "react";
import Nickname from './../settings/Nickname';
import styles from './finish.css'
import { useNavigate } from "react-router-dom";
export default function FinishSign() {
    const navigate =useNavigate();
    const nickname = localStorage.getItem('nickname');
    useEffect(() => {
        // setTimeout 함수의 올바른 사용법
        const timer = setTimeout(() => {
            navigate('/main'); // 3초 후에 '/main'으로 이동
        }, 3800);

        // 컴포넌트가 언마운트될 때 타이머를 정리
        return () => clearTimeout(timer);
    }, [navigate]);
    return(
        <div className="finishSign">
            <div className="finishsign-title">
                {nickname}님!<br/>
                회원가입이 완료되었어요!🥳
            </div>
            <div className="finishsign-img"><img src="/images/finish.gif" className="img-width"/></div>
            <div className="finishsign-subtxt">
                3초 뒤에 홈화면으로 이동할게요!
            </div>
        </div>
    );
}