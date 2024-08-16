import React from "react";
import MissionCard from "./components/MissionCard";

export default class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        
        const path = window.location.pathname; // 전체 URL 경로
        const day = path.split("/").pop(); 
        const datdate = day.slice(0,-3);
        const weekday = day.slice(-3);
        const weekdayKorIndex = {
            Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6
        }[weekday];

        const year = parseInt(`20${datdate.slice(0, 2)}`, 10); // '24' => 2024년
        const month = parseInt(datdate.slice(2, 4), 10) - 1; // '08' => 7월 (Date 객체에서 월은 0부터 시작)
        const dayOfMonth = parseInt(datdate.slice(4, 6), 10); // '01' => 1일

        // 기준 날짜를 Date 객체로 저장
        this.state = {
            baseDate: new Date(year, month, dayOfMonth),
            baseWeekday: weekdayKorIndex
        };
    }

    handleDayClick = (offset) => {
        const newBaseDate = new Date(this.state.baseDate);
        newBaseDate.setDate(this.state.baseDate.getDate() + offset);

        this.setState({
            baseDate: newBaseDate,
            baseWeekday: (this.state.baseWeekday + offset + 7) % 7 // 요일이 순환하도록
        });
    }

    getDayWithOffset = (offset) => {
        const weekName = ['월', '화', '수', '목', '금', '토', '일'];
        const index = (this.state.baseWeekday + offset + 7) % 7;
        return weekName[index];
    }

    getFormattedDate = (date) => {
        const year = date.getFullYear().toString().slice(2); // 2024 => '24'
        const month = (`0${date.getMonth() + 1}`).slice(-2); // 월은 0부터 시작하므로 +1 필요
        const day = (`0${date.getDate()}`).slice(-2); // 일자를 2자리로 맞춤
        return `${day}`;
    }

    render() {
        const { baseDate } = this.state;
        return (
            <div className="detail-page page-area">
                <div className="detail-top">
                    <div className="top-title">주변 달성률</div>
                    <div className="this-week">
                        {[...Array(7)].map((_, i) => {
                            const offsetDate = new Date(baseDate);
                            offsetDate.setDate(baseDate.getDate() + (i - 3)); // 중심일을 기준으로 오프셋
                            return (
                                <div
                                    key={i}
                                    className={`this-week-day ${i === 3 ? 'today' : ''}`}
                                    onClick={() => this.handleDayClick(i - 3)}
                                >
                                    <div className="day-txt">{this.getDayWithOffset(i - 3)}</div>
                                    <div className="day-date">{this.getFormattedDate(offsetDate)}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="detail-bottom">
                    <MissionCard pictureState={0}  />
                    <MissionCard pictureState={1}  />
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
