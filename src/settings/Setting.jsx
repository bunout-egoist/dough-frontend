import React, { useEffect, useState } from "react";
import styles from "./setting.css";
import { Link } from "react-router-dom";

export default function Setting() {

    useEffect(()=>{
        fetch(`/api/v1/notifications`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYW51bmE1MzBAZ21haWwuY29tIiwiaWF0IjoxNzI1OTI5MDU5LCJleHAiOjE3NTcwMzMwNTksInN1YiI6IjEifQ.PIR_AE7VHLoUTU2pJzbIUE3UCabd4O4iDYObPvCPExQ',
              'Content-Type': 'application/json',
            },
            
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
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
    },[])
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
    };

    const handleToggle2 = () => {
        console.log('2',!isChecked2);
        setIsChecked2(!isChecked2);
    }
    const handleToggle3 = () => {
        console.log('3',!isChecked3);
        setIsChecked3(!isChecked3);
    }        
        
    const handleToggle4 = () => {
        console.log('4',!isChecked4);
        setIsChecked4(!isChecked4);
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
    useEffect(()=>{

            fetch(`/api/v1/notifications`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                  'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYW51bmE1MzBAZ21haWwuY29tIiwiaWF0IjoxNzI1OTI5MDU5LCJleHAiOjE3NTcwMzMwNTksInN1YiI6IjEifQ.PIR_AE7VHLoUTU2pJzbIUE3UCabd4O4iDYObPvCPExQ',
                  'Content-Type': 'application/json',
                },
                body : alarmData
              })
              .then(response => response.json())
              .then(data => {
                console.log('보낸거',alarmData);
                console.log('받은거',data);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
    },[alarmData])
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
        <div className="setting-page page-area">
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
                        <Link to='/typepage/quest?select=1'>
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
               <Link to="/intro">
                    <div className="logout-btn">
                        로그아웃
                    </div>
               </Link>
                <div className="exit">탈퇴하기</div>
            </div>
        </div>
    );
}
