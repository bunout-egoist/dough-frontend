import React, { useEffect } from "react";
import styles from './styles.css';
import $ from "jquery";
export default function Calendar() {
   
      return (
        <div className="container">
          <div className="calendar">
            <div className="front">
              {/* <div className="current-date">
                <h1>Friday 15th</h1>
                <h1>January 2016</h1> 
              </div> */}
    
              <div className="current-month">
                <ul className="week-days">
                  <li>월</li>
                  <li>화</li>
                  <li>수</li>
                  <li>목</li>
                  <li>금</li>
                  <li>토</li>
                  <li>일</li>
                </ul>
    
                <div className="weeks">
                  <div className="first">
                    <span className="last-month">28</span>
                    <span className="last-month">29</span>
                    <span className="last-month">30</span>
                    <span className="last-month">31</span>
                    <span>01</span>
                    <span>02</span>
                    <span>03</span>
                  </div>
    
                  <div className="second">
                    <span>04</span>
                    <span>05</span>
                    <span className="event">06</span>
                    <span>07</span>
                    <span>08</span>
                    <span>09</span>
                    <span>10</span>
                  </div>
    
                  <div className="third">
                    <span>11</span>
                    <span>12</span>
                    <span>13</span>
                    <span>14</span>
                    <span className="active">15</span>
                    <span>16</span>
                    <span>17</span>
                  </div>
    
                  <div className="fourth">
                    <span>18</span>
                    <span>19</span>
                    <span>20</span>
                    <span>21</span>
                    <span>22</span>
                    <span>23</span>
                    <span>24</span>
                  </div>
    
                  <div className="fifth">
                    <span>25</span>
                    <span>26</span>
                    <span>27</span>
                    <span>28</span>
                    <span>29</span>
                    <span>30</span>
                    <span>31</span>
                  </div>
                </div>
              </div>
            </div>
  
          </div>
        </div>
      );
}