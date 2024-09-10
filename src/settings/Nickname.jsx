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
    const handleNicknameChange = (e)=>{
        fetch(`/api/v1/members`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYW51bmE1MzBAZ21haWwuY29tIiwiaWF0IjoxNzI1OTI5MDU5LCJleHAiOjE3NTcwMzMwNTksInN1YiI6IjEifQ.PIR_AE7VHLoUTU2pJzbIUE3UCabd4O4iDYObPvCPExQ',
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                "nickname" :nickname
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
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
