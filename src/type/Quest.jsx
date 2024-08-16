import React from "react";
import styles from "./quest.css";
import { useState } from "react";
export default function Quest() {
    const [questNum, setQuestNum] = useState(null);
    return(
        <div className="questpage">
            <div className="type-name">호빵형</div>
            <div>
                <div className="questpage-title">이름 같은 분에게 추천하는 행동이에요.</div>
                <div><img src="/images/type/quest-title.png" className="img-width"/></div>
            </div>
            <div className="fixed-quest-area">
                <div className={`fixed-quest-box ${questNum === 1 ? "fixed-quest-box-1" : ""}`} 
                    onClick={() => {
                        setQuestNum(1);
                        }}>
                    <div className="quest-sub-txt">점심시간, 몸과 마음을 건강하게 유지하며</div>
                    <div className="quest-txt">기상 후, 5분간 스트레칭하기</div>
                </div>
                <div className={`fixed-quest-box ${questNum === 2 ? "fixed-quest-box-2" : ""}`} 
                    onClick={() => {
                        setQuestNum(2);
                        }}>
                    <div className="quest-sub-txt">점심시간, 몸과 마음을 건강하게 유지하며</div>
                    <div className="quest-txt">기상 후, 5분간 스트레칭하기</div>
                </div>
                <div className={`fixed-quest-box ${questNum === 3 ? "fixed-quest-box-3" : ""}`} 
                    onClick={() => {
                        setQuestNum(3);
                        }}>
                    <div className="quest-sub-txt">점심시간, 몸과 마음을 건강하게 유지하며</div>
                    <div className="quest-txt">기상 후, 5분간 스트레칭하기</div>
                </div>
                <div className={`fixed-quest-box ${questNum === 4 ? "fixed-quest-box-4" : ""}`} 
                    onClick={() => {
                        setQuestNum(4);
                        }}>
                    <div className="quest-sub-txt">점심시간, 몸과 마음을 건강하게 유지하며</div>
                    <div className="quest-txt">기상 후, 5분간 스트레칭하기</div>
                </div>
            </div>
            <div className="questpage-btn-area">
                <div className={`questpage-btn ${questNum >= 1 ? "questpage-btn-active" : ""}`}>완료하기</div>
            </div>
        </div>
    );
}