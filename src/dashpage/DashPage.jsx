import React, { useEffect } from "react";
import styles from './styles.css';
import $ from "jquery";
import Calendar from "./Calendar";
import Navbar from "../navbar/Navbar";
export default function DashPage() {
  return(
    <div className="dash-page">
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
        <div className="today-month">
          <div className="display-flex">
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.725 10.0001L10.075 17.3501C10.325 17.6001 10.4458 17.8918 10.4375 18.2251C10.4292 18.5584 10.3 18.8501 10.05 19.1001C9.8 19.3501 9.50833 19.4751 9.175 19.4751C8.84167 19.4751 8.55 19.3501 8.3 19.1001L0.6 11.4251C0.4 11.2251 0.25 11.0001 0.15 10.7501C0.05 10.5001 0 10.2501 0 10.0001C0 9.75011 0.05 9.50011 0.15 9.25011C0.25 9.00011 0.4 8.77511 0.6 8.57511L8.3 0.87511C8.55 0.62511 8.84583 0.504277 9.1875 0.51261C9.52917 0.520944 9.825 0.65011 10.075 0.90011C10.325 1.15011 10.45 1.44178 10.45 1.77511C10.45 2.10844 10.325 2.40011 10.075 2.65011L2.725 10.0001Z" fill="#8C96A4"/>
            </svg>
          </div>
          <div className="month-txt">6월</div>
          <div className="display-flex">
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.275 9.99989L0.924999 2.64989C0.674999 2.39989 0.554165 2.10822 0.562498 1.77489C0.570832 1.44156 0.699998 1.14989 0.949998 0.89989C1.2 0.64989 1.49167 0.52489 1.825 0.52489C2.15833 0.52489 2.45 0.64989 2.7 0.89989L10.4 8.57489C10.6 8.77489 10.75 8.99989 10.85 9.24989C10.95 9.49989 11 9.74989 11 9.99989C11 10.2499 10.95 10.4999 10.85 10.7499C10.75 10.9999 10.6 11.2249 10.4 11.4249L2.7 19.1249C2.45 19.3749 2.15417 19.4957 1.8125 19.4874C1.47083 19.4791 1.175 19.3499 0.925 19.0999C0.675 18.8499 0.55 18.5582 0.55 18.2249C0.55 17.8916 0.675 17.5999 0.925 17.3499L8.275 9.99989Z" fill="#8C96A4"/>
            </svg>
          </div>
        </div>
        <div className="cal-mission">6월, 모든 미션을 완료한 날은 <span className="bold-txt orange-txt">7번</span>이에요!<br/>조금만 더 힘내세요!</div>
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
