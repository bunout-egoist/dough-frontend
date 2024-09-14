import React, { useState, useEffect } from "react";
import RoundSlide from "./components/RoundSlide";
import { Link } from "react-router-dom";
import MissionBox from './components/Missionbox';

export default function Mainpage() {
  // 토큰 받기
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
    // 토큰을 useEffect를 통해 로컬스토리지에서 가져옴
    const today = new Date().toISOString().split('T')[0];
    useEffect(()=>{
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
    setAccessToken(token);
    } else {
    console.error("Access token is not available");
    }

    const savedDate = localStorage.getItem("missionDate");
    if (savedDate !== today) {
      localStorage.removeItem("finishedMissions");
      localStorage.removeItem("missionDate");
      localStorage.setItem("missionDate", today); // 새 날짜 저장
    }
  },[])

// 완료된 미션을 localStorage에서 불러옴
useEffect(() => {
  const savedMissions = localStorage.getItem('finishedMissions');
  if (savedMissions) {
    const parsedMissions = JSON.parse(savedMissions);
    setMissions((prevMissions) =>
      prevMissions.map((mission) =>
        parsedMissions.find(m => m.id === mission.id) || mission
      )
    );
  }
}, []);
  
  useEffect(() => {
    if (accessToken) {
        // Function to fetch today's quests
        const fetchTodayQuests = (token) => {
            fetch('/api/v1/quests/today', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (response.status === 401) {
                  console.log('다시 발급');
                    refreshAccessToken();
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    setMainContents(data);
                    console.log(data);
                    const fixedColor = ["#5D9AFD","#41B3A2","#FFBE16","#FF7F42"];
                    const colorSet = [
                      ['#FDBD5D', '#8FBCFF'],
                      ['#FF8C64', '#2AC9A3'],
                      ['#FEE36E', '#2A8EFD'],
                      ['#52ADD4', '#FF878D'],
                      ['#6DCED4', '#FF9960']
                    ];
                    
                    const colors = colorSet[Math.floor(Math.random() * colorSet.length)];
                    
                    let colorIndex = 0; // colors 배열에서 사용할 색상 인덱스
                    
                    const updatedMissions = data.todayQuests.map((quest) => {
                      let backgroundColor = '';
                      // 스페셜 퀘스트는 linear써야해서 그냥 따로 css 적용을 missionBox안에서!
                      // questType이 '유형퀘스트'인 경우 colors 배열에서 순차적으로 색상을 지정
                      if (quest.questType === '유형별퀘스트') {
                        backgroundColor = colors[colorIndex % colors.length];
                        colorIndex++; 
                        console.log(colorIndex);
                      } else if (quest.questType === '고정퀘스트'){
                        backgroundColor = fixedColor[data.burnoutId-1]; // 기본 배경색 (원하는 색상으로 변경 가능)
                      } else {
                        // 혹시 다른경우에,(에러) 우선 그냥 고정퀘스트 색에 
                        backgroundColor = fixedColor[data.burnoutId-1]; // 기본 배경색 (원하는 색상으로 변경 가능)
                      }
                      const missionStatus = quest.questStatus === "COMPLETED" ? 'finished' : '';

                      return {
                        id: quest.selectedQuestId, 
                        backgroundColor, // 결정된 배경색 적용
                        isChecked: false,
                        missionText: quest.activity,
                        missionSubText: quest.description,
                        status: missionStatus,
                        placeKeyword: quest.placeKeyword || "장소 없음",
                        participationKeyword: quest.participationKeyword || "참여 없음",
                        special: quest.questType,
                      };
                    });
                    
                    setMissions(updatedMissions);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
        };

        // access token 재발급
        const refreshAccessToken = () => {
            const refreshToken = localStorage.getItem('refreshToken');
            fetch('/api/v1/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${accessToken}`,
                    'RefreshToken' :`Bearer ${refreshToken}`
                  },
               
            })
            .then(response => response.json())
            .then(data => {
                console.log('응답?',data);
                if (data.accessToken) {
                    // Store new access token and retry fetching today's quests
                    localStorage.setItem('accessToken', data.accessToken);
                    setAccessToken(data.accessToken);
                    fetchTodayQuests(data.accessToken);  // Retry with new token
                } else {
                    console.error('Failed to refresh access token');
                }
            })
            .catch(error => console.error('Error refreshing access token:', error));
        };

        // Fetch today's quests with the current token
        fetchTodayQuests(accessToken);
    }

    const savedMissions = localStorage.getItem('finishedMissions');
    if (savedMissions) {
      const parsedMissions = JSON.parse(savedMissions);
      setMissions((prevMissions) =>
        prevMissions.map((mission) =>
          parsedMissions.find(m => m.id === mission.id) || mission
        )
      );
    }
}, [accessToken]);


  const [mainContents, setMainContents] = useState({});
  const [missions, setMissions] = useState([]);
  const [activeMissionId, setActiveMissionId] = useState(null);
  const [isRoundSlideVisible, setIsRoundSlideVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected image file
  useEffect(() => {
    // 세션 스토리지에서 저장된 데이터 읽기
    const savedMissions = sessionStorage.getItem('finishedMissions');
    if (savedMissions) {
      const parsedMissions = JSON.parse(savedMissions);
      setMissions((prevMissions) =>
        prevMissions.map((mission) =>
          parsedMissions.find(m => m.id === mission.id) || mission
        )
      );
    }
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
    console.log("Uploaded image file: ", file); 
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

  const handleRoundSlideSubmit = async (missionList, selectedName) => {
    // 파일이 선택되지 않은 경우 경고 메시지 출력 및 중단
    console.log(selectedFile);

    const formData = new FormData();
  
    // Append feedback JSON data as a string
    const feedbackData = {
      selectedQuestId: missionList.missionId,
      difficulty: missionList.selectedName
    };
    formData.append("feedback", new Blob([JSON.stringify(feedbackData)],{type:'application/json'}),);
    if (selectedFile) {
      formData.append("file",selectedFile );
    }

    try {
      const response = await fetch("/api/v1/feedbacks", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Feedback submitted successfully", data);

         // Save status and count of finished missions in session
         const finishedMissions = missions.map((mission) =>
          mission.id === missionList.missionId ? { ...mission, status: "finished" } : mission
        );

        setMissions(finishedMissions);

        // localStorage에 상태와 완료된 미션 저장
        localStorage.setItem('finishedMissions', JSON.stringify(finishedMissions));
        // 성공 처리
      } else {
        const errorData = await response.json();
        console.error("Error submitting feedback:", errorData);
        // 에러 처리
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  
    // Reset 상태
    setIsRoundSlideVisible(false);
    setMissions((prevMissions) =>
      prevMissions.map((mission) =>
        mission.id === missionList.missionId ? { ...mission, status: "finished" } : mission
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
    if (a.status === "finished" && b.status !== "finished") {
      return 1;
    }
    if (a.status !== "finished" && b.status === "finished") {
      return -1;
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
        

        {mainContents && mainContents.burnoutId !== undefined && (
            <div className="mainpage-img">
            <img
              src={`/images/main/type/${mainContents.burnoutId}/1.png`}
              className="img-width"
              alt="Main icon"
            />
          </div>
          )}
        <div className="mainpage-mission-zone">
          {sortedMissions.map((mission) => (
            <MissionBox
              key={mission.id}
              backgroundColor={mission.backgroundColor}
              isChecked={mission.isChecked}
              missionText={mission.missionText}
              missionSubText={mission.missionSubText}
              tag1={mission.placeKeyword}
              tag2={mission.participationKeyword}
              status={mission.status}
              special={mission.special}
              onCheck={() => handleMissionCheck(mission.id)}
              onImageUpload={handleImageUpload} // Pass handler to MissionBox
            />
          ))}
        </div>
      </div>
    </div>
  );
}
