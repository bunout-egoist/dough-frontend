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
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
const [isChecked3, setIsChecked3] = useState(false);
const [isChecked4, setIsChecked4] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState({
    not1: 0,
    not2: 0,
    not3: 0
});
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
                    refreshAccessToken();
                } else {
                    return response.json();
                }
            })
              .then(data => {
                setIsChecked1(data.every(item => item.isChecked))
                setIsChecked2(data[0].isChecked || true);
                setIsChecked3(data[1].isChecked || true);
                setIsChecked4(data[2].isChecked || true);
                setNotificationSettings({
                    not1: data[0].id,
                    not2: data[1].id,
                    not3: data[2].id,
                });
                console.log('첫 세팅', isChecked1, isChecked2, isChecked3,isChecked4);
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
                    refreshAccessToken();
                } else {
                    return response.json();
                }
            })
            .then(data => {
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
    // Handle notification toggle changes
    const handleToggle = (type) => {
        fetchSetting(accessToken);
        setNotificationSettings((prevState) => {
            const newSettings = { ...prevState, [type]: !prevState[type] };
            
            let newChecked1 = isChecked1;
            
            // 상태 변경에 따른 체크박스 업데이트
            if (type === "chk1") {
                const newCheckedState = !prevState.chk1; // chk1의 새로운 상태
                setIsChecked2(newCheckedState);
                setIsChecked3(newCheckedState);
                setIsChecked4(newCheckedState);
            } else if (type === "chk2") {
                setIsChecked2(!isChecked2);
            } else if (type === "chk3") {
                setIsChecked3(!isChecked3);
            } else if (type === "chk4") {
                setIsChecked4(!isChecked4);
            }
    
            // chk2, chk3, chk4가 모두 true일 때 chk1도 true로 설정
            if (newSettings.not2 && newSettings.not3 && newSettings.not4) {
                newChecked1 = true;
            } else {
                // chk2, chk3, chk4 중 하나라도 false가 될 경우 chk1은 false
                newChecked1 = false;
            }
    
            setIsChecked1(newChecked1); // 여기서 chk1의 상태를 업데이트
    
            console.log('알람', type, newChecked1, isChecked1, isChecked2, isChecked3,isChecked4);
    
            // 새 상태로 업데이트된 후에 updateAlarmData 호출
            updateAlarmData(newSettings);
    
            return newSettings;
        });
    };
    
    
  
    const updateAlarmData = (newSettings) => {

        const alarmData = JSON.stringify({
            "notifications": [
                { "id": newSettings.not1, "isChecked": isChecked2 },
                { "id": newSettings.not2, "isChecked": isChecked3 },
                { "id": newSettings.not3, "isChecked": isChecked4 }
            ]
        });
        console.log(alarmData,'보내기전');
        fetch(`/api/v1/notifications`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: alarmData
        })
            .then(response => response.json())
            .then(data => {
                console.log(alarmData,data);
                console.log('Notification settings updated');
            })
            .catch(error => {
                console.error('Error updating notifications:', error);
            });
    };


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
 

    useEffect(() => {
        const notifySystem = async () => {
            const messages = [];
            if (isChecked2) messages.push('데일리 퀘스트 알림을 활성화했습니다.');
            if (isChecked3) messages.push('남은 퀘스트 알림을 활성화했습니다.');
            if (isChecked4) messages.push('랜덤 퀘스트 알림을 활성화했습니다.');
        };

        notifySystem();
    }, [isChecked2, isChecked3, isChecked4]);
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
                });
          
            }

           
    }
    return (
        <div>
            <div className={`signout-page ${signOutState ? '' : 'signout-none'}`} >
                <div className="signout-pos">
                    <div className="signout-box">
                        <div><img src="/images/setting/signout.png" className="img-width"/></div>
                        <div className="signout-btn" onClick={ButtonSignout}>탈퇴하기</div>
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
                                        onChange={() => handleToggle("chk1")}
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
                                             onChange={() => handleToggle("chk2")}
                                        />
                                        <label className="slider round" htmlFor="chk2"></label>
                                    </div>
                            </div>
                            </div>
                            <div className="setting-alarm-box-2">
                            <div className="setting-alarm-li">
                                    <div className="flex-col">
                                        <div className="setting-alarm-li-title">남은 퀘스트 알림</div>
                                        <div className="setting-alarm-li-subtitle">기다리고 있는 퀘스트가 있어요!</div>
                                    </div>
                                    <div className="switch">
                                        <input
                                            type="checkbox"
                                            id="chk3"
                                            checked={isChecked3}
                                            onChange={() => handleToggle("chk3")}
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
                                        onChange={() => handleToggle("chk4")}
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
