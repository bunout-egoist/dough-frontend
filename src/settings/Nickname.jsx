import React, { useState } from "react";
import styles from "./setting.css";
import { Link } from "react-router-dom";
export default function Nickname() {
    const [nickname, setNickname] = useState("");
    const [isWarningVisible, setIsWarningVisible] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setNickname(value);
        setIsWarningVisible(value.length > 5);
    };

    const isButtonDisabled = nickname.length > 5;

    return (
        <div>
             <Link to="/">
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
                <Link to="/setting">
                    <div className={`nickname-btn ${isButtonDisabled ? "disabled" : ""}`} >
                        수정하기
                    </div>
                </Link>
            </div>
        </div>
    );
}
