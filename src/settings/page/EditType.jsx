import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Correct import of useNavigate
import styles from "../../type/type.css";
import About from "../../type/About";
import { Link } from "react-router-dom";
export default function EditType() {
    const [selectedType, setSelectedType] = useState(null);
    const [aboutType, setAboutType] = useState(null);
    const [isAboutVisible, setIsAboutVisible] = useState(false);

    const navigate = useNavigate();  // Correct usage of the useNavigate hook

    const handleSelect = (type) => {
        if (type === 0) {
            setAboutType(null);
        } else {
            setSelectedType(type);
            setAboutType(type);
        }
    };
   

    const handleButtonClick = () => {
        fetch(`/api/v1/members/burnout`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYW51bmE1MzBAZ21haWwuY29tIiwiaWF0IjoxNzI1OTI5MDU5LCJleHAiOjE3NTcwMzMwNTksInN1YiI6IjEifQ.PIR_AE7VHLoUTU2pJzbIUE3UCabd4O4iDYObPvCPExQ',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "burnoutId": 1
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
                alert(data.message)
            }
        })
        .catch(error => {
            console.error('통신 오류:', error);
        });
    };
    
    return (
        <div className="setting-edit-type-area">
            <div className={`typepage ${isAboutVisible === true ? "typepage-hidden" : ""}`}>
                <div className="setting-typepage-header">
                    <Link to="/setting"><div className="header-back"><img src="/images/back.png" className="img-width"/></div></Link>
                    <div className="header-title">번아웃 유형 재설정</div>
                </div>
                        {aboutType !== null && (
                            <About
                                onSelect={handleSelect}
                                type={aboutType}
                                isVisible={isAboutVisible}
                                setIsVisible={setIsAboutVisible}
                            />
                        )}
                        <div className="typepage-main">
                            <div className="typepage-title">
                                <img src="/images/setting/type-edit.png" alt="title" className="img-width" />
                            </div>
                            <div className="type-select-area">
                                <div
                                    className={`type-box type-box-1 ${selectedType === 1 ? "type-box-1-active" : ""}`}
                                    onClick={() => {
                                        setAboutType(1);
                                        setIsAboutVisible(true);
                                    }}
                                >
                                    <img className="img-width" alt="type1" src="/images/type/type1.png" />
                                </div>
                                <div
                                    className={`type-box type-box-2 ${selectedType === 2 ? "type-box-2-active" : ""}`}
                                    onClick={() => {
                                        setAboutType(2);
                                        setIsAboutVisible(true);
                                    }}
                                >
                                    <img className="img-width" alt="type2" src="/images/type/type2.png" />
                                </div>
                                <div
                                    className={`type-box type-box-3 ${selectedType === 3 ? "type-box-3-active" : ""}`}
                                    onClick={() => {
                                        setAboutType(3);
                                        setIsAboutVisible(true);
                                    }}
                                >
                                    <img className="img-width" alt="type3" src="/images/type/type3.png" />
                                </div>
                                <div
                                    className={`type-box type-box-4 ${selectedType === 4 ? "type-box-4-active" : ""}`}
                                    onClick={() => {
                                        setAboutType(4);
                                        setIsAboutVisible(true);
                                    }}
                                >
                                    <img className="img-width" alt="type4" src="/images/type/type4.png" />
                                </div>
                                
                            </div>
                            
                            <div className="typepage-btn-area">
                                <div className="typepage-btn-area-abs">
                                    <div className="typepage-landing-test">잘 모르겠다면? 유형 검사하러 가기</div>
                                    <div className={`typepage-btn ${selectedType >= 1 ? "typepage-btn-active" : ""}`}  onClick={handleButtonClick}>다음</div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    );
}
