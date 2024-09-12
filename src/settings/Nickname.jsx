import React, { useState, useEffect } from "react";
import styles from "./setting.css";
import { Link } from "react-router-dom";
export default function Nickname() {
    // 토큰 받기
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
    // 토큰을 useEffect를 통해 로컬스토리지에서 가져옴
    useEffect(()=>{
        const token = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (token) {
        setAccessToken(token);
        } else {
        console.error("Access token is not available");
        }
    },[])


    const [nickname, setNickname] = useState("");
    const [isWarningVisible, setIsWarningVisible] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setNickname(value);
        setIsWarningVisible(value.length > 5);
        
    };

    const handleNicknameChange = (e)=>{
        fetchNickname(accessToken);
    }
    const fetchNickname = (token) =>{
        fetch(`/api/v1/members`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                "nickname" :nickname
            })
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
            console.log(data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
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
                fetchNickname(data.accessToken);  // Retry with new token
            } else {
                console.error('Failed to refresh access token');
            }
        })
        .catch(error => console.error('Error refreshing access token:', error));
    };
    const isButtonDisabled = nickname.length > 5;
   
    return (
        <div>
             <Link to="/setting">
                <div className="back-img">
                    <img src="/images/back.png" alt="image" className="img-width" />
                </div>
             </Link>
          
            <div className="nickname-area">
                <div className="nickname-title">닉네임</div>
                <div className="nickname-input">
                    <input 
                        placeholder="닉네임을 입력하시오" 
                        value={nickname}
                        onChange={handleChange}
                    />
                    <div className="edit-img">
                        <img src="/images/setting/nickname-edit.png" className="img-width" />
                    </div>
                </div>
                {isWarningVisible && (
                    <div className="warning">5글자 이내의 닉네임으로 다시 시도해보세요</div>
                )}
            </div>
            <div className="nickname-btn-area">
                {/* <Link to="/setting"> */}
                    <div onClick={handleNicknameChange} className={`nickname-btn ${isButtonDisabled ? "disabled" : ""}`} >
                        수정하기
                    </div>
                {/* </Link> */}
            </div>
        </div>
    );
}
