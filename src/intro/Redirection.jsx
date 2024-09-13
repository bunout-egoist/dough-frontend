import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sign from "../sign/Sign";
export default function Redirection() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isNewMember, setIsNewMember] = useState(null);
  const logincode = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();
  useEffect(() => {
    if (logincode) {
      console.log("Received code:", logincode);
      
      fetch(`/api/v1/auth/login/kakao?code=${logincode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }

      })
      .then((response) => {
        console.log("Response status:", response.status);
        if (response.status === 200) {
          setLoginSuccess(true);
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data, data.isNewMember);

          const accessToken = data.accessToken;
          const refreshToken = data.refreshToken;
          // Store tokens in local storage
          console.log('출력',accessToken, refreshToken);
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          console.log(localStorage.getItem('accessToken', accessToken));
          setLoginSuccess(true); // 토큰 저장 후에 상태 업데이트
          setIsNewMember(data.isNewMember);
        // else {
        //   console.error('로그인 중 오류 발생:', data.message);
        // }
      })
      .catch((error) => {
        console.error('로그인 중 오류 발생:', error);
      });
    }
  }, [logincode]);


  useEffect(() => {
    if (loginSuccess) {
      if (isNewMember) {
        navigate("/sign");
      } else {
        navigate("/main");
      }
    }
  }, [loginSuccess, isNewMember, navigate]);

  return (
    <div>
      {loginSuccess ? "로그인 성공": "로그인 중..."}
    </div>
  );
}
