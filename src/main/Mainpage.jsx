import React from "react";
import styles from "./main.css";
import MissionBox from "./components/Missionbox";
export default function Mainpage(){
    return(
        <div className="mainpage">
            <div className="mainpage-title">
                오늘 퀘스트는<br/><span className="mission-tag1">#밖에서</span><span className="mission-tag2"> #혼자</span> 할 수 있어요!
            </div>
            <div className="mainpage-img">
                <img src="/images/main/main_icon.png" className="img-width" alt="Main icon"/>
            </div>
            <div className="mainpage-mission-zone">
                <MissionBox backgroundColor="#FF7A2F" />
                <MissionBox backgroundColor="#8FBCFF" />
                <MissionBox backgroundColor="#FFC13A" />
            </div>
        </div>
    );
}