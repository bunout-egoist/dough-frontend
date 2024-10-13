import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Correct import of useNavigate
import styles from "../../type/type.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function QuestType() {
  const [selectedType, setSelectedType] = useState(null);
  const location = useLocation();
  const editType = location.state?.selectedType;
  const navigate = useNavigate(); // Correct usage of the useNavigate hook

  const [accessToken, setAccessToken] = useState(null);
  // 토큰을 useEffect를 통해 로컬스토리지에서 가져옴
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      console.log("받음", token);
    } else {
      console.error("Access token is not available");
    }
  }, []);

  const [qindex, setQIndex] = useState(null);
  const [questNum, setQuestNum] = useState(null);
  // Parse query parameters
  const searchParams = new URLSearchParams(location.search);
  const initialSelectedType = editType;
  const [selectedMission, setSelectedMission] = useState(null);

  const handleButtonClick = () => {
    // 퀘스트 선택
    fetch(`/api/v1/members/burnout`, {
      method: "PUT",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        burnoutId: editType,
        fixedQuestId: questNum,
      }),
    })
      .then((response) => {
        // 성공적인 응답 처리: 204 No Content인 경우
        if (response.status === 204) {
          console.log("성공적으로 수정되었습니다.");
          navigate("/setting");
          return; // 더 이상 처리할 JSON이 없기 때문에 여기서 끝냄
        }

        // 오류 응답이 있는 경우, JSON으로 변환하여 처리
        return response.json();
      })
      .then((data) => {
        if (data.code == 3001) {
          if (window.ReactNativeWebView) {
            // WebView에서 실행되는 경우
            window.ReactNativeWebView.postMessage(
              "번아웃 유형은 이번 달에 이미 수정되었습니다."
            );
          } else {
            // 브라우저에서 실행되는 경우
            alert("번아웃 유형은 이번 달에 이미 수정되었습니다.");
          }
        }
        setTimeout(() => {
          navigate("/setting");
        }, 1500);
      })
      .catch((error) => {
        console.error("통신 오류:", error);
      });
  };
  useEffect(() => {
    // Wait until accessToken is set before making fetch request
    if (accessToken && initialSelectedType !== null) {
      if (initialSelectedType === 0) {
        const randomType = Math.floor(Math.random() * 4) + 1;
        setSelectedType(randomType);
      } else {
        setSelectedType(initialSelectedType);
      }

      // Fetch data when component mounts
      fetch(`/api/v1/quests/fixed/${initialSelectedType}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSelectedType(data.burnoutName);
          setSelectedMission(data.fixedQuests);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [initialSelectedType, accessToken]);
  const clickQuest = (qN, qI) => {
    setQuestNum(qN);
    setQIndex(qI);
  };
  return (
    <div className="questpage">
      {selectedMission && (
        <>
          <div className="type-name">{selectedType}</div>
          <div>
            <div className="questpage-title">
              해당 유형에 추천하는 행동이에요.
            </div>
            <div>
              <img src="/images/type/quest-title.png" className="img-width" />
            </div>
          </div>
          <div className="fixed-quest-area">
            {selectedMission.map((quest, index) => (
              <div
                key={index}
                className={`fixed-quest-box ${
                  qindex === index + 1 ? `fixed-quest-box-${index + 1}` : ""
                }`}
                onClick={() => clickQuest(quest.questId, index + 1)}
              >
                <div className="quest-sub-txt">{quest.description}</div>
                <div className="quest-txt">{quest.activity}</div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="questpage-btn-area">
        <div
          className={`questpage-btn ${
            questNum >= 1 ? "questpage-btn-active" : ""
          }`}
          onClick={handleButtonClick}
        >
          완료하기
        </div>
      </div>
    </div>
  );
}
