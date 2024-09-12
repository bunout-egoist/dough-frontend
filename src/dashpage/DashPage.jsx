import React, { useEffect, useState } from "react";
import styles from './dash.css';
import $ from "jquery";
import Calendar from "./Calendar";
import Navbar from "../navbar/Navbar";


export default function DashPage() {
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

  

  const [highest, setHighest] = useState(0);
  const [average, setAverage] = useState(0);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [specialTotal, setSpecialTotal] = useState(0);

 useEffect(()=>{
 if (accessToken){
    const fetchDashpage =(token)=>{
      fetch(`/api/v1/dashboard/total`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization':`Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.status === 401) {
          console.log('다시 발급');
            refreshAccessToken();
        } else {
            return response.json();
        }
    })
      .then(data => {
        setDailyTotal(data.dailyTotal);
        setSpecialTotal(data.specialTotal);
        setHighest(data.highestAverageCompletionDay);
        setAverage(data.averageCompletion);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }

    const refreshAccessToken = () => {
      const refreshToken = localStorage.getItem('refreshToken');
        fetch('/api/v1/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${accessToken}`,
                'RefreshToken' :`Bearer ${refreshToken}`
              },
          
        })
        .then(response => {
            if (response.status === 401) {
              console.log('다시 발급2');
                refreshAccessToken();
            } else {
                return response.json();
            }
        })
        .then(data => {
            console.log('응답?',data);
            if (data.accessToken) {
                // Store new access token and retry fetching today's quests
                localStorage.setItem('accessToken', data.accessToken);
                setAccessToken(data.accessToken);
                fetchDashpage(data.accessToken);  // Retry with new token
            } else {
                console.error('Failed to refresh access token');
            }
        })
        .catch(error => console.error('Error refreshing access token:', error));
      };
      fetchDashpage(accessToken);
 }

 },[accessToken])

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
