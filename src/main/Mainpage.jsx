import React, { useState, useEffect } from "react";
import styles from "./main.css";
import MissionBox from "./components/Missionbox";
import { Link } from "react-router-dom";
import RoundSlide from "./components/RoundSlide";
import { useRef } from "react";
export default function Mainpage() {
  const initialMissions = [
    {
      id: 1,
      backgroundColor: "#FF7A2F",
      isChecked: false,
      missionText: "노래 들으면서 10분 산책하기",
      status: "",
    },
    {
      id: 2,
      backgroundColor: "#8FBCFF",
      isChecked: false,
      missionText: "노래 들으면서 20분 춤추기",
      status: "",
    },
    {
      id: 3,
      backgroundColor: "#FFC13A",
      isChecked: false,
      missionText: "노래 들으면서 50분 디제잉하기",
      status: "",
    },
  ];

  const [missions, setMissions] = useState(initialMissions);
  const [activeMissionId, setActiveMissionId] = useState(null);
  const [isRoundSlideVisible, setIsRoundSlideVisible] = useState(false);


  useEffect(() => {
    if (isRoundSlideVisible) {
      // Scroll to the bottom of the page when RoundSlide is visible
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      document.body.style.overflowY = "hidden"; // Prevent scrolling
  
    } else {
      document.body.style.overflowY = "auto"; // Allow scrolling again
    }
  }, [isRoundSlideVisible]);

  const handleMissionCheck = (id) => {
    setActiveMissionId(id);
    setIsRoundSlideVisible(true);

    setMissions((prevMissions) =>
      prevMissions.map((mission) =>
        mission.id === id
          ? { ...mission, isChecked: !mission.isChecked, status: "now-clicked" }
          : {
              ...mission,
              status: mission.status === "now-clicked" ? "" : mission.status,
            }
      )
    );
  };

  const handleRoundSlideSubmit = ({ missionId, selectedName }) => {
    console.log({
      missionId,
      selectedName,
    });

    setIsRoundSlideVisible(false);

    setMissions((prevMissions) =>
      prevMissions.map((mission) =>
        mission.id === missionId
          ? { ...mission, status: "finished" }
          : mission
      )
    );

    setActiveMissionId(null);
  };

  const sortedMissions = [...missions].sort((a, b) => {
    if (a.status === "now-clicked" && b.status !== "now-clicked") {
      return -1; // Move "now-clicked" missions to the top
    }
    if (a.status !== "now-clicked" && b.status === "now-clicked") {
      return 1; // Keep "now-clicked" missions at the top
    }
    // If both statuses are the same, maintain their original order
    return 0;
  });

  return (
    <div className={`mainpage page-area ${isRoundSlideVisible ? 'mainpage-padding' :'' }`}>
      {isRoundSlideVisible && (
        <RoundSlide
          onSubmit={handleRoundSlideSubmit}
          selectedMissionId={activeMissionId}
        />
      )}
      <div className="mainpage-real">
        <Link to="/level">
          <div className="mainpage-level-landing">
            <div className="mainpage-level-num">
              레벨2
              <svg
                width="4"
                height="8"
                viewBox="0 0 4 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.98495 4.00566L0.136119 1.15699C0.043897 1.06466 -0.00332526 0.962489 -0.00554748 0.850489C-0.00765859 0.7386 0.0395636 0.634322 0.136119 0.537656C0.232786 0.4411 0.336008 0.392822 0.445786 0.392822C0.555563 0.392822 0.660619 0.442989 0.760952 0.543323L3.85162 3.63382C3.90284 3.6896 3.94129 3.74821 3.96695 3.80966C3.99262 3.8711 4.00545 3.93755 4.00545 4.00899C4.00545 4.08043 3.99262 4.14688 3.96695 4.20832C3.94129 4.26977 3.90284 4.32616 3.85162 4.37749L0.760952 7.46799C0.664952 7.56399 0.56373 7.61032 0.457286 7.60699C0.350952 7.60355 0.249453 7.55354 0.152786 7.45699C0.0562303 7.36032 0.00795248 7.2571 0.00795248 7.14732C0.00795248 7.03755 0.0562303 6.93432 0.152786 6.83766L2.98495 4.00566Z"
                  fill="#FF7A2F"
                />
              </svg>
            </div>
            <div className="mainpage-level-txt">출석 포인트 받기</div>
          </div>
        </Link>
        <div className="mainpage-title">
          오늘 퀘스트는
          <br />
          <span className="mission-tag1">#밖에서</span>
          <span className="mission-tag2"> #혼자</span> 할 수 있어요!
        </div>
        <div className="mainpage-img">
          <img
            src="/images/main/main_icon.png"
            className="img-width"
            alt="Main icon"
          />
        </div>
        <div className="mainpage-mission-zone">
          {sortedMissions.map((mission) => (
            <MissionBox
              key={mission.id}
              backgroundColor={mission.backgroundColor}
              isChecked={mission.isChecked}
              missionText={mission.missionText}
              status={mission.status} // Pass the status prop
              onCheck={() => handleMissionCheck(mission.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
