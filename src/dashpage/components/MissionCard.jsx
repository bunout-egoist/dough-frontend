import React from "react";
import { useState, useEffect } from "react";
export default function MissionCard({pictureState, text}){
    const [isPicture,setIsPicture]=useState(false);
    useEffect(() => {
        if (pictureState === 1) {
            setIsPicture(true);
        } else{
            setIsPicture(false);
        }
    }, [pictureState]);
    return(
        <div>
            <div className="detail-mission">
                <div className="mission-type">스페셜퀘스트</div>
                <div className="mission-subtxt">점심시간, 마음이 편안해지는 노래 들으면서</div>
                <div className="mission-title">{text}</div>
                <div className={`mission-image ${isPicture === false ? "no-mission-img" : ""}`}>
                    <img src="https://contents.creators.mypetlife.co.kr/content/uploads/2020/08/24174813/202008242Ffd681125c5d376872a8409ef8de6a13a.jpg" alt="" className="img-width"/>
                </div>
            </div>
        </div>
    );
}