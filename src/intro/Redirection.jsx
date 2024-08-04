import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirection() {
  const navigate = useNavigate();
  const logincode = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    if (logincode) {
      console.log(logincode);
      fetch('http://localhost:8080/api/v1/auth/login/kakao', {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'default', 
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: logincode }), 
      })
      .then((response) => {
        console.log(logincode);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem('name', data.user_name);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        navigate('/');
      })
      .catch((error) => {
        console.error('로그인 중 오류 발생:', error);
      });
    }
  }, [logincode, navigate]);
  
  return (
    <div>
      로그인 중...
    </div>
  );
}
