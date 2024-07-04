import React from "react";

export default function ThisWeek() {
    return(
        <div>
            <div className="this-week">
                <div className="this-week-day">
                    <div className="day-txt">월</div>
                    <div className="day-date">2</div>
                </div>
                <div className="this-week-day">
                    <div className="day-txt">화</div>
                    <div className="day-date day-mission-2">3</div>
                </div>
                <div className="this-week-day ">
                    <div className="day-txt">수</div>
                    <div className="day-date day-mission-3">4</div>
                </div>
                <div className="this-week-day today">
                    <div className="day-txt">목</div>
                    <div className="day-date">5</div>
                </div>
                <div className="this-week-day">
                    <div className="day-txt">금</div>
                    <div className="day-date">6</div>
                </div>
                <div className="this-week-day">
                    <div className="day-txt">토</div>
                    <div className="day-date">7</div>
                </div>
                <div className="this-week-day">
                    <div className="day-txt">일</div>
                    <div className="day-date day-mission-1">8</div>
                </div>
            </div>
        </div>
    );
}