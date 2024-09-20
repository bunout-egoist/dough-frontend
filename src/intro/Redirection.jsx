import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sign from "../sign/Sign";

import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
export default function Redirection() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isNewMember, setIsNewMember] = useState(null);
  const logincode = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();
  const firebaseConfig = {
    apiKey: "AIzaSyDFDeWiSEbnfiZBStTYuIi2rf0Jc45RSQg",
    authDomain: "bunout-6fab2.firebaseapp.com",
    projectId: "bunout-6fab2",
    storageBucket: "bunout-6fab2.appspot.com",
    messagingSenderId: "111594277875",
    appId: "1:111594277875:web:dd8f37f8e9d083f144a086",
    measurementId: "G-87RHEJHXQ1"
  };
  
  // Firebase 앱 초기화
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  useEffect(() => {
    if (logincode) {
      const getAndSendToken = async () => {
        try {
          console.log('들어옴');
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            const fcmToken = await getToken(messaging, {
              vapidKey: 'BNurVqZe4BswlsPVV-GQ9u9HSOcCgDFKbC9ZcFOztppeAT3xVkEGbT-ZDBkTKjUH3EhWgGnQgqqkg9pcAqL0LQk', // 여기서 VAPID 공개 키를 사용합니다.
            });
            if (fcmToken) {
              // 서버로 토큰 전송
              fetch(`/api/v1/auth/login/kakao?code=${logincode}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                  "fcmToken" :fcmToken
                })
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
            } else {
              alert('어플 내 알람 권한 설정을 반드시 허용해주세요!');
              navigate('/');
            } 
          }
          else{
            alert('어플 내 알람 권한 설정을 반드시 허용해주세요!');
            navigate('/');
          }
        } catch (error) {
          console.error('Error getting FCM token:', error);
        }
      };
      getAndSendToken();

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
