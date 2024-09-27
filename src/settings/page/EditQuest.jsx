import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import styles from "../../type/type.css";
import { Link } from "react-router-dom";
export default function EditQuest() {
    // 토큰 받기
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
    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    const initialSelectedType = parseInt(searchParams.get("select"), 10); // Get the 'select' query parameter and parse it as an integer
    const [selectedMission, setSelectedMission] =useState(null);

    useEffect(() => {
        if (initialSelectedType === 0) {
           
            const randomType = Math.floor(Math.random() * 4) + 1;
            setSelectedType(randomType);
        } else {
            setSelectedType(initialSelectedType);
        }
    }, [initialSelectedType]);

    // Find the type object corresponding to the selectedType
    

    const handleButtonClick = () => {
        // 퀘스트 선택
        fetch(`/api/v1/members/fixed`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fixedQuestId": questNum
            })
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
            // 204 No Content 응답의 경우는 데이터가 없기 때문에 data는 undefined
            if (data) {
                console.error('오류 발생:', data.message);
                if (window.ReactNativeWebView) {
                    // WebView에서 실행되는 경우
                    window.ReactNativeWebView.postMessage(data.message);
                  } else {
                    // 브라우저에서 실행되는 경우
                    alert(data.message);
                  }
                  
                setTimeout(()=>{
                    navigate('/setting');
                },1500)
            }
        })
        .catch(error => {
            console.error('통신 오류:', error);
        });
       

        if (initialSelectedType === 0) {
            navigate('/setting'); // Navigate to /setting if initialSelectedType is 0
        } else if (selectedType >= 1) {
            navigate('/'); // Navigate to home if selectedType is 1 or greater
        }
    };

    useEffect(() => {
       if (accessToken){
        if (initialSelectedType === 0) {
            const randomType = Math.floor(Math.random() * 4) + 1;
            setSelectedType(randomType);
        } else {
            setSelectedType(initialSelectedType);
        }

        // Fetch data only once when component mounts
        fetch(`/api/v1/quests/fixed`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.fixedQuests);
            setSelectedType(data.burnoutName);
            setSelectedMission(data.fixedQuests);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
       }
    },[accessToken]); // Only run when initialSelectedType changes

    return (
       <div className="edit-questpage">
            <div className="setting-typepage-header">
                <Link to="/setting"><div className="header-back"><img src="/images/back.png" className="img-width"/></div></Link>
                <div className="header-title">번아웃 유형 재설정</div>
            </div>
            <div className="questpage">
                {selectedMission && (
                    <>
                        <div className="type-name">{selectedType}</div>
                        <div>
                            <div className="questpage-title">이름 같은 분에게 추천하는 행동이에요.</div>
                            <div><img src="/images/setting/quest-edit.png" className="img-width" /></div>
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
                    <div className="btn-notice-div">
                        <div className="notice-img-div"><img src="/images/setting/change-quest.png" className="img-width" /></div>
                    </div>
                    <div className={`questpage-btn ${questNum >= 1 ? "questpage-btn-active" : ""}`} onClick={handleButtonClick}>완료하기</div>
                </div>
            </div>
       </div>
    );
}
