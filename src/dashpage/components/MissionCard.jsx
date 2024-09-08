import React from "react";
import { useState, useEffect } from "react";
export default function MissionCard({pictureImg, missionTitle, missionDetail, missionTag}){
    const [isPicture,setIsPicture]=useState(false);
    useEffect(() => {
        if (pictureImg !== null) {
            setIsPicture(true);
        } else{
            setIsPicture(false);
        }
    }, [pictureImg]);
    return(
        <div>
            <div className="detail-mission">
                <div className="mission-txt-flex">
                    <div className="mission-type">{missionTag}</div>
                    <div className="mission-subtxt">{missionDetail}</div>
                    <div className="mission-title">{missionTitle}</div>
                </div>
                <div className={`mission-image ${isPicture === false ? "no-mission-img" : ""}`}>
                    <img src={pictureImg} alt="" className="img-width"/>
                </div>
            </div>
        </div>
    );
}