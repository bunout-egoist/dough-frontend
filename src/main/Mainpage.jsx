import React, { useState, useEffect } from "react";
import RoundSlide from "./components/RoundSlide";
import { Link } from "react-router-dom";
import MissionBox from './components/Missionbox';

export default function Mainpage() {
  const [mainContents, setMainContents] = useState({});
  const [missions, setMissions] = useState([]);
  const [activeMissionId, setActiveMissionId] = useState(null);
  const [isRoundSlideVisible, setIsRoundSlideVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected image file

  useEffect(() => {
    // Fetching missions data
    fetch('/api/v1/quests/today', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYW51bmE1MzBAZ21haWwuY29tIiwiaWF0IjoxNzI1OTI5MDU5LCJleHAiOjE3NTcwMzMwNTksInN1YiI6IjEifQ.PIR_AE7VHLoUTU2pJzbIUE3UCabd4O4iDYObPvCPExQ',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setMainContents(data);
      const colors = ["#FF7A2F", "#8FBCFF", "#FFC13A"];
      const updatedMissions = data.todayQuests.map((quest, index) => ({
        id: quest.selectedQuestId, // selectedQuestId를 id로 사용
        backgroundColor: colors[index % colors.length], // 색상 순환 할당
        isChecked: false, // 기본적으로 체크되지 않음
        missionText: quest.activity, // activity를 missionText로 사용
        status: "", // 기본 상태는 빈 문자열로 설정
        placeKeyword: quest.placeKeyword || "장소 없음", // placeKeyword가 없을 경우 기본값 설정
        participationKeyword: quest.participationKeyword || "참여 없음", // participationKeyword가 없을 경우 기본값 설정
      }));


      setMissions(updatedMissions);
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);
  useEffect(() => {
    if (isRoundSlideVisible) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      document.body.style.overflowY = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflowY = "auto"; // Allow scrolling again
    }
  }, [isRoundSlideVisible]);

  // Update image file when a new image is selected in MissionBox
  const handleImageUpload = (file) => {
    setSelectedFile(file);
  };

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

  const handleRoundSlideSubmit = async ({ missionId, selectedName }) => {
    console.log({ missionId, selectedName });
    
    if (selectedFile) {
      // Prepare form data and send the image file to the backend
      const formData = new FormData();
      formData.append("img", selectedFile, "selected-image.png");
      try {
        const response = await fetch("/videos/upload-from-recorder", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          console.log("Image uploaded successfully");
        } else {
          console.error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setIsRoundSlideVisible(false);
    setMissions((prevMissions) =>
      prevMissions.map((mission) =>
        mission.id === missionId ? { ...mission, status: "finished" } : mission
      )
    );
    setActiveMissionId(null);
  };
  const sortedMissions = [...missions].sort((a, b) => {
    if (a.status === "now-clicked" && b.status !== "now-clicked") {
      return -1;
    }
    if (a.status !== "now-clicked" && b.status === "now-clicked") {
      return 1;
    }
    return 0;
  });

  return (
    <div className={`mainpage page-area ${isRoundSlideVisible ? 'mainpage-padding' : ''}`}>
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
          <span className="mission-tag1">#{mainContents.placeKeyword}</span>
          <span className="mission-tag2">#{mainContents.participationKeyword}</span> 할 수 있어요!
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
              tag1={mission.placeKeyword}
              tag2={mission.participationKeyword}
              status={mission.status}
              onCheck={() => handleMissionCheck(mission.id)}
              onImageUpload={handleImageUpload} // Pass handler to MissionBox
            />
          ))}
        </div>
      </div>
    </div>
  );
}
