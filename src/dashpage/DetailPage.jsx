import React from "react";
import Navbar from "../navbar/Navbar";
import MissionCard from "./components/MissionCard";
import ThisWeek from "./components/ThisWeek";
export default function DetailPage(){
    return(
        <div className="detail-page">
            <div className="detail-top">
                <div className="top-title">
                    주변 달성률
                </div>
                <ThisWeek />
            </div>
            <div className="detail-bottom">
              <MissionCard />
              <MissionCard />
            </div>
            <div className="navbar-area">
                <div className="navbar-icon">
                    <img src="/images/navbarImage/chart.png" alt="이미지" className="img-width"/>
                </div>
                <div className="navbar-icon">
                    <img src="/images/navbarImage/home.png" alt="이미지" className="img-width"/>
                </div>
                <div className="navbar-icon">
                    <img src="/images/navbarImage/setting.png" alt="이미지" className="img-width"/>
                </div>
            </div>
        </div>
    
    );
}