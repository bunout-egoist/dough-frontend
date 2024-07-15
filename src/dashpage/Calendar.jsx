import React, { useEffect } from "react";
import styles from './styles.css';
import $ from "jquery";
export default function Calendar() {
  const monthlyMissionList = [1, 3, 3, 0, 2, 0, 3, 1, 0, 2, 0, 0, 0, 0, 1, 3, 3, 3, 2, 3, 2, 1, 1, 1, 3, 0, 3, 3, 2, 3, 1];

  useEffect(() => {
    const dates = document.querySelectorAll('.week-date');
    monthlyMissionList.forEach((missions, index) => {
      if (missions > 0) {
        const dateElement = Array.from(dates).find(el => el.textContent === String(index + 1).padStart(2, '0'));
        if (dateElement) {
          dateElement.classList.add(`active${missions}`);
        }
      }
    });
  }, []);

      return (
        <div className="container">
          <div className="calendar">
            <div className="front">
              {/* <div className="current-date">
                <h1>Friday 15th</h1>
                <h1>January 2016</h1> 
              </div> */}
    
              <div className="current-month">
                <div className="week-days">
                  <div className="week-name">월</div>
                  <div className="week-name">화</div>
                  <div className="week-name">수</div>
                  <div className="week-name">목</div>
                  <div className="week-name">금</div>
                  <div className="week-name">토</div>
                  <div className="week-name">일</div>
                </div>
    
                <div className="weeks">
                  <div className="first">
                    <div className="last-month last-month-week-date">28</div>
                    <div className="last-month last-month-week-date">29</div>
                    <div className="last-month last-month-week-date">30</div>
                    <div className="last-month last-month-week-date">31</div>
                    <div className="week-date">01</div>
                    <div className="week-date">02</div>
                    <div className="week-date">03</div>
                  </div>
    
                  <div className="second">
                    <div className="week-date">04</div>
                    <div className="week-date">05</div>
                    <div className="week-date event">06</div>
                    <div className="week-date active3">07</div>
                    <div className="week-date">08</div>
                    <div className="week-date">09</div>
                    <div className="week-date">10</div>
                  </div>
    
                  <div className="third">
                    <div className="week-date">11</div>
                    <div className="week-date active2">12</div>
                    <div className="week-date">13</div>
                    <div className="week-date">14</div>
                    <div className="week-date active1">15</div>
                    <div className="week-date">16</div>
                    <div className="week-date">17</div>
                  </div>
    
                  <div className="fourth">
                    <div className="week-date">18</div>
                    <div className="week-date">19</div>
                    <div className="week-date">20</div>
                    <div className="week-date">21</div>
                    <div className="week-date">22</div>
                    <div className="week-date">23</div>
                    <div className="week-date">24</div>
                  </div>
    
                  <div className="fifth">
                    <div className="week-date">25</div>
                    <div className="week-date">26</div>
                    <div className="week-date">27</div>
                    <div className="week-date">28</div>
                    <div className="week-date">29</div>
                    <div className="week-date">30</div>
                    <div className="week-date">31</div>
                  </div>
                </div>
              </div>
            </div>
  
          </div>
        </div>
      );
}