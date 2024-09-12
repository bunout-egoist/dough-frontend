import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import styles from "./quest.css";

export default function Quest() {
        // 토큰 발급받기

        const [accessToken, setAccessToken] = useState(null);
        // 토큰을 useEffect를 통해 로컬스토리지에서 가져옴
       useEffect(() => {
           const token = localStorage.getItem("accessToken");
           if (token) {
           setAccessToken(token);
           console.log('받음',token)
           } else {
           console.error("Access token is not available");
           }
       }, []);



    const [questNum, setQuestNum] = useState(null);
    const [selectedType, setSelectedType] = useState(null); // State for selectedType
    const location = useLocation(); // Use useLocation hook to access the URL
    const navigate = useNavigate(); // Use useNavigate hook for navigation

    const infoData = location.state?.infoData;
    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    const initialSelectedType = parseInt(searchParams.get("select"), 10); 
    const [selectedMission, setSelectedMission] =useState(null);
    
    useEffect(() => {
        if (initialSelectedType === 0) {
           
            const randomType = Math.floor(Math.random() * 4) + 1;
            setSelectedType(randomType);
        } else {
            setSelectedType(initialSelectedType);
        }
    }, [initialSelectedType]);

    const [updatedFinalInfoData, setUpdatedFinalInfoData] = useState(infoData || null);
    useEffect(() => {
        if (questNum) {
            setUpdatedFinalInfoData(prevInfoData => ({
                ...prevInfoData,
                fixedQuestId: questNum 
            }));
        }
    }, [questNum]); // removed updatedFinalInfoData from dependencies


    const handleButtonClick = () => {
        console.log('끝',updatedFinalInfoData);
        // 퀘스트 선택
        fetch(`/api/v1/signup/complete`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(updatedFinalInfoData)
         
        })
        .then(response => {
            // 성공적인 응답 처리: 204 No Content인 경우
            if (response.status === 204) {
                console.log('성공적으로 수정되었습니다.');
                return;  // 더 이상 처리할 JSON이 없기 때문에 여기서 끝냄
            }
            
            // 오류 응답이 있는 경우, JSON으로 변환하여 처리
            return response.json();
        })
        .then(data => {
          console.log(data);
          navigate('/main')
        })
        .catch(error => {
            console.error('통신 오류:', error);
        });
       

        if (initialSelectedType === 0) {
            navigate('/setting'); // Navigate to /setting if initialSelectedType is 0
        } else if (selectedType >= 1) {
            navigate('/main'); // Navigate to home if selectedType is 1 or greater
        }
    };
    useEffect(() => {
        if (initialSelectedType === 0) {
            const randomType = Math.floor(Math.random() * 4) + 1;
            setSelectedType(randomType);
        } else {
            setSelectedType(initialSelectedType);
        }

        // Fetch data only once when component mounts
        fetch(`/api/v1/quests/fixed/${initialSelectedType}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization':`Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
           console.log(data)
            setSelectedType(data.burnoutName);
            setSelectedMission(data.fixedQuests);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [initialSelectedType]); // Only run when initialSelectedType changes

    return (
        <div className="questpage">
            {selectedMission && (
                <>
                    <div className="type-name">{selectedType}</div>
                    <div>
                        <div className="questpage-title">이름 같은 분에게 추천하는 행동이에요.</div>
                        <div><img src="/images/type/quest-title.png" className="img-width" /></div>
                    </div>
                    <div className="fixed-quest-area">
                        {selectedMission.map((quest, index) => (
                            <div key={index} className={`fixed-quest-box ${questNum === index + 1 ? `fixed-quest-box-${index + 1}` : ""}`}
                                onClick={() => setQuestNum(index + 1)}>
                                <div className="quest-sub-txt">{quest.description}</div>
                                <div className="quest-txt">{quest.activity}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className="questpage-btn-area">
                <div className={`questpage-btn ${questNum >= 1 ? "questpage-btn-active" : ""}`} onClick={handleButtonClick}>완료하기</div>
            </div>
        </div>
    );
}
