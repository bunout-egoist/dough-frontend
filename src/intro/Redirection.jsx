import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirection() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const logincode = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    if (logincode) {
      console.log("Received code:", logincode);
      
      fetch('http://localhost:8080/api/v1/auth/login/kakao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: logincode }),
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
        console.log("Received data:", data);
        if (data.success) {
          const jwtToken = data.data.jwtToken;
          const refreshToken = data.data.refreshToken;
          // Store tokens in local storage
          localStorage.setItem('jwtToken', jwtToken);
          localStorage.setItem('refreshToken', refreshToken);
          setTimeout(() => {
            navigate('/');
          }, 2000); // Navigate to home page after 2 seconds
        } else {
          console.error('로그인 중 오류 발생:', data.message);
        }
      })
      .catch((error) => {
        console.error('로그인 중 오류 발생:', error);
      });
    }
  }, [logincode, navigate]);

  return (
    <div>
      {loginSuccess ? "로그인 성공!" : "로그인 중..."}
    </div>
  );
}
