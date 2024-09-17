import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Signout(){
    const navigate = useNavigate();
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

    const ButtonSignout =() =>{
        if(accessToken) {
            
               fetch(`/api/v1/signout`, {
                   method: 'DELETE',
                   credentials: 'include',
                   headers: {
                     'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                    },
                 })
                 .then(response => {
                    // 응답의 상태와 응답 본문을 로그로 출력합니다.
                    console.log('Response Status:', response.status);
                    return response.json(); // 응답 본문을 JSON으로 파싱합니다.
                })
                .then(data => {
                    console.log('Response Data:', data);
                    if (data.code === 3000) {
                        // 상태 코드가 3000인 경우에만 네비게이션 처리
                        setTimeout(() => {
                            navigate('/');
                        }, 1500);
                    } else {
                        // 다른 코드가 포함된 경우 처리 로직 추가
                        console.error('Unexpected response code:', data.code);
                    }
                })
                 .catch(error => {
                   console.error('Error fetching data:', error);
                 })
                 .finally(() => {
                    // 응답이나 오류에 관계없이 항상 navigate 호출
                    setTimeout(() => {
                        navigate('/');
                    }, 1500);
                    const token = localStorage.removeItem("accessToken");
                    const refreshToken = localStorage.removeItem("refreshToken");
                });

          
            }

           
    }
    return(
        <div className="signout-page">
            <div className="signout-pos">
                <div className="signout-box">
                    <div><img src="/images/setting/signout.png" className="img-width"/></div>
                    <div className="signout-btn" onClick={ButtonSignout}>탈퇴하기</div>
                    <div className="signout-exit">취소</div>
                </div>
            </div>
        </div>
    );    
}