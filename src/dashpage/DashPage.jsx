import React, { useEffect, useState } from "react";
import styles from './dash.css';
import $ from "jquery";
import Calendar from "./Calendar";
import Navbar from "../navbar/Navbar";


export default function DashPage() {
  const [highest, setHighest] = useState(0);
  const [average, setAverage] = useState(0);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [specialTotal, setSpecialTotal] = useState(0);

  fetch(`/api/v1/dashboard/total`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYW51bmE1MzBAZ21haWwuY29tIiwiaWF0IjoxNzI1OTI5MDU5LCJleHAiOjE3NTcwMzMwNTksInN1YiI6IjEifQ.PIR_AE7VHLoUTU2pJzbIUE3UCabd4O4iDYObPvCPExQ',
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    setDailyTotal(data.dailyTotal);
    setSpecialTotal(data.specialTotal);
    setHighest(data.highestAverageCompletionDay);
    setAverage(data.averageCompletion);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  return(
    <div className="dash-page page-area">
      <div className="dash-top">
        <div className="dash-title">
          나의 미션 모아보기
        </div>
        <div className="clear-flex-row">
          <div className="clear-count-box clear-count-box-1">
            <div className="clear-title">완료한 미션</div>
            <div className="clear-cnt blue-txt">{dailyTotal}개</div>
          </div>
          <div className="clear-count-box">
            <div className="clear-title">완료한 스페셜 미션</div>
            <div className="clear-cnt orange-txt">{specialTotal}개</div>
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
          <div className="bottom-result orange-txt">{highest}요일</div>
        </div>
        <div className="flex-row">
          <div className="bottom-txt">이번달 평균 달성률은</div>
          <div className="bottom-result orange-txt">{average}%</div>
        </div>
      </div>
      
    </div>
  );
}
