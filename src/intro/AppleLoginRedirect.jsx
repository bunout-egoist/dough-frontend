
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sign from "../sign/Sign";

import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
export default function AppleLoginRedirect() {
    const appleData = location.state?.res;
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isNewMember, setIsNewMember] = useState(null);
  const navigate = useNavigate();
  const firebaseConfig = {
    apiKey: "AIzaSyAtJWz7IMbcsh65wvTJsr7xzsmpIMDD-Ao",
    authDomain: "bunout-2ed63.firebaseapp.com",
    projectId: "bunout-2ed63",
    storageBucket: "bunout-2ed63.appspot.com",
    messagingSenderId: "1064933370265",
    appId: "1:1064933370265:web:3251f0d0af4f04fb170b08",
    measurementId: "G-ZMM294BFWY"
  };
  
  
  // Firebase 앱 초기화
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  const showNotification = (title, message) => {
    // 알림 권한을 요청
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // 알림 생성
        new Notification(title, {
          body: message,
        });
      } else {
        console.log('알림 권한이 허용되지 않았습니다.');
      }
    }).catch(err => {
      console.error('알림 권한 요청 중 오류 발생:', err);
    });
  };

  useEffect(() => {
    if (appleData) {
      const getAndSendToken = async () => {
        try {
          console.log('들어옴');
          const permission = await Notification.requestPermission();
          let fcmToken = null;

          if (permission === 'granted') {
            try {
              fcmToken = await getToken(messaging, {
                vapidKey: 'BKSCCM1MOQZ5KfhXgstx-ZrMJR6P6XRlo3Slb1SI1ct0y4MkeeOZJsTaHkc1o4MUrpk_iHTq1hQtDv2UnUUlibw',
              });
            } catch (error) {
              console.error('FCM 토큰을 가져오는 중 오류 발생:', error);
            }
          }

          if (!fcmToken) {
            showNotification('BUNOUT', '어플설정에 들어가 알림 설정을 허용해주세요!');
            // if (window.ReactNativeWebView) {
            //   // WebView에서 실행되는 경우
            //   window.ReactNativeWebView.postMessage('알람을 허용해주세요!');
            // } else {
            //   // 브라우저에서 실행되는 경우
            //   alert('알람을 허용해주세요!');
            // }
            
          }
          console.log(fcmToken,'토큰존재');
          // 서버로 로그인 요청 전송 (fcmToken이 없으면 null로 전송)
          fetch(`/api/v1/auth/login/apple?idToken='111'&&authorizationCode='11'`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "fcmToken": fcmToken || null,
            }),
            credentials: 'include',
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
            setLoginSuccess(true); 
            setIsNewMember(data.isNewMember);
          })
          .catch((error) => {
            console.error('로그인 중 오류 발생:', error);
          });

        } catch (error) {
          console.error('Error getting FCM token:', error);
        }
      };

      getAndSendToken();
    }
  }, [appleData]);


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
