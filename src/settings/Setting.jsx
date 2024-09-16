import React, { useEffect, useState } from "react";
import styles from "./setting.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Signout from "./page/Signout";
export default function Setting() {
     // 토큰 받기
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [logoutState, setLogoutState] = useState(false);
  const [signOutState, setSignOutState] = useState(false);
  const navigate = useNavigate();
    // 토큰을 useEffect를 통해 로컬스토리지에서 가져옴
    useEffect(()=>{
        const token = localStorage.getItem("accessToken");
        if (token) {
        setAccessToken(token);
        } else {
        console.error("Access token is not available");
        }
    },[])


    useEffect(()=>{
       if(accessToken) {
         const fetchSetting = (token) =>{
            fetch(`/api/v1/notifications`, {
                method: 'GET',
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
                console.log('1');
                setCheckAlarm(data);
    
                 // 데이터 기반 체크박스 상태 업데이트
                const isChecked1 = data.every(item => item.isChecked);
                setIsChecked1(isChecked1);
    
                const alarmMap = data.reduce((acc, item) => {
                acc[item.id] = item.isChecked;
                return acc;
                }, {});
    
                setIsChecked2(alarmMap[1] || false);
                setIsChecked3(alarmMap[2] || false);
                setIsChecked4(alarmMap[3] || false);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
         };

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
            .then(response => {
                if (response.status === 401) {
                  console.log('다시 발급');
                    refreshAccessToken();
                } else {
                    return response.json();
                }
            })
            .then(data => {
                console.log('응답?',data);
                if (data.accessToken) {
                    // Store new access token and retry fetching today's quests
                    localStorage.setItem('accessToken', data.accessToken);
                    setAccessToken(data.accessToken);
                    fetchSetting(data.accessToken);  // Retry with new token
                } else {
                    console.error('Failed to refresh access token');
                }
            })
            .catch(error => console.error('Error refreshing access token:', error));
        };

        fetchSetting(accessToken);
       }
    },[accessToken])
    const [checkAlarm, setCheckAlarm] = useState([]);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);

    const handleToggle1 = () => {
        const newChecked = !isChecked1;
        setIsChecked1(newChecked);
        console.log('1',!isChecked2)
        if (newChecked) {
            setIsChecked2(true);
            setIsChecked3(true);
            setIsChecked4(true);
        } else {
            setIsChecked2(false);
            setIsChecked3(false);
            setIsChecked4(false);
        }
        handleAlarmData();
    };

    const handleToggle2 = () => {
        console.log('2',!isChecked2);
        setIsChecked2(!isChecked2);
        handleAlarmData();
    }
    const handleToggle3 = () => {
        console.log('3',!isChecked3);
        setIsChecked3(!isChecked3);
        handleAlarmData();
    }        
        
    const handleToggle4 = () => {
        console.log('4',!isChecked4);
        setIsChecked4(!isChecked4);
        handleAlarmData();
    }
    const alarmData = JSON.stringify({
        "notifications" : [ {
          "id" : 1,
          "isChecked" : isChecked2
        }, {
          "id" : 2,
          "isChecked" : isChecked3
        }, {
          "id" : 3,
          "isChecked" : isChecked4
        } ]
      });
   
    const handleAlarmData=()=>{
        fetch(`/api/v1/notifications`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body : alarmData
          })
          .then(response => response.json())
          .then(data => {
            console.log('2');
            console.log('보낸거',alarmData);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }

    const handleLogout=()=>{
        fetch(`/api/v1/logout`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            }
          })
          .then(data => {
            setLogoutState(true);
            navigate('/');
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });

          
    }
    const showSignout= () =>{
        setSignOutState(true);
    }
    const exitSignout=() =>{
        setSignOutState(false)
    }
    const handleSignout=()=>{
        fetch(`/api/v1/signout`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYW51bmE1MzBAZ21haWwuY29tIiwiaWF0IjoxNzI2MTAyMjk4LCJleHAiOjE3Mjg2OTQyOTgsInN1YiI6IjMifQ.r0bRb2sUbzlueerlXQteJsIkaGKKOIwbI3adUXE5Yvw',
              'Content-Type': 'application/json',
            }
          })
          .then(response => {
            if (response.status == 204){
                navigate('/');
            }
        })
          .catch(error => {
            console.error('Error fetching data:', error);
          });

          
    }
        

    useEffect(() => {
        const notifySystem = async () => {
            const messages = [];
            if (isChecked2) messages.push('데일리 퀘스트 알림을 활성화했습니다.');
            if (isChecked3) messages.push('남은 퀘스트 알림을 활성화했습니다.');
            if (isChecked4) messages.push('랜덤 퀘스트 알림을 활성화했습니다.');
        };

        notifySystem();
    }, [isChecked2, isChecked3, isChecked4]);

    return (
        <div>
            <div className={`signout-page ${signOutState ? '' : 'signout-none'}`} >
                <div className="signout-pos">
                    <div className="signout-box">
                        <div><img src="/images/setting/signout.png" className="img-width"/></div>
                        <div className="signout-btn" onClick={handleSignout}>탈퇴하기</div>
                        <div className="signout-exit" onClick={exitSignout}>취소</div>
                    </div>
                </div>
            </div>
            <div className={`setting-page page-area ${signOutState ? 'signout-fixed' : ''}`}>
            
                <div className="setting-title">설정</div>
                <div className="setting-area">
                    <div className="setting-service">
                        <div className="setting-subtitle">서비스 설정</div>
                        <div className="setting-service-list">
                            <Link to="/nickname">
                            <div className="setting-service-li landing-nickname">
                                <div>닉네임 수정</div>
                                <div className="vector-img"><img alt="image" src="/images/vector.png"/></div>
                            </div>
                            </Link>
                            <Link to="/setting/edit-type">
                                <div className="setting-service-li">
                                    <div>사용자 유형 재설정</div>
                                    <div className="vector-img"><img alt="image" src="/images/vector.png"/></div>
                                </div>
                            </Link>
                            <Link to="/setting/edit-quest">
                                <div className="setting-service-li">
                                    <div>고정퀘스트 재설정</div>
                                    <div className="vector-img"><img alt="image" src="/images/vector.png"/></div>
                                </div>
                            </Link>
                        
                        </div>
                    </div>
                    <div className="setting-alarm">
                        <div className="setting-subtitle">알림 설정</div>
                        <div>
                            <div className="setting-alarm-box-1 flex-row">
                                <div>알림 허용</div>
                                <div className="switch">
                                    <input
                                        type="checkbox"
                                        id="chk1"
                                        checked={isChecked1}
                                        onChange={handleToggle1}
                                    />
                                    <label className="slider round" htmlFor="chk1"></label>
                                </div>
                            </div>
                            <div className="setting-alarm-box-2">
                            <div className="setting-alarm-li">
                                    <div className="flex-col">
                                        <div className="setting-alarm-li-title">데일리 퀘스트 알림</div>
                                        <div className="setting-alarm-li-subtitle">오늘의 퀘스트가 도착했어요!</div>
                                    </div>
                                    <div className="switch">
                                        <input
                                            type="checkbox"
                                            id="chk2"
                                            checked={isChecked2}
                                            onChange={handleToggle2}
                                        />
                                        <label className="slider round" htmlFor="chk2"></label>
                                    </div>
                            </div>
                            </div>
                            <div className="setting-alarm-box-2">
                            <div className="setting-alarm-li">
                                    <div className="flex-col">
                                        <div className="setting-alarm-li-title">남은 퀘스트 알림</div>
                                        <div className="setting-alarm-li-subtitle">###님을 기다리고 있는 퀘스트가 있어요!</div>
                                    </div>
                                    <div className="switch">
                                        <input
                                            type="checkbox"
                                            id="chk3"
                                            checked={isChecked3}
                                            onChange={handleToggle3}
                                        />
                                        <label className="slider round" htmlFor="chk3"></label>
                                    </div>
                            </div>
                            </div>
                            <div className="setting-alarm-box-2">
                            <div className="setting-alarm-li">
                                    <div className="flex-col">
                                        <div className="setting-alarm-li-title">랜덤 퀘스트 알림</div>
                                        <div className="setting-alarm-li-subtitle">오늘의 랜덤 퀘스트가 남아있어요!</div>
                                    </div>
                                    <div className="switch">
                                        <input
                                            type="checkbox"
                                            id="chk4"
                                            checked={isChecked4}
                                            onChange={handleToggle4}
                                        />
                                        <label className="slider round" htmlFor="chk4"></label>
                                    </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="setting-qa">
                        <div className="setting-subtitle">문의</div>
                        <div className="setting-service-list">
                            <Link to="https://bunout.notion.site/FAQ-2e83748986af483cb60f5d42f8ffa8ff?pvs=4"  target="_blank">
                                <div className="setting-service-li">
                                    <div>자주 묻는 질문들</div>
                                    <div className="vector-img"><img alt="image" src="/images/vector.png"/></div>
                                </div>
                            </Link>
                            
                            <Link to="https://open.kakao.com/o/sptOsAMg"  target="_blank">
                                <div className="setting-service-li">
                                    <div>의견 보내기</div>
                                    <div className="vector-img"><img alt="image" src="/images/vector.png"/></div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="setting-agency">
                        <div className="setting-subtitle">약관 및 방침</div>
                        <div className="setting-service-list">
                            <Link to="https://bunout.notion.site/07affd8e5d464cd3ad5dd63e83bd9e38?pvs=4"  target="_blank">
                                <div className="setting-service-li">
                                    <div>서비스 이용약관</div>
                                    <div className="vector-img"><img alt="image" src="/images/vector.png"/></div>
                                </div>
                            </Link>
                            <Link to="https://bunout.notion.site/119f84e892f842f5b7b3ee86c97620ce?pvs=4"  target="_blank">
                                <div className="setting-service-li">
                                    <div>개인정보 처리방침</div>
                                    <div className="vector-img"><img alt="image" src="/images/vector.png"/></div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="logout-btn" onClick={handleLogout}>
                        로그아웃
                    </div>
                    <div className="exit" onClick={showSignout}>탈퇴하기</div>
                </div>
            </div>
        </div>
    );
}
