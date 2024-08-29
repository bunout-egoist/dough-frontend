import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Correct import of useNavigate
import styles from "../../type/type.css";
import About from "../../type/About";

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
        if (selectedType >= 1) {
            navigate('/setting'); // Navigate with the query parameter
        }
    };

    return (
        <div className="setting-edit-type-area">
            <div className={`typepage ${isAboutVisible === true ? "typepage-hidden" : ""}`}>
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
                                <img src="/images/type/mytypetitle.png" alt="title" className="img-width" />
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
