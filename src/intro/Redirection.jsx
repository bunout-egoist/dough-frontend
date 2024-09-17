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
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          console.log(localStorage.getItem('accessToken', accessToken));
          setLoginSuccess(true); // 토큰 저장 후에 상태 업데이트
          setIsNewMember(data.isNewMember);
          console.log('상태?',data.isNewMember);
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
    if (loginSuccess && isNewMember !== null) { // 로그인 성공 여부와 isNewMember가 업데이트된 후에 네비게이션 처리
      console.log('Navigating based on login success and new member status');
      if (isNewMember === true) {
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
