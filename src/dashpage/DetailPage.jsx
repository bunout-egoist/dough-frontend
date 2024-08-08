import React from "react";
import Navbar from "../navbar/Navbar";
import MissionCard from "./components/MissionCard";
import ThisWeek from "./components/ThisWeek";

export default class DetailPage extends React.Component {
    render() {
        const path = window.location.pathname; // 전체 URL 경로
        const day = path.split("/").pop(); // URL에서 마지막 부분을 가져옴
        const datdate = day.slice(-5,-3);
        const weekdayEng = day.slice(-3);
        const weekdayKor = {
            Mon: "월",
            Tue: "화",
            Wed: "수",
            Thu: "목",
            Fri: "금",
            Sat: "토",
            Sun: "일"
        }[weekdayEng] || "알 수 없는 요일";
        console.log(weekdayKor,datdate);
    
        return (
            <div className="detail-page">
            <div className="detail-top">
                <div className="top-title">주변 달성률</div>
                <div className="this-week">
                    <div className="this-week-day">
                        <div className="day-txt">월</div>
                        <div className="day-date">{Number(datdate)-3}</div>
                    </div>
                    <div className="this-week-day">
                        <div className="day-txt">화</div>
                        <div className="day-date day-mission-2">{Number(datdate)-2}</div>
                    </div>
                    <div className="this-week-day ">
                        <div className="day-txt">목</div>
                        <div className="day-date day-mission-3">{Number(datdate)-1}</div>
                    </div>
                    <div className="this-week-day today">
                        <div className="day-txt">{weekdayKor}</div>
                        <div className="day-date">{Number(datdate)}</div>
                    </div>
                    <div className="this-week-day">
                        <div className="day-txt">금</div>
                        <div className="day-date">{Number(datdate)+1}</div>
                    </div>
                    <div className="this-week-day">
                        <div className="day-txt">토</div>
                        <div className="day-date">{Number(datdate)+2}</div>
                    </div>
                    <div className="this-week-day">
                        <div className="day-txt">일</div>
                        <div className="day-date day-mission-1">{Number(datdate)+3}</div>
                    </div>
                </div>
            </div>
            <div className="detail-bottom">
                <MissionCard />
                <MissionCard />
            </div>
            <div className="navbar-area">
                <div className="navbar-icon">
                    <img src="/images/navbarImage/chart.png" alt="이미지" className="img-width" />
                </div>
                <div className="navbar-icon">
                    <img src="/images/navbarImage/home.png" alt="이미지" className="img-width" />
                </div>
                <div className="navbar-icon">
                    <img src="/images/navbarImage/setting.png" alt="이미지" className="img-width" />
                </div>
            </div>
        </div>
        );
    }
}
