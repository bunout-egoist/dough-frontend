import React, { useEffect } from "react";
import styles from './styles.css';
import $ from "jquery";
import Calendar from "./Calendar";
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
            <div className="clear-cnt clear-cnt-1">50개</div>
          </div>
          <div className="clear-count-box">
            <div className="clear-title">완료한 스페셜 미션</div>
            <div className="clear-cnt clear-cnt-2">3개</div>
          </div>
        </div>
      </div>
      <div className="dash-calendar">
        <div className="mini-title">월간분석</div>
        <div className="cal-mission">6월, 모든 미션을 완료한 날은 7번이에요!<br/>조금만 더 힘내세요!</div>
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
          <div className="bottom-result">#요일</div>
        </div>
        <div className="flex-row">
          <div className="bottom-txt">이번달 평균 달성률은</div>
          <div className="bottom-result">##%</div>
        </div>
      </div>
      
    </div>
  );
}
