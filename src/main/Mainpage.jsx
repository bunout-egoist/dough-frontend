import React from "react";
import styles from "./main.css";
export default function Mainpage(){
    return(
        <div className="mainpage">
            <div>오늘 퀘스트는<br/><span className="mission-tag1">#밖에서</span><span className="mission-tag2">혼자</span> 할 수 있어요!</div>
            <div>
                <div>레벨 5</div>
                <div className="outer">
                    <div className="inner"></div>
                </div> 
            </div>
            <div><img src=""/></div>
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}