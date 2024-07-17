import React from "react";
import styles from "./main.css";
export default function Mainpage(){
    return(
        <div className="mainpage">
            <div className="mainpage-title">오늘 퀘스트는<br/><span className="mission-tag1">#밖에서</span><span className="mission-tag2">혼자</span> 할 수 있어요!</div>
            <div className="mainpage-level">
                <div className="mainpage-level-title">레벨 5</div>
                <div className="outer">
                    <div className="inner"></div>
                </div> 
            </div>
            <div className="mainpage-img"><img src="/images/main/main_icon.png" className="img-width"/></div>
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}