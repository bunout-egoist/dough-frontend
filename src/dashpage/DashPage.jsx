import React, { useEffect } from "react";
import styles from './styles.css';
import $ from "jquery";
import Calendar from "./Calendar";
import Navbar from "../navbar/Navbar";
export default function DashPage() {
  return(
    <div className="dash-page page-area">
      <div className="dash-top">
        <div className="dash-title">
          나의 미션 모아보기
        </div>
        <div className="clear-flex-row">
          <div className="clear-count-box clear-count-box-1">
            <div className="clear-title">완료한 미션</div>
            <div className="clear-cnt blue-txt">50개</div>
          </div>
          <div className="clear-count-box">
            <div className="clear-title">완료한 스페셜 미션</div>
            <div className="clear-cnt orange-txt">3개</div>
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
          <div className="bottom-result orange-txt">#요일</div>
        </div>
        <div className="flex-row">
          <div className="bottom-txt">이번달 평균 달성률은</div>
          <div className="bottom-result orange-txt">##%</div>
        </div>
      </div>
      
    </div>
  );
}
