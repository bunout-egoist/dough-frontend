import React, { useEffect, useState } from "react";
import styles from './dash.css';
import $ from "jquery";
import Calendar from "./Calendar";
import Navbar from "../navbar/Navbar";
function connectMonth(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 사용할 URL과 토큰
    const yearMonth = "2024-09";
    const url = `/api/v1/dashboard/monthly/${yearMonth}`;
    const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYW51bmE1MzBAZ21haWwuY29tIiwiaWF0IjoxNzI1MTAzMzA5LCJleHAiOjE5ODQzMDMzMDksInN1YiI6ImdvZXVuQG1haWwuY29tIiwiaWQiOjF9.1Kjm4YlHI8gvkvQsJFxkT5LIGaVgTLVo7z97CfF_0mE";

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => setError(error));
       console.log(data);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
}
export default function DashPage() {
  const dailyTotal = 50;
  const specialTotal = 30;
 
  
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
