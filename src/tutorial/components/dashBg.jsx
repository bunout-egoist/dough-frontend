import React, { useEffect, useState } from "react";
import styles from '../../dashpage/dash.css';
import $ from "jquery";
import Calendar from "../../dashpage/Calendar";
import Navbar from '../../navbar/Navbar';
import { useNavigate } from "react-router-dom";

export default function DashBg() {
    const navigate = useNavigate();
    // 토큰 받기
    const [accessToken, setAccessToken] = useState(null);
    // 토큰을 useEffect를 통해 로컬스토리지에서 가져옴
  useEffect(()=>{
    const token = localStorage.getItem("accessToken");
    if (token) {
    setAccessToken(token);
    } else {
    console.error("Access token is not available");
    }
  },[])

  
 
  return(
    <div className="dash-page page-area">
      <div className="dash-top">
        <div className="dash-title">
          나의 미션 모아보기
        </div>
        <div className="clear-flex-row">
          <div className="clear-count-box clear-count-box-1">
            <div className="clear-title">완료한 미션</div>
            <div className="clear-cnt blue-txt">15개</div>
          </div>
          <div className="clear-count-box">
            <div className="clear-title">완료한 스페셜 미션</div>
            <div className="clear-cnt orange-txt">10개</div>
          </div>
        </div>
      </div>
      <div className="dash-calendar">
        <div className="mini-title">월간분석</div>
       
        <Calendar/>
        <div className="whats-color">
          <div className="mini-title">
            색상의 의미는?
          </div>
          <div className="whats-color-img">
            <img src="/images/color.png" alt="image" className="img-width"/>
          </div>
        </div>
      </div>
      <div className="dash-bottom">
        <div className="mini-title">통계</div>
        <div className="flex-row">
          <div className="bottom-txt">이번 달 가장 열정적인 요일은</div>
          <div className="bottom-result orange-txt">화요일</div>
        </div>
        <div className="flex-row">
          <div className="bottom-txt">이번달 평균 달성률은</div>
          <div className="bottom-result orange-txt">25%</div>
        </div>
      </div>
      
    </div>
  );
}
